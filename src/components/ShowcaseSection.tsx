"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxuryText from './ui/LuxuryText';
import { motionTokens } from '@/lib/design-system';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Aura", category: "Luxury Banking", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" },
  { title: "Vitals", category: "Healthcare AI", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" },
  { title: "Nomad", category: "Travel Platform", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" },
  { title: "Estate", category: "Property CRM", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
  { title: "Lumina", category: "Education Platform", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" },
];

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

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

    // Animate the large background text based on the same horizontal scroll
    gsap.to(textRef.current, {
      x: window.innerWidth * -0.5,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen bg-transparent pointer-events-none overflow-hidden z-10">
      
      {/* Massive Background Typography */}
      <h2 
        ref={textRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 text-[15rem] md:text-[25rem] font-bold text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0"
      >
        SELECTED WORK
      </h2>

      {/* Title Overlay */}
      <div className="absolute top-20 left-12 md:left-20 z-20 pointer-events-none mix-blend-difference">
        <LuxuryText as="h3" className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Recent Projects
        </LuxuryText>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-auto">
        <div ref={scrollWrapperRef} className="flex gap-12 md:gap-24 px-12 md:px-[20vw] items-center h-full">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative flex-shrink-0 w-[300px] h-[450px] md:w-[500px] md:h-[700px] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              
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
