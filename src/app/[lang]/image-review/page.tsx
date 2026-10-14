import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';

const samples = [
  { key: 'dct', image: 'converge-gpt2.jpg' },
  { key: 'dream', image: 'bloom-gpt2.jpg' },
  { key: 'perhomes', image: 'domus-gpt2.jpg' },
  { key: 'janex', image: 'tandem-gpt2.jpg' },
  { key: 'wallet', image: 'vault-gpt2.jpg' },
  { key: 'raffle', image: 'fortuna-gpt2.jpg' },
  { key: 'salesai', image: 'closer-gpt2.jpg' },
  { key: 'edai', image: 'mentor-gpt2.jpg' },
  { key: 'dreamai', image: 'reverie-gpt2.jpg' },
  { key: 'tradepulse', image: 'meridian-gpt2.jpg' },
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
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-12 text-[#11121A] md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-12 border-b border-[#11121A]/10 pb-8 md:mb-16 md:pb-12">
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {samples.map((sample) => {
            const name = projects(`items.${sample.key}.name` as never) as string;
            const description = projects(`items.${sample.key}.desc` as never) as string;
            return (
              <article key={sample.key} className="group min-w-0">
                <div className="overflow-hidden rounded-[1.4rem] bg-white shadow-[0_12px_40px_rgba(20,20,35,0.07)] ring-1 ring-[#11121A]/[0.06] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_rgba(20,20,35,0.12)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/review/${sample.image}`}
                    alt={`${name} — ${description}`}
                    className="block aspect-square h-auto w-full object-cover"
                    width="1200"
                    height="1200"
                  />
                </div>
                <div className="px-1 pt-5 md:pt-6">
                  <h2 className="text-2xl font-semibold tracking-[-0.035em] md:text-3xl">{name}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
