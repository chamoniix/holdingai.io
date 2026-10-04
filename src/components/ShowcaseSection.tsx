"use client";

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Project = {
  key: 'aura' | 'vitals' | 'nomad' | 'estate';
  img: string;
  span: string;
  aspect: string;
  offset: string;
};

const projects: Project[] = [
  { key: 'aura',   img: '/images/kosmos/showcase-ia.webp',          span: 'lg:col-span-7', aspect: 'aspect-[16/10]', offset: '' },
  { key: 'vitals', img: '/images/kosmos/showcase-mobile.webp',      span: 'lg:col-span-5', aspect: 'aspect-[3/4]',   offset: 'lg:mt-24' },
  { key: 'nomad',  img: '/images/kosmos/showcase-web.webp',         span: 'lg:col-span-5', aspect: 'aspect-[4/3]',   offset: 'lg:mt-6' },
  { key: 'estate', img: '/images/kosmos/showcase-backoffice.webp',  span: 'lg:col-span-7', aspect: 'aspect-[16/9]',  offset: 'lg:mt-16' },
];

export default function ShowcaseSection() {
  const t = useTranslations('showcase');

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0A0A0C] mb-12 md:mb-16"
        >
          {t('title')}
        </motion.h2>

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
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 }}
                className={`group relative ${project.span} ${project.offset} bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]`}
              >
                <div className={`${project.aspect} overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={title as string}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                  />
                </div>

                {/* Label below the image */}
                <div className="p-6 md:p-7">
                  <p className="text-[11px] uppercase tracking-widest text-[#8E8E93] mb-2">{sector}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0C] tracking-tight">{title}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
