'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const projects = [
  { id: 1, title: 'AI Dashboard for Healthcare', category: 'HealthTech', image: '/images/assets/IMG_Portfolio_01.avif' },
  { id: 2, title: 'E-commerce Personalization Engine', category: 'Retail', image: '/images/assets/IMG_Portfolio_02.avif' },
  { id: 3, title: 'Financial Predictive Analytics', category: 'FinTech', image: '/images/assets/IMG_Portfolio_03.avif' },
  { id: 4, title: 'NLP Customer Service Chatbot', category: 'Enterprise', image: '/images/assets/IMG_Portfolio_04.avif' },
  { id: 5, title: 'Computer Vision Quality Control', category: 'Industry', image: '/images/assets/IMG_Portfolio_05.avif' },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return

    // Calculate total scroll distance based on track width vs viewport width
    const trackWidth = trackRef.current.offsetWidth
    const viewportWidth = window.innerWidth
    const amountToScroll = trackWidth - viewportWidth + 100 // add padding

    gsap.to(trackRef.current, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${amountToScroll}`, // Pin for the exact duration of the scroll
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen bg-[#030304] overflow-hidden flex items-center">
      
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2997FF20,transparent_50%)] pointer-events-none" />

      {/* Header that pins with the container */}
      <div className="absolute top-24 left-12 z-20">
        <h2 className="text-sm font-bold tracking-[0.1em] text-[#86868B] uppercase mb-2">The Proof</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Digital Monuments
        </h3>
      </div>

      {/* Horizontal Scroll Track */}
      <div ref={trackRef} className="flex gap-12 px-12 pt-32 w-max h-full items-center">
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            whileHover={{ scale: 0.98 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-[70vw] md:w-[50vw] lg:w-[40vw] h-[60vh] glass-panel overflow-hidden shrink-0 cursor-none"
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0">
              <img 
                src={project.image} 
                alt={project.title} 
                loading={project.id <= 2 ? "eager" : "lazy"} // Priority lazy loading
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/20 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-10 z-10">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-white bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                {project.category}
              </span>
              <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
