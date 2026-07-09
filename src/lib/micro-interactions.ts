import { motion } from 'framer-motion'

export const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.08,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
  },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
}

export const linkVariants = {
  rest: { opacity: 0.7 },
  hover: { 
    opacity: 1,
    x: 4,
    transition: { duration: 0.2 }
  }
}

export const cardVariants = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: { 
    y: -12,
    boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
}
