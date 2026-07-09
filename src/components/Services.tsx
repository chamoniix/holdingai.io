'use client'

import { motion } from 'framer-motion'
import { servicesData } from '@/data/services-data'

export default function Services() {
  return (
    <section className="relative w-full py-[30vh] px-6 bg-transparent z-10 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="mb-40 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#86868B] uppercase mb-8">The Architecture</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            We build systems that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#86868B]">redefine industries.</span>
          </h3>
        </div>
        
        {/* Editorial Layout: Alternating massive text blocks */}
        <div className="flex flex-col gap-[30vh]">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <span className="text-[#2997FF] font-mono text-sm tracking-widest mb-6 block">
                  0{index + 1} // {service.icon}
                </span>
                <h4 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
                  {service.title}
                </h4>
                <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed max-w-lg">
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
          ))}
        </div>
      </div>
    </section>
  )
}
