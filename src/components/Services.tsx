'use client'

import { motion } from 'framer-motion'
import LuxuryText from './ui/LuxuryText'
import { servicesData } from '@/data/services-data'
import { BrainCircuit, PenTool, Code2, LineChart, LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  PenTool,
  Code2,
  LineChart
}

export default function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="relative pt-0 pb-16 md:pt-0 md:pb-20 px-6 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <LuxuryText as="h2" delay={0.1} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
            {t('eyebrow')}
          </LuxuryText>
        </div>
        
        {/* Editorial Layout: Alternating massive text blocks */}
        <div className="w-full flex flex-col space-y-16 md:space-y-24 relative z-10">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            // Dynamic keys: cast `as never` to satisfy next-intl key typing.
            const title = t(`items.${service.key}.title` as never);
            const description = t(`items.${service.key}.desc` as never);
            return (
              <motion.div 
                key={service.key}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <h4 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E2E2E8] to-[#86868B]">
                    {title}
                  </h4>
                  <p className="text-lg md:text-xl text-[#86868B] font-light leading-[1.6] max-w-lg">
                    {description}
                  </p>
                </div>
              
              <div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
                className="group relative w-full md:w-1/2 aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-2xl"
              >
                <img 
                  src={service.image} 
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                {/* Subtle overlay gradient to blend edges if needed, or just let the image shine */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                {/* Spotlight glow following the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(41,151,255,0.14), transparent 60%)',
                  }}
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
