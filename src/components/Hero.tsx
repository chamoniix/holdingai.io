'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Magnetic from './ui/Magnetic'

const stats = [
  { value: 'projects', label: 'projectsLabel', stars: false },
  { value: 'revenue', label: 'revenueLabel', stars: true },
  { value: 'clients', label: 'clientsLabel', stars: false },
] as const

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero() {
  const lang = useLocale()
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <section ref={sectionRef} className="relative w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden bg-transparent">
      {/* Subtle violet halo (opacity < 0.1) */}
      <div
        className="absolute -top-40 right-0 w-[44rem] h-[44rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Vertical side label — left edge */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 hidden lg:flex pointer-events-none">
        <span className="uppercase tracking-[0.4em] text-[10px] font-semibold text-[#8E8E93] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
          {t('sideLabel')}
        </span>
      </div>

      {/* 2-column grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: statement — cascading entrance */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8E8E93] font-semibold mb-6"
          >
            {t('label')}
          </motion.p>

          <h1
            className="font-bold tracking-tight leading-[0.95]"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
              className="block text-[#0A0A0C]"
            >
              {t('title1')}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="block italic font-serif-display text-[#0A0A0C]"
            >
              {t('title2')}
            </motion.em>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
            className="mt-6 text-lg md:text-xl text-[#4A4A4E] max-w-lg font-light"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Magnetic>
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0C] text-white font-semibold rounded-full hover:bg-[#7C3AED] transition-colors"
              >
                {t('startProject')}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href={`/${lang}/work`}
                className="group inline-flex items-center gap-2 px-8 py-4 border border-[#D1D1D6] text-[#0A0A0C] font-semibold rounded-full hover:border-[#0A0A0C] transition-colors"
              >
                {t('watchShowreel')}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: image card — fade + scale + scroll parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          <motion.div style={{ y: imageY }}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-visual.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto mt-16 md:mt-20 pt-10 border-t border-[#E5E5E5]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x divide-[#E5E5E5]">
          {stats.map((s, i) => (
            <div key={s.value} className={i === 0 ? 'sm:pr-8' : 'sm:px-8'}>
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-semibold text-[#0A0A0C] tracking-tight">
                  {t(`stats.${s.value}` as never)}
                </span>
                {s.stars && (
                  <span className="flex gap-0.5 text-[#FFD447] text-lg leading-none" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((n) => <span key={n}>★</span>)}
                  </span>
                )}
              </div>
              <span className="mt-2 block text-sm text-[#6E6E73] font-light">
                {t(`stats.${s.label}` as never)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
