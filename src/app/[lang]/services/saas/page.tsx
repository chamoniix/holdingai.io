'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const challenges = ['fragmented', 'manual', 'growth'] as const;
const pillars = ['experience', 'architecture', 'operations'] as const;
const useCases = ['onboarding', 'workspace', 'subscriptions', 'integrations'] as const;
const processSteps = ['discovery', 'prototype', 'engineering', 'launch'] as const;
const faqs = ['mvp', 'existingProduct', 'ai', 'scaling', 'security'] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ProductVisual({
  src,
  className,
  imageClassName = 'object-cover',
}: {
  src: string;
  className: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [12, -12]);

  return (
    <div ref={ref} aria-hidden="true" className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-3 inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className={`h-full w-full ${imageClassName}`} loading="lazy" />
      </motion.div>
    </div>
  );
}

export default function SaasPage() {
  const t = useTranslations('servicesPages');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.65, ease: EASE } },
  };

  return (
    <main className="relative isolate overflow-hidden bg-[#F7F7F5] pb-20 pt-28 text-[#11121A] md:pb-28 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_68%)]"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
        <motion.section
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 pb-20 md:gap-16 md:pb-28 lg:grid-cols-[1.03fr_0.97fr]"
        >
          <div>
            <motion.p variants={reveal} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED] md:text-sm">
              {t('saas.eyebrow')}
            </motion.p>
            <motion.h1
              variants={reveal}
              className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.05em] md:text-6xl lg:text-[4.5rem]"
            >
              {t('saas.title')}
            </motion.h1>
            <motion.p variants={reveal} className="mt-6 max-w-2xl text-lg leading-relaxed text-[#55555D] md:text-xl">
              {t('saas.description')}
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-full bg-[#11121A] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#6D35C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-4"
              >
                {t('saas.primaryCta')}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={`/${locale}/work`}
                className="inline-flex items-center gap-3 rounded-full border border-[#D8D6DB] px-7 py-4 text-sm font-semibold text-[#222229] transition-colors hover:border-[#7C3AED] hover:text-[#6D35C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-4"
              >
                {t('saas.workCta')}
                <span aria-hidden="true">↗</span>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={reveal} aria-hidden="true" className="relative mx-auto w-full max-w-[38rem]">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#E9DFFF] via-[#F5F1FA] to-[#E8E4DC] blur-2xl" />
            <div className="relative rotate-[1.5deg] rounded-[1.8rem] border border-white/80 bg-white p-3 shadow-[0_30px_90px_-35px_rgba(48,32,75,0.3)] md:rounded-[2.2rem] md:p-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-[#ECEAF0] bg-[#FAF9FB] md:rounded-[1.7rem]">
                <div className="flex h-12 items-center justify-between border-b border-[#ECEAF0] bg-white px-4 md:h-14 md:px-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                    <span className="h-2 w-16 rounded-full bg-[#E6E2EB] md:w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-[#F1ECF8]" />
                    <span className="hidden h-2 w-12 rounded-full bg-[#E6E2EB] sm:block" />
                  </div>
                </div>
                <div className="grid min-h-[19rem] grid-cols-[3.5rem_1fr] md:min-h-[25rem] md:grid-cols-[4.5rem_1fr]">
                  <div className="space-y-4 border-r border-[#ECEAF0] bg-white px-3 py-5 md:space-y-5 md:px-4 md:py-7">
                    <span className="mx-auto block h-7 w-7 rounded-lg bg-[#F0EAF8]" />
                    <span className="mx-auto block h-5 w-5 rounded-md bg-[#EDEAF1]" />
                    <span className="mx-auto block h-5 w-5 rounded-md bg-[#EDEAF1]" />
                    <span className="mx-auto block h-5 w-5 rounded-md bg-[#EDEAF1]" />
                    <span className="mx-auto block h-5 w-5 rounded-md bg-[#EDEAF1]" />
                  </div>
                  <div className="space-y-5 p-4 md:space-y-7 md:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2">
                        <span className="block h-3 w-24 rounded-full bg-[#D9D5DF] md:w-36" />
                        <span className="block h-2 w-36 rounded-full bg-[#ECEAF0] md:w-52" />
                      </div>
                      <span className="h-8 w-20 rounded-full bg-[#EEE7F8] md:w-24" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="rounded-xl border border-[#ECEAF0] bg-white p-3 md:p-4">
                        <span className="block h-2 w-12 rounded-full bg-[#E4E0E9]" />
                        <span className="mt-4 block h-5 w-20 rounded-md bg-[#EDE8F4] md:w-28" />
                        <span className="mt-3 block h-2 w-16 rounded-full bg-[#F0EDF3]" />
                      </div>
                      <div className="rounded-xl border border-[#ECEAF0] bg-white p-3 md:p-4">
                        <span className="block h-2 w-14 rounded-full bg-[#E4E0E9]" />
                        <span className="mt-4 block h-5 w-16 rounded-md bg-[#EDE8F4] md:w-24" />
                        <span className="mt-3 block h-2 w-20 rounded-full bg-[#F0EDF3]" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#ECEAF0] bg-white p-3 md:p-5">
                      <div className="flex items-center justify-between">
                        <span className="h-2.5 w-24 rounded-full bg-[#E3DFE8] md:w-32" />
                        <span className="h-6 w-16 rounded-full bg-[#F2EFF5]" />
                      </div>
                      <div className="mt-5 space-y-3">
                        {[0, 1, 2].map((row) => (
                          <div key={row} className="flex items-center gap-3 border-t border-[#F0EEF2] pt-3">
                            <span className="h-7 w-7 shrink-0 rounded-lg bg-[#F0ECF5]" />
                            <span className="h-2 flex-1 rounded-full bg-[#EAE7ED]" />
                            <span className="h-2 w-10 rounded-full bg-[#F0EDF3]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 h-20 w-20 rounded-full border border-white/90 bg-[#F4EFF9]/80 shadow-[0_12px_35px_rgba(54,34,82,0.12)] backdrop-blur md:-bottom-7 md:-left-7 md:h-28 md:w-28" />
          </motion.div>
        </motion.section>

        <motion.figure
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="relative mb-16 overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-[0_28px_80px_-36px_rgba(45,30,68,0.24)] md:mb-24 md:rounded-[2.25rem] md:p-3"
        >
          <ProductVisual
            src="/images/kosmos/saas-workspace.webp"
            className="aspect-[16/9] rounded-[1.25rem] bg-[#F0EDF4] md:rounded-[1.75rem]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[1.25rem] ring-1 ring-inset ring-black/[0.04] md:inset-3 md:rounded-[1.75rem]" />
        </motion.figure>

        <section aria-labelledby="saas-challenge-title" className="border-t border-[#E5E3E8] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">{t('saas.challenge.eyebrow')}</p>
              <h2 id="saas-challenge-title" className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                {t('saas.challenge.title')}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#626169]">{t('saas.challenge.description')}</p>
            </motion.div>
            <div className="border-t border-[#DCD9E0]">
              {challenges.map((key, index) => (
                <motion.div
                  key={key}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                  className="grid gap-2 border-b border-[#DCD9E0] py-6 md:grid-cols-[3rem_0.7fr_1.3fr] md:items-baseline md:gap-5 md:py-7"
                >
                  <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center">
                    <span className={`h-2.5 w-2.5 ${index === 0 ? 'rounded-full bg-[#7C3AED]' : index === 1 ? 'rotate-45 rounded-[2px] bg-[#B79AD8]' : 'rounded-full border border-[#B79AD8]'}`} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{t(`saas.challenge.items.${key}.title` as never)}</h3>
                  <p className="leading-relaxed text-[#626169]">{t(`saas.challenge.items.${key}.desc` as never)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="saas-system-title" className="relative overflow-hidden rounded-[2rem] bg-[#EEEAF3] px-6 py-12 md:px-12 md:py-16">
          <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#D9CBE9]" />
          <div aria-hidden="true" className="absolute -right-8 -top-16 h-56 w-56 rounded-full border border-[#D9CBE9]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D35C5]">{t('saas.system.eyebrow')}</p>
              <h2 id="saas-system-title" className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                {t('saas.system.title')}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#55515D]">{t('saas.system.description')}</p>
            </motion.div>
            <div className="grid gap-0 divide-y divide-[#D5CDDE] border-y border-[#D5CDDE] md:grid-cols-3 md:divide-x md:divide-y-0 md:border-y-0 md:border-l md:border-r">
              {pillars.map((key, index) => (
                <motion.div
                  key={key}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                  className="relative py-6 md:px-5 md:py-4 lg:px-7"
                >
                  <span aria-hidden="true" className="mb-7 flex h-10 w-10 items-center justify-center rounded-full border border-[#CFC2DF] bg-white/70 text-[#7C3AED]">
                    <span className={`h-2.5 w-2.5 rounded-sm ${index === 0 ? 'bg-[#7C3AED]' : index === 1 ? 'rotate-45 bg-[#B79AD8]' : 'rounded-full bg-[#D6C8E8]'}`} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{t(`saas.system.pillars.${key}.title` as never)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5F5B67]">{t(`saas.system.pillars.${key}.desc` as never)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="saas-usecases-title" className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">{t('saas.useCases.eyebrow')}</p>
              <h2 id="saas-usecases-title" className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                {t('saas.useCases.title')}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#626169]">{t('saas.useCases.description')}</p>
            </motion.div>
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {useCases.map((key, index) => (
                <motion.article
                  key={key}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                  className={`border-t border-[#DCD9E0] py-6 md:py-7 ${index > 1 ? 'sm:mt-2' : ''}`}
                >
                  <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#D8C9E8]" />
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{t(`saas.useCases.items.${key}.title` as never)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#626169] md:text-base">{t(`saas.useCases.items.${key}.desc` as never)}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="saas-process-title" className="border-y border-[#E5E3E8] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">{t('saas.process.eyebrow')}</p>
              <h2 id="saas-process-title" className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                {t('saas.process.title')}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#626169]">{t('saas.process.description')}</p>
            </motion.div>
            <ol className="relative list-none space-y-0 border-l border-[#D6C9E4] pl-6 md:pl-9">
              {processSteps.map((key) => (
                <motion.li
                  key={key}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                  className="relative pb-8 last:pb-0 md:pb-10"
                >
                  <span aria-hidden="true" className="absolute -left-[calc(1.5rem+5px)] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#7C3AED] bg-[#F7F7F5] md:-left-[calc(2.25rem+5px)]" />
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{t(`saas.process.steps.${key}.title` as never)}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[#626169]">{t(`saas.process.steps.${key}.desc` as never)}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <motion.figure
          variants={reveal}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="my-16 grid overflow-hidden rounded-[1.75rem] border border-[#E7E3EA] bg-white shadow-[0_24px_70px_-36px_rgba(45,30,68,0.2)] md:my-24 md:grid-cols-[1.15fr_0.85fr] md:items-center md:rounded-[2.25rem]"
        >
          <ProductVisual
            src="/images/kosmos/saas-in-context.webp"
            className="aspect-[4/3] min-h-full bg-[#EEEAE4] md:aspect-auto md:h-full md:min-h-[24rem]"
          />
          <div aria-hidden="true" className="hidden space-y-5 p-7 md:block lg:p-10">
            <span className="block h-2 w-16 rounded-full bg-[#B9A2D5]" />
            <span className="block h-4 w-4/5 rounded-full bg-[#E2DEE7]" />
            <span className="block h-3 w-full rounded-full bg-[#F0EDF2]" />
            <span className="block h-3 w-11/12 rounded-full bg-[#F0EDF2]" />
            <div className="grid grid-cols-3 gap-3 pt-4">
              <span className="h-14 rounded-xl border border-[#ECE8F0] bg-[#FAF9FB]" />
              <span className="h-14 rounded-xl border border-[#ECE8F0] bg-[#FAF9FB]" />
              <span className="h-14 rounded-xl border border-[#ECE8F0] bg-[#FAF9FB]" />
            </div>
          </div>
        </motion.figure>

        <section aria-labelledby="saas-faq-title" className="mx-auto max-w-5xl py-16 md:py-24">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mb-8 md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">{t('saas.faq.eyebrow')}</p>
            <h2 id="saas-faq-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{t('saas.faq.title')}</h2>
          </motion.div>
          <div className="divide-y divide-[#E5E3E8] border-y border-[#E5E3E8]">
            {faqs.map((key) => (
              <details key={key} className="group py-5 md:py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold leading-relaxed marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] md:text-lg">
                  {t(`saas.faq.items.${key}.question` as never)}
                  <span aria-hidden="true" className="shrink-0 text-2xl font-light text-[#7C3AED] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-4 pr-8 leading-relaxed text-[#626169]">{t(`saas.faq.items.${key}.answer` as never)}</p>
              </details>
            ))}
          </div>
        </section>

        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="relative overflow-hidden rounded-[2rem] bg-[#17131F] px-6 py-10 text-white md:px-12 md:py-14 lg:px-16"
        >
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">{t('saas.cta.title')}</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/70 md:text-lg">{t('saas.cta.description')}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#17131F] transition-colors hover:bg-[#E9DFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#17131F]"
            >
              {t('saas.cta.button')}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
