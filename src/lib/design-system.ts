export const motionTokens = {
  // Timing
  duration: {
    micro: 0.2,    // 200ms - hover states, micro interactions
    short: 0.3,    // 300ms - buttons, cards
    medium: 0.5,   // 500ms - scroll reveals
    long: 0.8,     // 800ms - page transitions, complex reveals
    hero: 1.2      // 1200ms - hero animations
  },
  
  // Easing (courbes Bézier)
  easing: {
    apple: [0.25, 0.1, 0.25, 1],         // Apple-style smooth ease
    appleSpring: [0.16, 1, 0.3, 1],      // Apple snappy spring feel without real physics
    dyson: [0.34, 1.56, 0.64, 1],        // Dyson-style bounce/pop
    elastic: [0.68, -0.55, 0.265, 1.55], // Exaggerated Spring
    fastOut: [0.16, 1, 0.3, 1],          // Fast out, slow in
    slowOut: [0.65, 0, 0.35, 1]          // Slow out, fast in
  },

  // Physics Spring (Framer Motion native springs)
  spring: {
    magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    snappy: { type: "spring", stiffness: 400, damping: 25 },
    bouncy: { type: "spring", stiffness: 300, damping: 15 }
  },
  
  // Animations presets
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    staggerChildren: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    },
    staggerItemSlideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }
    }
  }
};
