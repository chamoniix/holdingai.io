"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LuxuryText from './ui/LuxuryText';

const processSteps = [
  { title: "Discover", desc: "Understanding the problem, user needs, and business objectives." },
  { title: "Design", desc: "Crafting premium user interfaces and seamless experiences." },
  { title: "Prototype", desc: "Building interactive models to validate the core concepts." },
  { title: "Develop", desc: "Engineering scalable architecture with cutting-edge tech." },
  { title: "Launch", desc: "Deploying the product to the market with precision." },
  { title: "Scale", desc: "Optimizing and expanding the platform for global reach." },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-40 bg-transparent relative z-10 pointer-events-none">
      <div className="container mx-auto px-6 max-w-4xl pointer-events-auto">
        <div className="text-center mb-32">
          <LuxuryText as="h2" className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Our Process
          </LuxuryText>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          {/* Animated Vertical Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-brand-neon via-brand-purple to-brand-cyan -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.title} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-neon -translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.5)] z-10" />

                  {/* Content Container */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="glass-panel p-8 rounded-2xl"
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/60">{step.desc}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
