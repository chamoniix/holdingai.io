import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import CapabilitiesMarquee from "@/components/CapabilitiesMarquee";
import ManifestoSection from "@/components/ManifestoSection";
import FiguresSection from "@/components/FiguresSection";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";

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
      
      {/* Scene 1: Hero */}
      <Hero />

      {/* Scene 1.1: Clients strip */}
      <ClientsStrip />

      {/* Scene 1.2: Capabilities marquee */}
      <CapabilitiesMarquee />

      {/* Scene 1.5: The Manifesto */}
      <ManifestoSection />

      {/* Scene 2: Dark figures block */}
      <FiguresSection />

      {/* Scene 3: Expertise accordion */}
      <Services />

      {/* Scene 3.5: Team */}
      <TeamSection />

      {/* Scene 4: Selected Work (asymmetric gallery) */}
      <ShowcaseSection />

      {/* Scene 5: The Process (horizontal timeline) */}
      <ProcessSection />

      {/* Scene 5.5: Testimonials */}
      <TestimonialsSection />

      {/* Scene 6: Blog */}
      <BlogSection />

      {/* Scene 7: The Ultimatum (Final CTA) */}
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

      {/* Badges (agreements) */}
      <div className="relative z-10 px-6 pb-16 flex items-center justify-center gap-10">
        <img src="/images/kosmos/badge-cii.webp" alt="CII" className="h-12 md:h-14 w-auto object-contain grayscale opacity-60" />
        <img src="/images/kosmos/badge-bpi.png" alt="BPI France" className="h-12 md:h-14 w-auto object-contain grayscale opacity-60" />
      </div>
    </main>
  );
}
