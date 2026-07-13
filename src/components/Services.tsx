'use client'

import { motion } from 'framer-motion'
import LuxuryText from './ui/LuxuryText'
import { servicesData } from '@/data/services-data'
import { BrainCircuit, PenTool, Code2, LineChart, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  PenTool,
  Code2,
  LineChart
}

export default function Services() {
  return (
    <section id="services" className="relative pt-8 pb-16 md:pt-10 md:pb-20 px-6 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 relative z-10 mix-blend-difference">
          <LuxuryText as="h2" delay={0.1} className="text-[11px] font-semibold tracking-widest text-[#86868B] uppercase mb-8">
            The Architecture
          </LuxuryText>
          <br />
          <LuxuryText 
            as="h3" 
            delay={0.3} 
            className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40"
          >
            We build systems that redefine industries.
          </LuxuryText>
        </div>
        
        {/* Editorial Layout: Alternating massive text blocks */}
        <div className="w-full flex flex-col space-y-16 md:space-y-24 relative z-10">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <h4 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E2E2E8] to-[#86868B]">
                    {service.title}
                  </h4>
                  <p className="text-lg md:text-xl text-[#86868B] font-light leading-[1.6] max-w-lg">
                    {service.description}
                  </p>
                </div>
              
              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-square relative flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                {/* Subtle overlay gradient to blend edges if needed, or just let the image shine */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
