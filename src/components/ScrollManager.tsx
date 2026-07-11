'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/scrollStore'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollManager() {
  const setProgress = useScrollStore((state) => state.setProgress)

  useEffect(() => {
    // This updates the Zustand store purely based on window scroll
    const updateScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0
      setProgress(progress)
    }

    // Use GSAP ScrollTrigger for smooth scrubbed updates
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setProgress(self.progress)
      }
    })

    // Also listen to raw scroll as a fallback or for fast scrolling
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => {
      st.kill()
      window.removeEventListener('scroll', updateScroll)
    }
  }, [setProgress])

  return null
}
