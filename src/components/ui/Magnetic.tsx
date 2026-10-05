'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * Magnetic hover wrapper: gently pulls the element toward the cursor
 * (max ~8px at default strength 0.3) with a spring, resets on leave.
 * Disabled when prefers-reduced-motion.
 */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
