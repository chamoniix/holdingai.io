"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryText from './ui/LuxuryText';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    title: "AI Mobile Apps", 
    desc: "Intelligent, predictive, and wildly fluid native experiences.", 
    img: "/images/ai_mobile_app.jpg" 
  },
  { 
    title: "SaaS Platforms", 
    desc: "Enterprise-grade architecture with consumer-grade aesthetics.", 
    img: "/images/saas_platform.jpg" 
  },
  { 
    title: "Autonomous Agents", 
    desc: "Systems that think, act, and scale beyond human limits.", 
    img: "/images/autonomous_agents.jpg" 
  }
];

export default function WhatWeBuildSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the left column while the right column scrolls
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false, // Let the right column scroll past it naturally
    });

    // Animate the images in the right column
    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
    cards.forEach((card) => {
      const img = card.querySelector('.service-img');
      const text = card.querySelector('.service-text');
      
      // Image Parallax
      gsap.fromTo(img, 
        { scale: 1.2, y: -50 },
        {
          scale: 1,
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Text Reveal
      gsap.fromTo(text,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-transparent pt-32 z-10 pointer-events-none">
      <div className="container mx-auto px-6 max-w-7xl pointer-events-auto">
        <div className="flex flex-col lg:flex-row gap-20 relative">
          
          {/* Left Column: Pinned Text */}
          <div className="lg:w-1/3 relative">
            <div ref={leftColRef} className="lg:h-screen flex flex-col justify-center sticky top-0 lg:static">
              <LuxuryText as="h2" className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-6">
                WHAT WE BUILD
              </LuxuryText>
              <p className="text-xl text-white/50 max-w-sm">
                We craft digital ecosystems that redefine industries. From predictive mobile apps to massive enterprise platforms, our architecture is flawless.
              </p>
            </div>
          </div>

          {/* Right Column: Scrolling Images */}
          <div ref={rightColRef} className="lg:w-2/3 flex flex-col gap-32 pb-32">
            {services.map((service, idx) => (
              <div key={idx} className="service-card relative h-[70vh] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10 bg-[#0a0a0a]">
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="service-img w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                
                <div className="service-text absolute bottom-12 left-12 right-12 z-10 backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-[-0.02em]">{service.title}</h3>
                  <p className="text-xl text-white/70 font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
