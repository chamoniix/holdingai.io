"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export default function NumbersSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Particles effect background could go here, for now using a gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-brand-purple/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              <Counter from={0} to={50} suffix="+" />
            </h4>
            <p className="text-xl text-brand-neon uppercase tracking-widest font-semibold">Products Launched</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              <Counter from={0} to={100} suffix="M+" />
            </h4>
            <p className="text-xl text-brand-cyan uppercase tracking-widest font-semibold">Users Reached</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              <Counter from={0} to={15} suffix="" />
            </h4>
            <p className="text-xl text-brand-purple uppercase tracking-widest font-semibold">Industry Awards</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
