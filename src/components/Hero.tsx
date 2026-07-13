'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from '@/i18n/LanguageContext'
import Link from 'next/link'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { lang, dict } = useTranslation()
  
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 w-full mt-24">
        <motion.h1
          className="text-center font-bold text-balance flex flex-wrap justify-center overflow-visible"
          style={{ 
            fontSize: 'clamp(3rem, 9vw, 9rem)', 
            letterSpacing: '-0.04em',
            lineHeight: 0.95
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.2 }
            }
          }}
        >
          {((dict?.hero?.headline as string) || "Building the Future of AI").split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
              {Array.from(word).map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 inline-block drop-shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1, 
                      y: 0, 
                      filter: 'blur(0px)',
                      transition: { type: 'spring', damping: 12, stiffness: 100 }
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-8 text-xl md:text-2xl text-[#86868B] max-w-3xl text-center font-light"
          style={{ letterSpacing: '0em', lineHeight: 1.6 }}
        >
          {dict?.hero?.subheadline || "We craft digital experiences where artificial intelligence meets human ambition."}
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
              {dict?.hero?.cta1 || "Start Your Project"}
            </motion.button>
          </Link>
          <Link href={`/${lang}/work`}>
            <motion.button
              whileHover={{ scale: 0.98 }}
              className="px-8 py-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[40px] text-white font-semibold rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              {dict?.hero?.cta2 || "Watch Showreel"}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
