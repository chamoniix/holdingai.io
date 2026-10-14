import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ArticleLayout, { type BlogArticleContent } from '@/components/blog/ArticleLayout';
import { blogArticleRoutes } from '@/data/blog-routes';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://www.holdingai.io';
const OG_LOCALES = {
  en: 'en_GB', fr: 'fr_FR', de: 'de_DE', es: 'es_ES',
  it: 'it_IT', pt: 'pt_PT', fi: 'fi_FI', no: 'nb_NO',
} as const;

type Props = { params: Promise<{ lang: string; slug: string }> };

// The locale layout currently has no generateStaticParams. Generate both
// segments bottom-up; do not return only slugs and leave lang unresolved.
export function generateStaticParams() {
  return routing.locales.flatMap((lang) =>
    blogArticleRoutes.map(({ slug }) => ({ lang, slug }))
  );
}

async function getArticle(params: Props['params']) {
  const { lang, slug } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  const route = blogArticleRoutes.find((article) => article.slug === slug);
  if (!route) notFound();
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: 'blog' });
  const messages = await getMessages({ locale: lang });
  const content: BlogArticleContent = messages.blog.articles[route.key];
  return { lang, route, content, t };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, route, content } = await getArticle(params);
  const url = `${BASE_URL}/${lang}/blog/${route.slug}`;
  const image = { url: `${BASE_URL}${route.image}`, alt: content.heroAlt };
  const indexable = process.env.VERCEL_ENV === 'production';

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((locale) => [
        locale, `${BASE_URL}/${locale}/blog/${route.slug}`,
      ])),
    },
    robots: { index: indexable, follow: indexable },
    openGraph: {
      type: 'article',
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: 'HoldingAI',
      locale: OG_LOCALES[lang],
      alternateLocale: routing.locales.filter((locale) => locale !== lang)
        .map((locale) => OG_LOCALES[locale]),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: [image],
    },
  };
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export default async function BlogArticlePage({ params }: Props) {
  const { lang, route, content, t } = await getArticle(params);
  const url = `${BASE_URL}/${lang}/blog/${route.slug}`;
  const home = `${BASE_URL}/${lang}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: content.title,
        description: content.metaDescription,
        image: `${BASE_URL}${route.image}`,
        inLanguage: lang,
        articleSection: content.category,
        publisher: { '@type': 'Organization', name: 'HoldingAI', url: BASE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HoldingAI', item: home },
          { '@type': 'ListItem', position: 2, name: t('title'), item: `${home}#blog` },
          { '@type': 'ListItem', position: 3, name: content.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: serializeJsonLd(structuredData),
      }} />
      <ArticleLayout article={content} locale={lang} />
    </>
  );
}
