import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

const LOCALES: string[] = [...routing.locales];

export type SeoKey =
  | 'home'
  | 'about'
  | 'work'
  | 'contact'
  | 'aiAgents'
  | 'saas'
  | 'automation'
  | 'privacy'
  | 'terms'
  | 'mentions';

/**
 * Uniform per-page SEO metadata builder (server only).
 * `path` is the locale-free path of the page ('' for home, '/about', ...).
 */
export async function buildPageMetadata(
  lang: string,
  key: SeoKey,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale: lang as Locale, namespace: 'seo' });
  // Dynamic keys: cast `as never` to satisfy next-intl key typing.
  const title = t(`${key}.title` as never);
  const description = t(`${key}.description` as never);

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
    },
    openGraph: {
      title,
      description,
      url: `/${lang}${path}`,
    },
  };
}
