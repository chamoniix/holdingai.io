'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '⚡',
    title: 'AI Strategy',
    description: 'Transform your business with intelligent automation and machine learning solutions.',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: '🎨',
    title: 'Product Design',
    description: 'Craft world-class digital experiences with user-centered design methodology.',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: '🚀',
    title: 'Development',
    description: 'Full-stack engineering with cutting-edge technologies and frameworks.',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: '📊',
    title: 'Data & Analytics',
    description: 'Turn data into actionable insights with advanced analytics and visualization.',
    gradient: 'from-green-500/20 to-emerald-500/20'
  }
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = (mouseX / width - 0.5) * 2
    const yPct = (mouseY / height - 0.5) * 2
    
    x.set(xPct * 100)
    y.set(yPct * 100)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 0, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      className="group relative p-8 rounded-3xl bg-[#0F0F11] border border-white/5 overflow-hidden"
    >
      {/* Gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-white/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          backgroundSize: '200% 100%'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="text-5xl mb-6 inline-block"
        >
          {service.icon}
        </motion.div>
        
        <h3 className="text-2xl font-semibold text-white mb-3">
          {service.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed">
          {service.description}
        </p>
        
        {/* Arrow */}
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          whileHover={{ x: 8, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-white/60 inline-block"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
      
      {/* Particle effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: '50%',
              y: '50%',
              scale: 0,
              opacity: 0
            }}
            whileHover={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 1.5 + 0.5,
              opacity: Math.random() * 0.5
            }}
            transition={{ duration: 0.6 }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="py-32 px-6 bg-[#050507]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What We Do
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            End-to-end solutions for the AI-driven enterprise
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
