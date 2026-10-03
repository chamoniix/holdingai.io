'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { servicesData } from '@/data/services-data'

export default function Services() {
  const lang = useLocale()
  const t = useTranslations('services')

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4"
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#0A0A0C] max-w-3xl"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, index) => {
            const title = t(`items.${service.key}.title` as never);
            const desc = t(`items.${service.key}.desc` as never);
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
                className="h-full"
              >
                <Link
                  href={`/${lang}/contact`}
                  className="group flex flex-col h-full bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={title as string}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0A0A0C] tracking-tight">{title}</h3>
                    <p className="mt-3 text-[#4A4A4E] font-light leading-relaxed">{desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
