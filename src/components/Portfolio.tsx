'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const projects = [
  { id: 1, title: 'AI Dashboard', category: 'Web App', image: '/images/saas_platform.jpg' },
  { id: 2, title: 'Brand Identity', category: 'Branding', image: '/images/ai_mobile_app.jpg' },
  { id: 3, title: 'Mobile App', category: 'Mobile', image: '/images/ai_mobile_app.jpg' },
  { id: 4, title: 'E-commerce', category: 'Web App', image: '/images/autonomous_agents.jpg' },
  { id: 5, title: 'Logo Design', category: 'Branding', image: '/images/saas_platform.jpg' },
  { id: 6, title: 'SaaS Platform', category: 'Web App', image: '/images/saas_platform.jpg' }
]

const categories = ['All', 'Web App', 'Mobile', 'Branding']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)
  
  return (
    <section className="py-32 px-6 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Selected Work
          </h2>
          <p className="text-xl text-gray-400">
            Projects that push boundaries
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Projects grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3 }
                }}
                className="group relative rounded-2xl overflow-hidden bg-[#0F0F11] border border-white/5"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-white/60 mb-2">{project.category}</p>
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
