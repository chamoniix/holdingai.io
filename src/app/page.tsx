'use client'

import { useEffect } from 'react';
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import { initScrollAnimations } from "@/lib/scroll-animations";

export default function Home() {
  
  useEffect(() => {
    // Initialize GSAP scroll animations defined in lib/scroll-animations.ts
    initScrollAnimations();
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#050507] overflow-hidden text-white font-sans selection:bg-brand-purple selection:text-white">
      <Hero />
      <Services />
      <Portfolio />
      
      {/* Final CTA Section */}
      <section className="py-32 px-6 bg-[#0A0A0C] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Ready to Lead the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI Revolution?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
            Let's build something extraordinary together.
          </p>
          <button className="px-12 py-6 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Start Your Project
          </button>
        </div>
      </section>
    </main>
  );
}
