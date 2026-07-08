"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MockupCard } from './ui/MockupCard';

const projects = [
  { title: "Aura", category: "Luxury Banking", color: "from-amber-500 to-orange-600" },
  { title: "Vitals", category: "Healthcare AI", color: "from-blue-500 to-cyan-500" },
  { title: "Nomad", category: "Travel Platform", color: "from-emerald-500 to-teal-600" },
  { title: "Estate", category: "Property CRM", color: "from-purple-500 to-indigo-600" },
  { title: "Crave", category: "Food Delivery", color: "from-red-500 to-pink-600" },
  { title: "Lumina", category: "Education Platform", color: "from-yellow-400 to-orange-500" },
  { title: "Pulse", category: "Fitness App", color: "from-green-400 to-emerald-600" },
];

export default function ShowcaseSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background gradient hint */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-brand-graphite to-transparent opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 absolute top-20 left-0 right-0 z-10 pointer-events-none">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            SELECTED <span className="text-brand-purple">WORK</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-20 mt-20">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="flex-shrink-0"
              whileHover={{ y: -20, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MockupCard {...project} />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
