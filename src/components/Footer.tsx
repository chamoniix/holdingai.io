"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050608] pt-20 md:pt-24 pb-12 relative overflow-hidden pointer-events-auto">
      {/* Background ambient glow - extremely subtle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2997FF]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Massive Signature */}
        <h2 
          className="text-white font-bold tracking-tighter text-center mb-12 md:mb-16 opacity-90"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.06em' }}
        >
          HOLDING AI
        </h2>

        {/* Minimalist 2-column on tablet, single stack on mobile */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12 md:mb-16">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <p className="text-white text-sm font-semibold tracking-widest uppercase mb-4">London</p>
            <p className="text-[#86868B] text-sm">Lytchett House, Freeland Park</p>
            <p className="text-[#86868B] text-sm">Wareham Road, Poole, Dorset</p>
            <p className="text-[#86868B] text-sm mt-4">info@holdingai.io</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col space-y-4">
              <Link href="#work" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">Our Work</Link>
              <Link href="#services" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">Services</Link>
              <Link href="#about" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">About Us</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="https://twitter.com" target="_blank" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">X (Twitter)</Link>
              <Link href="https://linkedin.com" target="_blank" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">LinkedIn</Link>
              <Link href="https://github.com" target="_blank" className="text-[#86868B] hover:text-white transition-colors text-sm font-medium">GitHub</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Centered, perfectly balanced */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#86868B] text-[11px] uppercase tracking-widest">
            © {new Date().getFullYear()} HoldingAI LTD.
          </p>
          
          <div className="flex gap-6">
            <Link href="/legal/mentions-legales" className="text-[#86868B] hover:text-white transition-colors text-[11px] uppercase tracking-widest">Legal Mentions</Link>
            <Link href="/legal/privacy" className="text-[#86868B] hover:text-white transition-colors text-[11px] uppercase tracking-widest">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-[#86868B] hover:text-white transition-colors text-[11px] uppercase tracking-widest">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
