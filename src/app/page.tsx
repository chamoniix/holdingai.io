'use client'

import { useEffect } from 'react';
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  
  return (
    <main className="w-full bg-transparent overflow-hidden">
      
      {/* Scene 1: The Ignition */}
      <Hero />
      
      {/* Scene 2: The Architecture */}
      <Services />
      
      {/* Scene 3: The Proof */}
      <Portfolio />
      
      {/* Scene 4: The Ultimatum (Final CTA) */}
      <section className="relative py-40 px-6 bg-transparent z-10 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#2997FF30,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 
            className="text-white font-bold tracking-tight mb-8 leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.04em' }}
          >
            Ready to Lead the <span className="text-gradient-accent">AI Revolution?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#86868B] mb-12 font-light max-w-2xl">
            The future belongs to those who build it. Stop relying on templates. Let's architect something extraordinary.
          </p>
          
          <button className="group relative px-12 py-6 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-95 duration-300 ease-[0.16,1,0.3,1]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2997FF] to-[#BF5AF2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Initiate Project
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
