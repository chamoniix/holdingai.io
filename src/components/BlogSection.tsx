'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Reveal from './ui/Reveal'

const posts = [
  { key: 'agents', slug: 'ai-agents-agentic-ai', img: '/images/kosmos/blog-mobile.webp' },
  { key: 'automation', slug: 'ai-automation-workflows', img: '/images/kosmos/blog-retention.webp' },
  { key: 'video', slug: 'ai-video-generation', img: '/images/kosmos/blog-ab.webp' },
  { key: 'everyday', slug: 'everyday-ai-beginners', img: '/images/kosmos/blog-lidar.webp' },
] as const

export default function BlogSection() {
  const locale = useLocale()
  const t = useTranslations('blog')

  return (
    <section id="blog" className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4">
            <span className="text-[#B0B0B5]">[ </span>{t('eyebrow')}<span className="text-[#B0B0B5]"> ]</span>
          </p>
          <h2 id="blog-section-title" className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0A0A0C]">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-[#4A4A4E] font-light">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="relative">
          <div
            role="region"
            aria-labelledby="blog-section-title"
            tabIndex={0}
            className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-5 outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F7F5] md:-mx-12 md:gap-7 md:px-12 lg:-mx-24 lg:px-24"
          >
          {posts.map((p, index) => {
            const title = t(`items.${p.key}.title` as never);
            const tag = t(`items.${p.key}.tag` as never);
            return (
              <motion.article
                key={p.key}
                aria-label={title as string}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="group w-[min(82vw,350px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.14)] md:w-[min(44vw,390px)]"
              >
                <Link href={`/${locale}/blog/${p.slug}`} className="flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7C3AED]">
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
                </Link>
              </motion.article>
            );
          })}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-5 right-0 top-0 w-12 bg-gradient-to-l from-[#F7F7F5] to-transparent md:w-20" />
          <div aria-hidden="true" className="mt-4 flex items-center justify-end gap-2 text-[#7C3AED]">
            <span className="h-px w-12 bg-[#7C3AED]/30" />
            <span className="text-lg leading-none">→</span>
          </div>
        </div>
      </div>
    </section>
  )
}
