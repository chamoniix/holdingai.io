'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { heroData } from '@/data/hero-data'

const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false })

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), springConfig)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth) * 2 - 1)
      mouseY.set(-(clientY / innerHeight) * 2 + 1)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#050507]"
      style={{ perspective: '1000px' }}
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ y: backgroundY, filter: useTransform(blur, (b: number) => `blur(${b}px)`) }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#050507] to-purple-900/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl" />
      </motion.div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 400 400\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")'
        }}
      />
      
      {/* 3D floating elements */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-transparent rounded-2xl blur-xl"
          style={{ transform: 'translateZ(50px)' }}
        />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-xl"
          style={{ transform: 'translateZ(80px)' }}
        />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-500/30 to-transparent rounded-full blur-lg"
          style={{ transform: 'translateZ(120px)' }}
        />
      </motion.div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        
        {/* Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-30 animate-pulse" />
            <h2 className="relative text-3xl font-bold tracking-tighter text-white">HOLDINGAI</h2>
          </div>
        </motion.div>
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 80, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center tracking-tight leading-[1.1]"
        >
          <span className="block">Building the</span>
          <motion.span
            initial={{ backgroundPosition: '100% 0%' }}
            animate={{ backgroundPosition: '0% 0%' }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            Future of AI
          </motion.span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
          className="mt-8 text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl text-center font-light leading-relaxed"
        >
          {heroData.subheadline}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              {heroData.cta}
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.08,
              borderColor: 'rgba(139, 92, 246, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            {heroData.ctaSecondary}
          </motion.button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated scroll line */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      />
    </section>
  )
}
