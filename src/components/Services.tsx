'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { servicesData } from '@/data/services-data'
import Reveal from './ui/Reveal'

export default function Services() {
  const t = useTranslations('services')
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="services" className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#0A0A0C] max-w-3xl">
            {t('title')}
          </h2>
        </Reveal>

        {/* Asymmetric: sticky image left, accordion right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: sticky vertical image */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kosmos/showcase-ia.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: accordion */}
          <div className="border-t border-[#E5E5E5]">
            {servicesData.map((service, index) => {
              const title = t(`items.${service.key}.title` as never);
              const desc = t(`items.${service.key}.desc` as never);
              const num = String(index + 1).padStart(2, '0');
              const isOpen = open === index;
              return (
                <div key={service.key} className="border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="group w-full flex items-center gap-5 py-6 md:py-7 text-left"
                  >
                    <span className="shrink-0 w-10 font-mono text-sm text-[#8E8E93] transition-colors duration-300 group-hover:text-[#7C3AED]">{num}</span>
                    <span
                      className={`flex-1 text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-[#0A0A0C]' : 'text-[#0A0A0C]/55 group-hover:text-[#0A0A0C]'
                      }`}
                    >
                      {title}
                    </span>
                    <span
                      className={`shrink-0 inline-block text-2xl transition-all duration-300 ${
                        isOpen ? 'rotate-[-45deg] text-[#7C3AED]' : 'text-[#0A0A0C]/60 group-hover:translate-x-1 group-hover:text-[#0A0A0C]'
                      }`}
                    >
                      →
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pl-15 md:pl-[3.75rem] text-[#4A4A4E] font-light leading-relaxed max-w-xl">
                          {desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
