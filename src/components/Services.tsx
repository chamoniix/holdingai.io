'use client'

import { motion } from 'framer-motion'
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
    <section className="relative w-full py-[30vh] px-6 bg-transparent z-10 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="mb-40 text-center">
          <h2 className="text-[11px] font-semibold tracking-widest text-[#86868B] uppercase mb-8">The Architecture</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            We build systems that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#86868B]">redefine industries.</span>
          </h3>
        </div>
        
        {/* Editorial Layout: Alternating massive text blocks */}
        <div className="flex flex-col gap-[30vh]">
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
                  <div className="flex items-center gap-4 text-[#86868B] mb-6">
                    <span className="font-mono text-[11px] tracking-widest">0{index + 1}</span>
                    <div className="w-8 h-[1px] bg-[#86868B]/30" />
                    {IconComponent && <IconComponent size={16} strokeWidth={1.5} />}
                  </div>
                  <h4 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
                    {service.title}
                  </h4>
                  <p className="text-lg md:text-xl text-[#86868B] font-light leading-[1.6] max-w-lg">
                    {service.description}
                  </p>
                </div>
              
              <div className="w-full md:w-1/2 aspect-square relative glass-panel flex items-center justify-center overflow-hidden">
                <video 
                  src="/images/assets/VID_DataViz_Loop.webm" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50"
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
