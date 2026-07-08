"use client";

import { motion } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';

export default function FinalCTASection() {
  return (
    <section className="relative py-60 bg-black overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[800px] h-[800px] bg-brand-neon/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          LET&apos;S BUILD SOMETHING<br />
          <span className="text-gradient-neon">IMPOSSIBLE.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <MagneticButton className="group">
            <div className="relative overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-brand-neon to-brand-purple rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-black px-12 py-6 rounded-full transition-transform duration-300 group-hover:scale-[0.98]">
                <span className="text-xl font-bold text-white tracking-wide">Start Your Project</span>
              </div>
            </div>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
