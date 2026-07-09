"use client";

import { motion } from 'framer-motion';
import { Smartphone, Cloud, Building2, Cpu, Bot, LineChart } from 'lucide-react';
import { motionTokens } from '@/lib/design-system';

const cards = [
  { title: "AI Mobile Apps", icon: Smartphone, color: "from-blue-500/20 to-purple-500/20" },
  { title: "SaaS Platforms", icon: Cloud, color: "from-cyan-500/20 to-blue-500/20" },
  { title: "Enterprise Software", icon: Building2, color: "from-purple-500/20 to-pink-500/20" },
  { title: "Automation Systems", icon: Cpu, color: "from-green-500/20 to-emerald-500/20" },
  { title: "AI Agents", icon: Bot, color: "from-orange-500/20 to-red-500/20" },
  { title: "Internal Dashboards", icon: LineChart, color: "from-indigo-500/20 to-blue-500/20" },
];

export default function WhatWeBuildSection() {
  return (
    <section className="relative py-32 bg-brand-graphite">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={motionTokens.presets.slideUp}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            WHAT WE <span className="text-gradient-neon">BUILD</span>
          </h2>
          <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">
            Premium, scalable, and intelligent solutions designed to dominate the market and elevate human potential.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={motionTokens.presets.staggerChildren}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={motionTokens.presets.staggerItemSlideUp}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
              }}
              transition={{ ease: motionTokens.easing.apple }}
              className={`bg-[#0a0a0a] p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${card.color} border border-white/10 shadow-2xl transition-colors duration-500`}
            >
              <card.icon className="w-14 h-14 text-white mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Architected from the ground up for extreme performance, seamless scale, and stunning aesthetics.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
