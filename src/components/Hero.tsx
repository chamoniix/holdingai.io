'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

const stats = [
  { value: 'projects', label: 'projectsLabel' },
  { value: 'revenue', label: 'revenueLabel' },
  { value: 'clients', label: 'clientsLabel' },
] as const

export default function Hero() {
  const lang = useLocale()
  const t = useTranslations('hero')

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-transparent">
      {/* Aurora halo — ambient light behind the headline (blur on the div, never on text) */}
      <div className="hero-aurora" aria-hidden="true" />

      {/* ORBIT — rotating signature ring, partially off-frame */}
      <div
        className="absolute right-[-14rem] md:right-[-9rem] top-1/2 -translate-y-1/2 w-[40rem] h-[40rem] md:w-[48rem] md:h-[48rem] pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="orbit-ring absolute inset-0" />
        <div className="orbit-core absolute inset-[28%]" />
        <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
      </div>

      {/* Vertical side label — left edge */}
      <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex pointer-events-none">
        <span className="uppercase tracking-[0.4em] text-[10px] font-semibold text-[#86868B] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
          {t('sideLabel')}
        </span>
      </div>

      {/* Statement — asymmetric, left-aligned, bottom-anchored */}
      <div className="relative z-10 flex-1 flex items-end px-6 md:px-12 lg:px-24 pt-40 pb-16">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-left font-bold tracking-tight leading-[0.95]"
            style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', letterSpacing: '-0.04em' }}
          >
            <span className="block text-[#F5F5F7]">{t('title1')}</span>
            <em className="block italic font-serif-display text-[#E2E2E8]">{t('title2')}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-8 text-lg md:text-xl text-[#A1A1A6] max-w-xl text-left font-light"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Bottom bar — stats + CTAs */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pb-10 pt-10 border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Stats */}
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  {t(`stats.${s.value}` as never)}
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-widest text-[#86868B]">
                  {t(`stats.${s.label}` as never)}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              {t('startProject')}
            </Link>
            <Link
              href={`/${lang}/work`}
              className="px-8 py-4 border border-white/15 bg-white/[0.03] text-white font-semibold rounded-full hover:bg-white/[0.08] transition-colors"
            >
              {t('watchShowreel')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
