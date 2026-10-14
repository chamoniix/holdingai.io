'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

// key = message key (projectsIndex.items.*), image = approved square portfolio visual
const projects = [
  { key: 'dct', slug: 'converge', image: 'converge-gpt2.jpg' },
  { key: 'dream', slug: 'bloom', image: 'bloom-gpt2.jpg' },
  { key: 'perhomes', slug: 'domus', image: 'domus-gpt2.jpg' },
  { key: 'janex', slug: 'tandem', image: 'tandem-gpt2.jpg' },
  { key: 'wallet', slug: 'vault', image: 'vault-gpt2.jpg' },
  { key: 'raffle', slug: 'fortuna', image: 'fortuna-gpt2.jpg' },
  { key: 'salesai', slug: 'closer', image: 'closer-gpt2.jpg' },
  { key: 'edai', slug: 'mentor', image: 'mentor-gpt2.jpg' },
  { key: 'dreamai', slug: 'reverie', image: 'reverie-gpt2.jpg' },
  { key: 'tradepulse', slug: 'meridian', image: 'meridian-gpt2.jpg' },
] as const;

export default function WorkPage() {
  const t = useTranslations('projectsIndex');
  const tw = useTranslations('work');
  const tc = useTranslations('homeFinal');
  const lang = useLocale();

  return (
    <main className="w-full bg-transparent pt-32 md:pt-40 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <Reveal className="mb-16 md:mb-20 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4">
            <span className="text-[#B0B0B5]">[ </span>{t('eyebrow')}<span className="text-[#B0B0B5]"> ]</span>
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0A0A0C] mb-6">
            {tw('title')}
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4E] font-light leading-relaxed">
            {tw('description')}
          </p>
        </Reveal>

        {/* Projects */}
        <div className="space-y-16 md:space-y-24">
          {projects.map(({ key, slug, image }, index) => {
            const name = t(`items.${key}.name` as never) as string;
            const tag = t(`items.${key}.tag` as never) as string;
            const desc = t(`items.${key}.desc` as never) as string;
            return (
              <Reveal key={key}>
                <div id={slug} className="scroll-mt-32">
                  {/* Title row */}
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-4">
                    <span className="font-mono text-sm text-[#B0B0B5]">{String(index + 1).padStart(2, '0')}</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0A0A0C]">{name}</h2>
                    <span className="rounded-full bg-[#7C3AED]/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                      {tag}
                    </span>
                  </div>
                  <p className="text-base md:text-lg text-[#4A4A4E] font-light max-w-2xl mb-8">{desc}</p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="group max-w-3xl overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.12)]"
                  >
                    <div className="aspect-square overflow-hidden bg-[#F1F0EE]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/review/${image}`}
                        alt={`${name} — ${tag}`}
                        className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-20 md:mt-28 flex flex-col items-center text-center">
          <div className="h-px w-24 bg-[#E5E5E5] mb-12" />
          <Link
            href={`/${lang}/contact`}
            className="group relative px-14 py-6 bg-[#7C3AED] text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-95 duration-300 ease-[0.16,1,0.3,1]"
          >
            <div className="absolute inset-0 bg-[#5B21B6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 inline-flex items-center gap-2 text-lg transition-colors duration-500">
              {tc('button')}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
