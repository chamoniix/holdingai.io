"use client";

import { motion } from 'framer-motion';
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
  return (
    <section className="relative py-32 bg-brand-graphite">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            WHAT WE <span className="text-gradient-neon">BUILD</span>
          </h2>
          <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">
            Premium, scalable, and intelligent solutions designed to dominate the market and elevate human potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-[#0a0a0a] p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${card.color} border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-500`}
            >
              <card.icon className="w-14 h-14 text-white mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Architected from the ground up for extreme performance, seamless scale, and stunning aesthetics.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
