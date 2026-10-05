'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Unified scroll-reveal: fade-up (opacity + y only, no blur/filter on text).
 * Used for section headers and any block that needs a consistent entry.
 * Respects prefers-reduced-motion (content shown immediately, no animation).
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
