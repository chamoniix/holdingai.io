'use client'

import { motion } from 'framer-motion'
import LuxuryText from './ui/LuxuryText'

const projects = [
  { id: 1, title: 'AI Dashboard for Healthcare', category: 'HealthTech', image: '/images/assets/IMG_Portfolio_01.jpg' },
  { id: 2, title: 'E-commerce Personalization Engine', category: 'Retail', image: '/images/assets/IMG_Portfolio_02.jpg' },
  { id: 3, title: 'Financial Predictive Analytics', category: 'FinTech', image: '/images/assets/IMG_Portfolio_03.avif' },
]

export default function Portfolio() {
  return (
    <section className="relative w-full py-[30vh] bg-transparent pointer-events-none">
      <div className="max-w-5xl mx-auto px-6 pointer-events-auto">
        <div className="mb-32 text-center">
          <LuxuryText as="h2" delay={0.1} className="text-[11px] font-semibold tracking-widest text-[#86868B] uppercase mb-8">
            The Proof
          </LuxuryText>
          <LuxuryText as="h3" delay={0.3} className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Digital Monuments
          </LuxuryText>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] glass-panel overflow-hidden group"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-4 text-[#86868B] mb-4">
                  <div className="w-8 h-[1px] bg-[#86868B]/30" />
                  <span className="font-mono text-[11px] tracking-widest uppercase">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
