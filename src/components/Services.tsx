'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { servicesData } from '@/data/services-data'

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-16 md:mb-20"
        >
          {t('eyebrow')}
        </motion.h2>

        {/* Numbered index */}
        <div className="border-t border-white/10">
          {servicesData.map((service, index) => {
            const title = t(`items.${service.key}.title` as never);
            const num = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
                className="group relative flex items-center gap-5 md:gap-10 border-b border-white/10 py-8 md:py-10 overflow-hidden"
              >
                {/* Number */}
                <span className="shrink-0 w-10 font-mono text-sm text-[#86868B] group-hover:text-[#BF5AF2] transition-colors duration-300">
                  {num}
                </span>

                {/* Huge title */}
                <h3 className="flex-1 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/40 group-hover:text-white transition-colors duration-300">
                  {title}
                </h3>

                {/* Floating image preview on hover (desktop) */}
                <div
                  className="pointer-events-none absolute right-0 hidden lg:block w-64 aspect-[4/3] -translate-y-1/2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden rounded-2xl border border-white/10"
                  style={{ top: 'var(--y, 50%)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={title as string}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
