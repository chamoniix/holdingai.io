'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

/**
 * SILENT POWER — the manifesto.
 * Two lines of serif italic: line A in warm off-white, line B in solid purple.
 * Entered via opacity + y only (no blur, no gradient-clip on text).
 */
export default function ManifestoSection() {
  const t = useTranslations('manifesto')

  return (
    <section className="relative w-full py-28 md:py-36 px-6 bg-transparent z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display italic text-[#0A0A0C] leading-[1.15]"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
        >
          {t('a')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-serif-display italic text-[#7C3AED] leading-[1.15] mt-2"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
        >
          {t('b')}
        </motion.p>
      </div>
    </section>
  )
}
