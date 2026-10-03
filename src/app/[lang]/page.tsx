import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import Hero from "@/components/Hero";
import CapabilitiesMarquee from "@/components/CapabilitiesMarquee";
import ManifestoSection from "@/components/ManifestoSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustBar from "@/components/TrustBar";

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

      {/* Scene 1.2: Capabilities marquee */}
      <CapabilitiesMarquee />

      {/* Scene 1.5: The Manifesto */}
      <ManifestoSection />

      {/* Scene 2: Selected Work (asymmetric gallery) */}
      <ShowcaseSection />

      {/* Scene 3: The Architecture (numbered index) */}
      <Services />

      {/* Scene 4: The Process (horizontal timeline) */}
      <ProcessSection />

      {/* Scene 4.5: Testimonials */}
      <TestimonialsSection />

      {/* Scene 5: Trust (compact) */}
      <TrustBar />

      {/* Scene 6: The Ultimatum (Final CTA) */}
      <section className="relative py-20 md:py-24 px-6 bg-transparent z-10 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 
            className="text-[#0A0A0C] font-bold tracking-tight mb-8 leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.04em' }}
          >
            {t('part1')}<span className="text-[#7C3AED]">{t('part2')}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#4A4A4E] mb-12 font-light max-w-2xl">
            {t('subtitle')}
          </p>
          
          <Link href={`/${lang}/contact`} className="group relative px-16 py-7 bg-[#7C3AED] text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-95 duration-300 ease-[0.16,1,0.3,1]">
            <div className="absolute inset-0 bg-[#5B21B6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-lg md:text-xl transition-colors duration-500">
              {t('button')}
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
