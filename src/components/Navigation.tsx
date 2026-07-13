import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/i18n/LanguageContext';

export default function Navigation() {
  const { lang, dict } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-center pointer-events-none">
      
      <div className="flex items-center justify-between w-full max-w-7xl pointer-events-auto">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V20M20 4V20M4 12H20" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4V20M16 4V20" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2997FF" />
                <stop offset="1" stopColor="#BF5AF2" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-bold tracking-[0.2em] text-xs text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-md">
            HOLDING AI
          </span>
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden lg:flex items-center gap-8 glass-panel-sm px-8 py-3 bg-white/[0.02] border border-white/[0.05] shadow-[0_0_15px_rgba(41,151,255,0.05)] rounded-full">
          <Link href={`/${lang}/services/ai-agents`} className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#2997FF] hover:to-[#BF5AF2] transition-all duration-300">
            {dict.nav?.agents || "AI AGENTS"}
          </Link>
          <Link href={`/${lang}/services/saas`} className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#2997FF] hover:to-[#BF5AF2] transition-all duration-300">
            {dict.nav?.saas || "SAAS"}
          </Link>
          <Link href={`/${lang}/services/automation`} className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#2997FF] hover:to-[#BF5AF2] transition-all duration-300">
            {dict.nav?.automation || "AUTOMATION"}
          </Link>
          <Link href={`/${lang}/work`} className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#2997FF] hover:to-[#BF5AF2] transition-all duration-300">
            {dict.nav?.work || "OUR WORK"}
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center">
          <Link href={`/${lang}/contact`} className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold tracking-[0.15em] text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500 backdrop-blur-md">
            {dict.nav?.letsBuild || "LET'S BUILD"}
          </Link>
        </div>
      </div>
      
    </nav>
  );
}
