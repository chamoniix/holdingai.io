import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-center pointer-events-none">
      
      <div className="flex items-center justify-between w-full max-w-7xl pointer-events-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V20M20 4V20M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4V20M16 4V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          </svg>
          <span className="font-bold tracking-[0.2em] text-xs text-white drop-shadow-md">
            HOLDING AI
          </span>
        </div>

        {/* Center Links (Desktop only) */}
        <div className="hidden lg:flex items-center gap-8 glass-panel-sm px-8 py-3">
          <Link href="#agents" className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300">
            AI AGENTS
          </Link>
          <Link href="#saas" className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300">
            SAAS
          </Link>
          <Link href="#automation" className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300">
            AUTOMATION
          </Link>
          <Link href="#work" className="text-[10px] font-semibold tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300">
            OUR WORK
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center">
          <button className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold tracking-[0.15em] text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500 backdrop-blur-md">
            LET'S BUILD
          </button>
        </div>
      </div>
      
    </nav>
  );
}
