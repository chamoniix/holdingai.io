'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const members = [
  { img: '/images/kosmos/equipe-1.webp', role: 'cto' },
  { img: '/images/kosmos/equipe-2.webp', role: 'ai' },
  { img: '/images/kosmos/equipe-5.webp', role: 'mobile' },
  { img: '/images/kosmos/equipe-6-wide.webp', role: 'design' },
] as const

export default function TeamSection() {
  const t = useTranslations('team')

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
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
            className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0A0A0C]"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-4 text-lg text-[#4A4A4E] font-light"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, index) => {
            const role = t(`roles.${m.role}` as never);
            return (
              <motion.div
                key={m.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E5E5E5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={role as string}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#E5E5E5]" />
                  <span className="text-sm text-[#4A4A4E] font-medium">{role}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
