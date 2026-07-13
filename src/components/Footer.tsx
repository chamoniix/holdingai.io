"use client";

import Link from 'next/link';
import { useTranslation } from '@/i18n/LanguageContext';

export default function Footer() {
  const { lang, dict } = useTranslation();

  return (
    <footer className="bg-[#050608]/50 backdrop-blur-2xl pt-20 md:pt-24 pb-12 relative overflow-hidden pointer-events-auto border-t border-white/10">
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
            <p className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-90">{dict.footer?.london || "London"}</p>
            <p className="text-[#86868B] text-sm font-light">{dict.footer?.address1 || "Lytchett House, Freeland Park"}</p>
            <p className="text-[#86868B] text-sm font-light">{dict.footer?.address2 || "Wareham Road, Poole, Dorset"}</p>
            <div className="pt-6 flex flex-col space-y-2">
              <a href="mailto:info@holdingai.io" className="text-white text-sm font-light hover:text-[#2997FF] transition-colors">{dict.footer?.email || "info@holdingai.io"}</a>
              <a href="tel:+447537106967" className="text-white text-sm font-light hover:text-[#2997FF] transition-colors">{dict.footer?.phone || "+44 7537106967"}</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col space-y-5">
              <Link href={`/${lang}/work`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{dict.footer?.ourWork || "Our Work"}</Link>
              <Link href={`/${lang}/services/ai-agents`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{dict.footer?.services || "Services"}</Link>
              <Link href={`/${lang}/about`} className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">{dict.footer?.about || "About Us"}</Link>
            </div>
            <div className="flex flex-col space-y-5">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#86868B] hover:text-white transition-colors text-sm font-light tracking-wide">X (Twitter)</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#86868B] text-[10px] uppercase tracking-[0.15em]">
            {dict.footer?.rights || `© ${new Date().getFullYear()} HoldingAI LTD.`}
          </p>
          
          <div className="flex gap-8">
            <Link href={`/${lang}/legal/mentions-legales`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{dict.footer?.legal || "Legal Mentions"}</Link>
            <Link href={`/${lang}/legal/privacy`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{dict.footer?.privacy || "Privacy Policy"}</Link>
            <Link href={`/${lang}/legal/terms`} className="text-[#86868B] hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em]">{dict.footer?.terms || "Terms"}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
