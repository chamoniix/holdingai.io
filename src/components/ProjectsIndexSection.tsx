'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Reveal from './ui/Reveal'

const projects = [
  'dct',
  'dream',
  'perhomes',
  'janex',
  'wallet',
  'raffle',
  'salesai',
  'edai',
  'dreamai',
  'tradepulse',
] as const

export default function ProjectsIndexSection() {
  const t = useTranslations('projectsIndex')
  const lang = useLocale()

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4">
            <span className="text-[#B0B0B5]">[ </span>{t('eyebrow')}<span className="text-[#B0B0B5]"> ]</span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0A0A0C]">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4E] font-light">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Editorial project index */}
        <div className="border-t border-[#E5E5E5]">
          {projects.map((key, index) => {
            const name = t(`items.${key}.name` as never)
            const tag = t(`items.${key}.tag` as never)
            const desc = t(`items.${key}.desc` as never)
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                className="group grid grid-cols-[auto_1fr_auto] items-start md:items-center gap-x-4 md:gap-x-8 gap-y-1.5 py-6 md:py-7 px-2 md:px-4 border-b border-[#E5E5E5] transition-colors duration-300 hover:bg-[#7C3AED]/[0.03] cursor-default"
              >
                {/* Number */}
                <span className="font-mono text-xs md:text-sm text-[#B0B0B5] pt-1.5 md:pt-0 transition-colors duration-300 group-hover:text-[#7C3AED]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Name + tag + description */}
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-2xl md:text-4xl font-semibold tracking-tight text-[#0A0A0C] transition-transform duration-300 group-hover:translate-x-1">
                      {name as string}
                    </span>
                    <span className="shrink-0 rounded-full bg-[#7C3AED]/[0.08] px-3 py-1 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                      {tag as string}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm text-[#6B7280] font-light leading-relaxed max-w-2xl">
                    {desc as string}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className="justify-self-end text-lg md:text-xl text-[#B0B0B5] pt-1 md:pt-0 transition-all duration-300 group-hover:text-[#7C3AED] group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* View all projects */}
        <Reveal className="mt-12 flex justify-center">
          <Link
            href={`/${lang}/work`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] transition-all duration-300"
          >
            {t('viewAll')}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
