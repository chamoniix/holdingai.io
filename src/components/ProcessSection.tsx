"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const processSteps = ["discover", "design", "prototype", "develop", "launch", "scale"] as const;

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-16 md:mb-24"
        >
          {t('eyebrow')}
        </motion.h2>

        <div className="relative">
          {/* Continuous line (desktop) */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10 hidden md:block" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-[#2997FF] to-[#BF5AF2] hidden md:block"
            style={{ width: '100%', transformOrigin: 'left center' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-6">
            {processSteps.map((stepKey, index) => {
              const title = t(`steps.${stepKey}.title` as never);
              const desc = t(`steps.${stepKey}.desc` as never);
              const num = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={stepKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.08 }}
                  className="relative md:pt-8"
                >
                  {/* Timeline dot (desktop) */}
                  <div className="absolute top-0 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-[#2997FF] hidden md:block" />

                  <span className="font-mono text-xs text-[#A1A1A6]">{num}</span>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm text-[#A1A1A6] font-light leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
