import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';

const samples = [
  { key: 'dct', image: 'converge-gpt2.jpg', score: '8/10' },
  { key: 'dream', image: 'bloom-gpt2.jpg', score: '8.5/10' },
  { key: 'perhomes', image: 'domus-gpt2.jpg', score: '8/10' },
  { key: 'janex', image: 'tandem-gpt2.jpg', score: '8.5/10' },
  { key: 'wallet', image: 'vault-gpt2.jpg', score: '8/10' },
  { key: 'raffle', image: 'fortuna-gpt2.jpg', score: '8/10' },
  { key: 'salesai', image: 'closer-gpt2.jpg', score: '8/10' },
  { key: 'edai', image: 'mentor-gpt2.jpg', score: '8.5/10' },
  { key: 'dreamai', image: 'reverie-gpt2.jpg', score: '8/10' },
  { key: 'tradepulse', image: 'meridian-gpt2.jpg', score: '9/10' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang as Locale, namespace: 'imageReview' });
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export default async function ImageReviewPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang as Locale, namespace: 'imageReview' });
  const projects = await getTranslations({ locale: lang as Locale, namespace: 'projectsIndex' });

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-10 text-[#11121A] md:px-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">{t('eyebrow')}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
          </div>
          <span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
            {t('status')}
          </span>
        </header>

        <p className="mb-10 max-w-4xl rounded-xl border-l-4 border-violet-600 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600 md:text-base">
          {t('disclaimer')}
        </p>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {samples.map((sample, index) => {
            const name = projects(`items.${sample.key}.name` as never) as string;
            const description = projects(`items.${sample.key}.desc` as never) as string;
            return (
              <article key={sample.key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(20,20,35,0.10)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 md:px-6">
                  <div>
                    <p className="text-xs font-mono text-slate-400">TEST {String(index + 1).padStart(2, '0')} · {sample.score}</p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{name}</h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
                    {t('concept')} · GPT Image 2
                  </span>
                </div>
                <div className="bg-slate-100 p-2 md:p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/review/${sample.image}`}
                    alt={`${name} — ${description}`}
                    className="block h-auto w-full rounded-xl"
                    width="1200"
                    height="1200"
                  />
                </div>
                <p className="px-5 py-4 text-sm leading-relaxed text-slate-600 md:px-6">{description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
