import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang, 'terms', '/legal/terms');
}

export default async function TermsPage() {
  const t = await getTranslations('legalContent');
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {t('terms.title')}
        </h1>
        <div className="prose prose-invert prose-lg text-[#86868B]">
          <p>{t('terms.content')}</p>
        </div>
      </div>
    </main>
  );
}
