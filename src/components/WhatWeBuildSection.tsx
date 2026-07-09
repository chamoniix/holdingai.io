"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    title: "AI Mobile Apps", 
    desc: "Intelligent, predictive, and wildly fluid native experiences.", 
    img: "https://images.unsplash.com/photo-1618228399718-494025b3997e?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "SaaS Platforms", 
    desc: "Enterprise-grade architecture with consumer-grade aesthetics.", 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Autonomous Agents", 
    desc: "Systems that think, act, and scale beyond human limits.", 
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop" 
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
    <section ref={containerRef} className="relative bg-[#050505] pt-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 relative">
          
          {/* Left Column: Pinned Text */}
          <div className="lg:w-1/3 relative">
            <div ref={leftColRef} className="lg:h-screen flex flex-col justify-center sticky top-0 lg:static">
              <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-6">
                WHAT<br/>WE<br/><span className="text-brand-cyan">BUILD</span>
              </h2>
              <p className="text-xl text-white/50 max-w-sm">
                We craft digital ecosystems that redefine industries. From predictive mobile apps to massive enterprise platforms, our architecture is flawless.
              </p>
            </div>
          </div>

          {/* Right Column: Scrolling Images */}
          <div ref={rightColRef} className="lg:w-2/3 flex flex-col gap-32 pb-32">
            {services.map((service, idx) => (
              <div key={idx} className="service-card relative h-[70vh] rounded-[2rem] overflow-hidden group">
                <div className="absolute inset-0 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="service-img w-full h-[120%] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="service-text absolute bottom-12 left-12 right-12 z-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-2xl text-white/70 font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
