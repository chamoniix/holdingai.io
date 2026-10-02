'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const lang = useLocale()
  const t = useTranslations('hero')
  
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
      className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Aurora halo — ambient light behind the headline (blur on the div, never on text) */}
      <div className="hero-aurora" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 w-full mt-24">
        <motion.h1
          className="text-center font-bold text-balance flex flex-wrap justify-center items-baseline overflow-visible pb-4"
          style={{ 
            fontSize: 'clamp(3rem, 9vw, 9rem)', 
            letterSpacing: '-0.04em',
            lineHeight: 1.1
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span className="text-[#F5F5F7]">{t('title1')}</span>
          <em className="italic font-serif-display text-[#E2E2E8] pl-[0.25em]">
            {t('title2')}
          </em>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-8 text-xl md:text-2xl text-gray-200 max-w-3xl text-center font-normal drop-shadow-lg relative z-20"
          style={{ letterSpacing: '0em', lineHeight: 1.6 }}
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="mt-16 flex gap-6"
        >
          <Link href={`/${lang}/contact`}>
            <motion.button
              whileHover={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              {t('startProject')}
            </motion.button>
          </Link>
          <Link href={`/${lang}/work`}>
            <motion.button
              whileHover={{ scale: 0.98 }}
              className="px-8 py-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[40px] text-white font-semibold rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              {t('watchShowreel')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
