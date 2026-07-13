"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryText from './ui/LuxuryText';
import { motionTokens } from '@/lib/design-system';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Aura", category: "Luxury Banking", img: "/images/assets/IMG_Showcase_Aura.jpg" },
  { title: "Vitals", category: "Healthcare AI", img: "/images/assets/IMG_Showcase_Vitals.jpg" },
  { title: "Nomad", category: "Travel Platform", img: "/images/assets/IMG_Showcase_Nomad.jpg" },
  { title: "Estate", category: "Property CRM", img: "/images/assets/IMG_Showcase_Estate.jpg" },
  { title: "Lumina", category: "Education Platform", img: "/images/assets/IMG_Showcase_Lumina.jpg" },
];

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    // Calculate how far to translate the wrapper
    const scrollAmount = wrapper.scrollWidth - window.innerWidth;

    // The main horizontal scroll trigger
    gsap.to(wrapper, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        pin: true,
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen bg-transparent pointer-events-none overflow-hidden z-10">
      
      {/* Background elements removed per user request */}

      {/* Title Overlay */}
      <div className="absolute top-20 left-12 md:left-20 z-20 pointer-events-none mix-blend-difference">
        <LuxuryText 
          as="h3" 
          className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E2E2E8] to-[#86868B]"
        >
          Recent Projects
        </LuxuryText>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-auto">
        <div ref={scrollWrapperRef} className="flex gap-12 md:gap-24 px-12 md:px-[20vw] items-center h-full">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative flex-shrink-0 w-[300px] h-[450px] md:w-[500px] md:h-[700px] overflow-hidden cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10 pointer-events-none" />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              />
              
              <div className="absolute bottom-10 left-10 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <p className="text-sm uppercase tracking-widest text-white/80 mb-2">{project.category}</p>
                <h4 className="text-4xl font-bold text-white tracking-tight">{project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
