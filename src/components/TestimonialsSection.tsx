'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const items = [
  { key: 'sophie', img: '/images/testimonials/1.jpg' },
  { key: 'james',  img: '/images/testimonials/2.jpg' },
  { key: 'elena',  img: '/images/testimonials/3.jpg' },
  { key: 'marc',   img: '/images/testimonials/4.jpg' },
] as const

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
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
            className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0A0A0C]"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => {
            const quote = t(`items.${item.key}.quote` as never);
            const name = t(`items.${item.key}.name` as never);
            const role = t(`items.${item.key}.role` as never);
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="bg-white border border-[#E5E5E5] rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={name as string} className="w-full h-full object-cover" />
                </div>
                <p className="text-[#2C2C30] text-base md:text-lg leading-relaxed flex-1">{quote}</p>
                <div className="mt-6 pt-5 border-t border-[#E5E5E5]">
                  <p className="text-[#0A0A0C] font-semibold">{name}</p>
                  <p className="text-sm text-[#6E6E73] mt-1">{role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
