'use client'

import { useEffect } from 'react';
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ContactSection from "@/components/ContactSection";
import FinalCTASection from "@/components/FinalCTASection";
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
      {/* We keep the old Contact/CTA sections for continuity until we rebuild them */}
      <ContactSection />
      <FinalCTASection />
    </main>
  );
}
