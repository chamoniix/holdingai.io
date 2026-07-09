"use client";

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { motionTokens } from '@/lib/design-system';

export function MagneticButton({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // Increased magnetism slightly
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileTap={{ scale: 0.95 }} // Added tap micro-interaction
      transition={motionTokens.spring.magnetic}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
}
