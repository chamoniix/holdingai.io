import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
      
      {/* Logo */}
      <div className="flex items-center gap-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4V20M20 4V20M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4V20M16 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        </svg>
        <span className="font-bold tracking-[0.2em] text-sm text-white">
          HOLDING AI
        </span>
      </div>

      {/* Center Links (Desktop only) */}
      <div className="hidden lg:flex items-center gap-10">
        <Link href="#agents" className="text-[11px] font-semibold tracking-wider text-white/70 hover:text-white transition-colors">
          AI AGENTS
        </Link>
        <Link href="#saas" className="text-[11px] font-semibold tracking-wider text-white/70 hover:text-white transition-colors">
          SAAS
        </Link>
        <Link href="#automation" className="text-[11px] font-semibold tracking-wider text-white/70 hover:text-white transition-colors">
          AUTOMATION
        </Link>
        <Link href="#work" className="text-[11px] font-semibold tracking-wider text-white/70 hover:text-white transition-colors">
          OUR WORK
        </Link>
        <Link href="#about" className="text-[11px] font-semibold tracking-wider text-white/70 hover:text-white transition-colors">
          ABOUT US
        </Link>
      </div>

      {/* CTA */}
      <div className="flex items-center">
        <button className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] font-semibold tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300">
          LET'S BUILD
        </button>
      </div>
      
    </nav>
  );
}
