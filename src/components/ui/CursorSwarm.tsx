'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  restX: number
  restY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  baseOpacity: number
  phase: number
}

type Pulse = { x: number; y: number; age: number }

const VIOLET = '#7C3AED'
const BLUE = '#2997FF'

const ATTRACT_RADIUS = 180   // cursor attraction radius (px)
const LINK_DIST = 90         // constellation link max distance
const CURSOR_ZONE = 200      // particles must be within this of cursor to link
const SPRING_K = 0.018       // spring stiffness toward rest position
const DAMPING = 0.86         // velocity damping

export default function CursorSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Accessibility / perf guards — no swarm on reduced-motion or touch devices.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reducedMotion || coarsePointer) {
      canvas.style.display = 'none'
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles: Particle[] = []

    const mouse = { x: -9999, y: -9999, active: false }
    const pulses: Pulse[] = []
    let lastScrollY = window.scrollY
    let scrollVel = 0
    let raf = 0
    let lastTime = performance.now()

    function sizeCanvas() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(height * dpr))
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function seed() {
      sizeCanvas()
      // Particle count proportional to surface area, clamped 60–120.
      const count = Math.round(Math.min(120, Math.max(60, (width * height) / 20000)))
      particles = Array.from({ length: count }, () => {
        const isViolet = Math.random() < 0.55
        return {
          restX: Math.random() * width,
          restY: Math.random() * height,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          radius: 1.5 + Math.random() * 1.5,
          color: isViolet ? VIOLET : BLUE,
          baseOpacity: 0.25 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    seed()

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onMouseLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }
    const onMouseDown = (e: MouseEvent) => {
      pulses.push({ x: e.clientX, y: e.clientY, age: 0 })
    }

    let resizeTimer: number | undefined
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(seed, 150)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('resize', onResize)

    function frame(now: number) {
      // Pause work while the tab is hidden (rAF is throttled by the browser anyway).
      if (document.hidden) {
        raf = requestAnimationFrame(frame)
        return
      }

      const dt = Math.min(32, now - lastTime)
      lastTime = now
      const t = now / 1000

      // Scroll velocity (wake/trail effect).
      const sy = window.scrollY
      scrollVel += (sy - lastScrollY - scrollVel) * 0.12
      lastScrollY = sy

      ctx!.clearRect(0, 0, width, height)

      // Physics update.
      for (const p of particles) {
        const driftX = Math.sin(t * 0.5 + p.phase) * 6
        const driftY = Math.cos(t * 0.4 + p.phase) * 6
        const tx = p.restX + driftX
        const ty = p.restY + driftY

        let ax = (tx - p.x) * SPRING_K
        let ay = (ty - p.y) * SPRING_K

        if (mouse.active) {
          const mdx = mouse.x - p.x
          const mdy = mouse.y - p.y
          const d = Math.hypot(mdx, mdy)
          if (d < ATTRACT_RADIUS && d > 0.5) {
            const fall = 1 - d / ATTRACT_RADIUS
            const pull = fall * fall * 0.06
            ax += (mdx / d) * pull
            ay += (mdy / d) * pull
          }
        }

        ay += scrollVel * 0.004

        p.vx = (p.vx + ax) * DAMPING
        p.vy = (p.vy + ay) * DAMPING
        p.x += p.vx
        p.y += p.vy
      }

      // Click pulses (micro-explosion).
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        pulse.age += dt
        const strength = Math.max(0, 1 - pulse.age / 500)
        if (strength <= 0) {
          pulses.splice(i, 1)
          continue
        }
        const radius = 10 + pulse.age * 0.5
        for (const p of particles) {
          const pdx = p.x - pulse.x
          const pdy = p.y - pulse.y
          const d = Math.hypot(pdx, pdy)
          if (d < radius && d > 1) {
            p.vx += (pdx / d) * strength * 1.6
            p.vy += (pdy / d) * strength * 1.6
          }
        }
      }

      // Constellation links — only near the cursor (keeps it subtle).
      if (mouse.active) {
        const near: Particle[] = []
        for (const p of particles) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (d < CURSOR_ZONE) near.push(p)
        }
        ctx!.lineWidth = 0.5
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i]
            const b = near[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const d = Math.hypot(dx, dy)
            if (d < LINK_DIST) {
              const alpha = (1 - d / LINK_DIST) * 0.18
              ctx!.strokeStyle = `rgba(124,58,237,${alpha.toFixed(3)})`
              ctx!.beginPath()
              ctx!.moveTo(a.x, a.y)
              ctx!.lineTo(b.x, b.y)
              ctx!.stroke()
            }
          }
        }
      }

      // Particles.
      for (const p of particles) {
        ctx!.globalAlpha = p.baseOpacity
        ctx!.fillStyle = p.color
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  )
}
