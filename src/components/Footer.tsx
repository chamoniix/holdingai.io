"use client";

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const lang = useLocale();
  const t = useTranslations('footer');

  return (
    <footer className="bg-transparent pt-20 md:pt-24 pb-12 relative overflow-hidden pointer-events-auto border-t border-white/10">
      {/* Background ambient glow - extremely subtle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2997FF]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Massive Signature */}
        <h2 
          className="font-bold tracking-tighter text-center mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
          style={{ fontSize: 'clamp(3rem, 12vw, 10rem)', letterSpacing: '-0.06em', lineHeight: 0.8 }}
        >
          HOLDING AI
        </h2>

        {/* Minimalist layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-16 mb-16 md:mb-24">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <p className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-90">{t('city')}</p>
            <p className="text-[#86868B] text-sm font-light">{t('address1')}</p>
            <p className="text-[#86868B] text-sm font-light">{t('address2')}</p>
            <div className="pt-6 flex flex-col space-y-2">
              {/* GAP: no email/phone keys in footer namespace — contact data kept hardcoded */}
              <a href="mailto:info@holdingai.io" className="text-white text-sm font-light hover:text-[#2997FF] transition-colors">info@holdingai.io</a>
              <a href="tel:+447537106967" className="text-white text-sm font-light hover:text-[#2997FF] transition-colors">+44 7537106967</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col space-y-5">
              <Link href={`/${lang}/work`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{t('work')}</Link>
              <Link href={`/${lang}/services/ai-agents`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{t('services')}</Link>
              <Link href={`/${lang}/about`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{t('about')}</Link>
            </div>
            <div className="flex flex-col space-y-5">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{t('xTwitter')}</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#86868B] text-[10px] uppercase tracking-[0.15em]">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          
          <div className="flex gap-8">
            <Link href={`/${lang}/legal/mentions-legales`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{t('legal')}</Link>
            <Link href={`/${lang}/legal/privacy`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{t('privacy')}</Link>
            <Link href={`/${lang}/legal/terms`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{t('terms')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
