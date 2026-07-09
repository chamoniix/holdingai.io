"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import { motionTokens } from '@/lib/design-system';

import { MagneticButton } from './ui/MagneticButton';

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger variants for the headline
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 50, rotateX: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: motionTokens.duration.long, 
        ease: motionTokens.easing.appleSpring 
      }
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black perspective-[1000px]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Suspense fallback={<div className="w-full h-full bg-black/90" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Subtle overlay gradient to pop text */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-5xl">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-white"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div className="overflow-hidden" variants={textVariants}>
              <span className="block transform-gpu">WE BUILD</span>
            </motion.div>
            <motion.div className="overflow-hidden" variants={textVariants}>
              <span className="block text-gradient-neon transform-gpu">THE NEXT</span>
            </motion.div>
            <motion.div className="overflow-hidden" variants={textVariants}>
              <span className="block transform-gpu">GENERATION</span>
            </motion.div>
            <motion.div className="overflow-hidden" variants={textVariants}>
              <span className="block transform-gpu text-white/80">OF AI.</span>
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="mt-12 text-xl md:text-3xl text-white/60 font-light max-w-2xl text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: motionTokens.duration.long, 
              delay: 0.8,
              ease: motionTokens.easing.apple
            }}
          >
            Crafted with precision. Engineered for scale. Animated with purpose.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div 
          className="mt-16 flex flex-col sm:flex-row gap-6 pointer-events-auto items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: motionTokens.duration.medium, 
            delay: 1.2,
            ease: motionTokens.easing.apple
          }}
        >
          <MagneticButton>
            <div className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow duration-500">
              Build my product
            </div>
          </MagneticButton>
          <MagneticButton>
            <div className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300">
              Watch our work
            </div>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
