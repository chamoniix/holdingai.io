"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-3xl font-bold tracking-tighter text-white">
              HOLDING<span className="text-brand-cyan">AI</span>
            </h3>
            <div className="text-white/50 text-sm space-y-2">
              <p>HOLDINGAI LTD</p>
              <p>Company Number: 16382871</p>
              <p>Lytchett House, Freeland Park</p>
              <p>Wareham Road, Poole</p>
              <p>Dorset, BH16 6FA, UK</p>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Contact</h4>
            <ul className="text-white/50 space-y-4">
              <li>
                <a href="mailto:info@holdingai.io" className="hover:text-white transition-colors">info@holdingai.io</a>
              </li>
              <li>
                <a href="tel:+447537106967" className="hover:text-white transition-colors">+44 7537 106967</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Company</h4>
            <ul className="text-white/50 space-y-4">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-white transition-colors">Our Work</Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">Services</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Legal</h4>
            <ul className="text-white/50 space-y-4">
              <li>
                <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">Legal Mentions</Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} HoldingAI LTD. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">X (Twitter)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
