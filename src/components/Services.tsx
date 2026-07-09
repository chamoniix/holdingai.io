'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { servicesData } from '@/data/services-data'

function BentoBox({ service, index }: { service: typeof servicesData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Magnetic / parallax physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const mouseX = useSpring(x, springConfig)
  const mouseY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Calculate distance from center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    // Move slightly towards mouse
    x.set((e.clientX - centerX) / 10)
    y.set((e.clientY - centerY) / 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Calculate grid spans based on index to create a complex bento layout
  // 24 columns total
  const colSpanClass = index === 0 ? 'col-span-24 lg:col-span-14' 
                     : index === 1 ? 'col-span-24 lg:col-span-10'
                     : index === 2 ? 'col-span-24 lg:col-span-10'
                     : 'col-span-24 lg:col-span-14'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      whileHover={{ scale: 0.98, zIndex: 10 }}
      transition={{ ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-[400px] glass-panel group overflow-hidden ${colSpanClass}`}
    >
      {/* Video Placeholder - matching Asset Production Guide */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/images/assets/VID_DataViz_Loop.webm" 
          poster={service.image}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] to-transparent" />
      </div>

      {/* Internal Gradient Bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#2997FF,#BF5AF2)] opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-0 mix-blend-screen" />

      {/* Content */}
      <div className="relative z-10 p-10 flex flex-col h-full justify-end">
        <span className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          {service.icon}
        </span>
        <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">
          {service.title}
        </h3>
        <p className="text-[#86868B] max-w-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="relative w-full py-[240px] px-6 bg-[#030304] z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-sm font-bold tracking-[0.1em] text-[#86868B] uppercase mb-4">Architecture</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            We engineer intelligent <span className="text-gradient-apple">systems at scale.</span>
          </h3>
        </div>
        
        {/* 24-Column Bento Grid */}
        <div className="grid-24">
          {servicesData.map((service, index) => (
            <BentoBox key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
