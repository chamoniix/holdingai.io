'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'pt', label: 'PT' },
  { code: 'fi', label: 'FI' },
  { code: 'no', label: 'NO' },
];

function LanguageSelector({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/') || '/');
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="appearance-none bg-white/70 border border-[#E5E5E5] rounded-full pl-5 pr-9 py-3 text-xs font-semibold tracking-[0.18em] text-[#0A0A0C] hover:bg-white transition-all backdrop-blur-md outline-none cursor-pointer"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code} className="bg-white text-[#0A0A0C]">
            {l.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A0A0C]/60">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default function Navigation() {
  const lang = useLocale();
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-center pointer-events-none transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FAFAF8]/80 backdrop-blur-md border-b border-[#E5E5E5]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl pointer-events-auto">
        {/* ... Logo & Links ... */}
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
          <span className="font-bold tracking-[0.2em] text-sm text-[#0A0A0C]">
            {t('brand')}
          </span>
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden lg:flex items-center gap-9 px-9 py-3.5 bg-white/70 backdrop-blur-md border border-[#E5E5E5] shadow-sm rounded-full">
          <Link href={`/${lang}/services/ai-agents`} className="text-xs font-semibold tracking-[0.18em] text-[#0A0A0C]/70 hover:text-[#7C3AED] transition-colors duration-300">
            {t('aiAgents')}
          </Link>
          <Link href={`/${lang}/services/saas`} className="text-xs font-semibold tracking-[0.18em] text-[#0A0A0C]/70 hover:text-[#7C3AED] transition-colors duration-300">
            {t('saas')}
          </Link>
          <Link href={`/${lang}/services/automation`} className="text-xs font-semibold tracking-[0.18em] text-[#0A0A0C]/70 hover:text-[#7C3AED] transition-colors duration-300">
            {t('automation')}
          </Link>
          <Link href={`/${lang}/work`} className="text-xs font-semibold tracking-[0.18em] text-[#0A0A0C]/70 hover:text-[#7C3AED] transition-colors duration-300">
            {t('work')}
          </Link>
        </div>

        {/* CTA & Lang */}
        <div className="flex items-center gap-3">
          <LanguageSelector currentLang={lang} />
          <Link href={`/${lang}/contact`} className="px-7 py-3 rounded-full bg-[#0A0A0C] border border-[#0A0A0C] text-xs font-semibold tracking-[0.18em] text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-all duration-300">
            {t('letsBuild')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
