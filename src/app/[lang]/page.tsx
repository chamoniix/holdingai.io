import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import ShowcaseSection from "@/components/ShowcaseSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildPageMetadata(lang, 'home', '');
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang as Locale, namespace: 'homeFinal' });

  return (
    <main className="w-full bg-transparent overflow-hidden">
      
      {/* Scene 1: The Ignition */}
      <Hero />
      
      <TrustBar />

      {/* Scene 2: The Architecture */}
      <Services />
      
      {/* Scene 3: Selected Work (Horizontal Carousel) */}
      <ShowcaseSection />
      
      {/* Scene 5: The Ultimatum (Final CTA) */}
      <section className="relative py-20 md:py-24 px-6 bg-transparent z-10 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#2997FF30,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 
            className="text-white font-bold tracking-tight mb-8 leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.04em' }}
          >
            {t('part1')}<span className="text-gradient-accent">{t('part2')}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#86868B] mb-12 font-light max-w-2xl">
            {t('subtitle')}
          </p>
          
          <Link href={`/${lang}/contact`} className="group relative px-16 py-7 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-95 duration-300 ease-[0.16,1,0.3,1]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2997FF] to-[#BF5AF2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-lg md:text-xl group-hover:text-white transition-colors duration-500">
              {t('button')}
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
