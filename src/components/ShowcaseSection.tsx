"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Project = {
  key: 'aura' | 'vitals' | 'nomad' | 'estate' | 'lumina';
  img: string;
  span: string;
  aspect: string;
  offset: string;
};

const projects: Project[] = [
  { key: 'aura',   img: '/images/assets/IMG_Showcase_Aura.jpg',   span: 'lg:col-span-7', aspect: 'aspect-[16/10]', offset: '' },
  { key: 'vitals', img: '/images/assets/IMG_Showcase_Vitals.jpg', span: 'lg:col-span-5', aspect: 'aspect-[3/4]',   offset: 'lg:mt-28' },
  { key: 'nomad',  img: '/images/assets/IMG_Showcase_Nomad.jpg',  span: 'lg:col-span-4', aspect: 'aspect-[4/3]',   offset: 'lg:mt-10' },
  { key: 'estate', img: '/images/assets/IMG_Showcase_Estate.jpg', span: 'lg:col-span-5', aspect: 'aspect-square',  offset: 'lg:mt-40' },
  { key: 'lumina', img: '/images/assets/IMG_Showcase_Lumina.jpg', span: 'lg:col-span-3', aspect: 'aspect-[3/4]',   offset: 'lg:mt-6' },
];

export default function ShowcaseSection() {
  const t = useTranslations('showcase');

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
            {t('title')}
          </h2>
        </motion.div>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const title = t(`items.${project.key}.title` as never);
            const sector = t(`items.${project.key}.sector` as never);
            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
                className={`group relative ${project.span} ${project.offset} ${project.aspect} overflow-hidden cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.img}
                  alt={title as string}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Spotlight glow following the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(41,151,255,0.16), rgba(191,90,242,0.10) 45%, transparent 65%)',
                  }}
                />

                {/* Label */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
                  <p className="text-[11px] uppercase tracking-widest text-white/70 mb-2">{sector}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
