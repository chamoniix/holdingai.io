"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", 
  "Three.js", "Python", "Node.js", "Supabase", "OpenAI", 
  "Claude", "Gemini", "Docker", "AWS", "Cloudflare"
];

export default function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            THE TECHNOLOGY <span className="text-brand-cyan">ECOSYSTEM</span>
          </motion.h2>
          <motion.p 
            className="mt-6 text-xl text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            We leverage the most advanced frameworks and AI models to build products that feel years ahead.
          </motion.p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
          {/* Subtle connecting lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,184,255,0.15),transparent_70%)] rounded-full blur-3xl -z-10" />

          {techStack.map((tech, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={tech}
                style={{ y: isEven ? y1 : y2 }}
                className="glass-panel px-6 py-4 rounded-2xl flex items-center justify-center border border-white/5 hover:border-brand-neon/50 transition-colors duration-500 cursor-default"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <span className="text-white/80 font-medium tracking-wide">{tech}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
