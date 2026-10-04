'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

function parseValue(raw: string): { num: number; suffix: string } | null {
  const m = raw.match(/^(\d+(?:[.,]\d+)?)(.*)$/)
  return m ? { num: parseFloat(m[1]), suffix: m[2] } : null
}

function Counter({ raw, label, inView }: { raw: string; label: string; inView: boolean }) {
  const reduced = useReducedMotion() ?? false
  const parsed = parseValue(raw)
  const target = parsed ? parsed.num : 0
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView || !parsed) return
    if (reduced) {
      setVal(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1600
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Hard guarantee: even if rAF stalls (background tab, throttling),
    // the final value is always displayed.
    const fallback = setTimeout(() => setVal(target), duration + 400)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [inView, parsed, reduced, target])

  return (
    <div className="lg:px-8 first:lg:pl-0">
      {parsed ? (
        <div className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          {val}
          <span className="text-[#A78BFA]">{parsed.suffix}</span>
        </div>
      ) : (
        <div className="text-5xl md:text-7xl font-bold tracking-tighter text-white">{raw}</div>
      )}
      <div className="mt-4 text-sm text-white/50 font-light">{label}</div>
    </div>
  )
}

export default function FiguresSection() {
  const t = useTranslations('figures')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  const items = [
    { key: 'experts', label: t('expertsLabel') },
    { key: 'projects', label: t('projectsLabel') },
    { key: 'satisfaction', label: t('satisfactionLabel') },
    { key: 'location', label: t('locationLabel') },
  ] as const

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0C] z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl mb-16 md:mb-20"
        >
          {t('title')}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:divide-x lg:divide-white/10">
          {items.map((item) => (
            <Counter
              key={item.key}
              raw={t(item.key as never) as string}
              label={item.label}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
