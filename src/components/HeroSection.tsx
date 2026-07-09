"use client";

import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MagneticButton } from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial Reveal Animation (Apple style staggering)
    const tl = gsap.timeline();
    
    // Select all the span lines inside the heading
    const lines = textRef.current?.querySelectorAll('.reveal-line');
    
    if (lines) {
      tl.fromTo(lines, 
        { y: 100, opacity: 0, rotateX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.15, 
          ease: "power4.out",
          delay: 0.2
        }
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }

    // 2. Scroll Animation (Parallax and fade out)
    gsap.to(textRef.current, {
      y: -200,
      opacity: 0,
      scale: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] perspective-[1000px]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Subtle overlay gradient to pop text */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center pointer-events-none mt-20">
        
        <h1 
          ref={textRef}
          className="text-6xl md:text-8xl lg:text-[12rem] font-bold tracking-[-0.04em] leading-[0.85] text-white text-center mix-blend-difference"
        >
          <div className="overflow-hidden pb-4">
            <span className="block reveal-line transform-gpu">HOLDING</span>
          </div>
          <div className="overflow-hidden pb-4">
            <span className="block reveal-line text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 transform-gpu">AI</span>
          </div>
        </h1>
        
        {/* CTAs */}
        <div 
          ref={ctaRef}
          className="mt-16 flex flex-col sm:flex-row gap-6 pointer-events-auto items-center justify-center"
        >
          <MagneticButton>
            <div className="px-10 py-5 rounded-full bg-white text-black font-semibold tracking-wide hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow duration-500 text-lg">
              Start Project
            </div>
          </MagneticButton>
          <MagneticButton>
            <div className="px-10 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300 text-lg">
              Explore Vision
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
