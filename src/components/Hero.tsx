'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { heroData } from '@/data/hero-data'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, -400])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 20])
  
  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      <motion.div 
        style={{ y: textY, opacity, filter: useTransform(blur, (b: number) => `blur(${b}px)`) }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-center font-bold"
          style={{ 
            fontSize: 'clamp(4rem, 12vw, 15rem)', 
            letterSpacing: '-0.04em',
            lineHeight: 0.85
          }}
        >
          {heroData.headline}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-8 text-xl md:text-2xl text-[#86868B] max-w-3xl text-center font-light"
          style={{ letterSpacing: '0em', lineHeight: 1.6 }}
        >
          {heroData.subheadline}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="mt-16 flex gap-6"
        >
          <motion.button
            whileHover={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {heroData.cta}
          </motion.button>
          <motion.button
            whileHover={{ scale: 0.98 }}
            className="px-8 py-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[40px] text-white font-semibold rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all"
          >
            {heroData.ctaSecondary}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
