'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LuxuryTextProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export default function LuxuryText({ children, className, delay = 0, as = 'div' }: LuxuryTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 100,
        mass: 1,
        duration: 1.2
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(8px)',
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 100,
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as any

  return (
    <MotionComponent
      ref={ref}
      style={{ display: 'inline-block' }}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn("will-change-transform will-change-filter", className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', paddingRight: '0.25em' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  )
}
