'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Reveal from './ui/Reveal'

const posts = [
  { key: 'mobile', img: '/images/kosmos/blog-mobile.webp' },
  { key: 'retention', img: '/images/kosmos/blog-retention.webp' },
  { key: 'ab', img: '/images/kosmos/blog-ab.webp' },
  { key: 'lidar', img: '/images/kosmos/blog-lidar.webp' },
] as const

export default function BlogSection() {
  const t = useTranslations('blog')

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

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {posts.map((p, index) => {
            const title = t(`items.${p.key}.title` as never);
            const tag = t(`items.${p.key}.tag` as never);
            return (
              <motion.a
                key={p.key}
                href="#"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="group flex flex-col bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.14)]"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={title as string}
                    className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">{tag}</span>
                  <h3 className="text-lg font-semibold text-[#0A0A0C] leading-snug flex-1">{title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#6E6E73] group-hover:text-[#7C3AED] transition-colors">
                    {t('readMore')}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  )
}
