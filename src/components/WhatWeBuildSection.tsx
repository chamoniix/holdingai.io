"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Cloud, Building2, Cpu, Bot, LineChart } from 'lucide-react';

const cards = [
  { title: "AI Mobile Apps", icon: Smartphone, color: "from-blue-500/20 to-purple-500/20" },
  { title: "SaaS Platforms", icon: Cloud, color: "from-cyan-500/20 to-blue-500/20" },
  { title: "Enterprise Software", icon: Building2, color: "from-purple-500/20 to-pink-500/20" },
  { title: "Automation Systems", icon: Cpu, color: "from-green-500/20 to-emerald-500/20" },
  { title: "AI Agents", icon: Bot, color: "from-orange-500/20 to-red-500/20" },
  { title: "Internal Dashboards", icon: LineChart, color: "from-indigo-500/20 to-blue-500/20" },
];

export default function WhatWeBuildSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-brand-graphite">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div 
          className="absolute top-20 text-center z-20"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            y: useTransform(scrollYProgress, [0, 0.1], [50, 0])
          }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            WHAT WE <span className="text-gradient-neon">BUILD</span>
          </h2>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto h-[60vh] flex items-center justify-center perspective-[2000px]">
          {cards.map((card, index) => {
            const start = (index / cards.length) * 0.7;
            const end = start + 0.2;
            const fadeOut = end + 0.05;
            const progressRange = [start, end];
            
            const y = useTransform(scrollYProgress, progressRange, [500, 0]);
            const opacity = useTransform(scrollYProgress, [start, start + 0.05, end, fadeOut], [0, 1, 1, 0]);
            const scale = useTransform(scrollYProgress, progressRange, [0.8, 1]);
            const rotateX = useTransform(scrollYProgress, progressRange, [45, 0]);
            const z = useTransform(scrollYProgress, progressRange, [-500, 0]);

            return (
              <motion.div
                key={index}
                className="absolute w-full max-w-md"
                style={{
                  y,
                  opacity,
                  scale,
                  rotateX,
                  z,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className={`glass-panel p-8 rounded-3xl bg-gradient-to-br ${card.color} border border-white/10 shadow-2xl`}>
                  <card.icon className="w-16 h-16 text-white mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-white/60 text-lg">
                    Premium, scalable, and intelligent solutions designed to dominate the market and elevate human potential.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
