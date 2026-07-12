'use client'

import { useEffect, useRef } from 'react'

export default function Atmosphere() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const animate = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - window.innerWidth / 2}px, ${currentY - window.innerHeight / 2}px, 0)`
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020203]">
      {/* Dynamic volumetric glow following cursor (representing particle light reflection) */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -mt-[40vmax] -ml-[40vmax] w-[80vmax] h-[80vmax] rounded-full opacity-30 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15) 0%, rgba(41, 151, 255, 0.05) 30%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* Global slow-moving ambient gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-accent-blue/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-accent-pink/5 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Film grain noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  )
}
