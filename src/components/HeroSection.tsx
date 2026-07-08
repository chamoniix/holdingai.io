"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { MagneticButton } from './ui/MagneticButton';

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black/90" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32 h-full flex flex-col justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          >
            WE BUILD<br />
            <span className="text-gradient-neon">THE NEXT</span><br />
            GENERATION<br />
            OF AI PRODUCTS.
          </motion.h1>
          
          <motion.p 
            className="mt-8 text-xl md:text-2xl text-white/60 font-light max-w-2xl text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            We design, build and launch premium AI-powered mobile apps, SaaS platforms, internal tools, and custom software for startups and enterprises.
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="mt-16 flex flex-col sm:flex-row gap-6 pointer-events-auto items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <MagneticButton>
            <div className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform duration-300">
              Build my product
            </div>
          </MagneticButton>
          <MagneticButton>
            <div className="px-8 py-4 rounded-full glass-panel text-white font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300">
              Watch our work
            </div>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
