import Link from 'next/link'

export type BlogArticleSection = {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogArticleFaq = {
  question: string
  answer: string
}

export type BlogArticleRelated = {
  slug: string
  title: string
  category: string
}

export type BlogArticleContent = {
  metaTitle: string
  metaDescription: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  heroImage: string
  heroAlt: string
  intro: string
  takeawayTitle: string
  takeaways: string[]
  sections: BlogArticleSection[]
  faqTitle: string
  faqs: BlogArticleFaq[]
  relatedTitle: string
  related: BlogArticleRelated[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
  backToBlogLabel: string
}

export default function ArticleLayout({
  article,
  locale,
}: {
  article: BlogArticleContent
  locale: string
}) {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 pb-20 pt-28 text-[#11121A] md:px-10 md:pb-28 md:pt-36">
      <article className="mx-auto max-w-7xl">
        <Link
          href={`/${locale}#blog`}
          className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-[#5F5F66] transition-colors hover:text-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-4"
        >
          <span aria-hidden="true">←</span>
          {article.backToBlogLabel}
        </Link>

        <header className="mx-auto max-w-4xl pb-10 pt-12 text-center md:pb-14 md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED] md:text-sm">
            {article.category}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#5F5F66] md:text-xl">
            {article.excerpt}
          </p>
          <p className="mt-6 text-sm text-[#77777E]">{article.readingTime}</p>
        </header>

        <figure className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_60px_-24px_rgba(20,20,35,0.18)] ring-1 ring-[#11121A]/[0.06] md:rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            className="block aspect-[16/8] w-full object-cover md:aspect-[16/7]"
          />
        </figure>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          <div className="min-w-0">
            <p className="text-lg leading-[1.85] text-[#35353B] md:text-xl">{article.intro}</p>

            <section className="mt-10 rounded-2xl border border-[#E5E2EA] bg-white p-6 md:mt-14 md:p-8" aria-labelledby="article-takeaways">
              <h2 id="article-takeaways" className="text-xl font-semibold tracking-tight md:text-2xl">
                {article.takeawayTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {article.takeaways.map((takeaway, index) => (
                  <li key={`${index}-${takeaway}`} className="flex gap-3 leading-relaxed text-[#55555D]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 text-base leading-[1.85] text-[#4A4A50] md:text-lg">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.id}-paragraph-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3 pl-1 text-base leading-relaxed text-[#4A4A50] md:text-lg">
                      {section.bullets.map((bullet, index) => (
                        <li key={`${section.id}-bullet-${index}`} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {article.faqs.length > 0 && (
              <section className="mt-16 border-t border-[#E5E5E5] pt-10 md:mt-20 md:pt-14" aria-labelledby="article-faq-title">
                <h2 id="article-faq-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {article.faqTitle}
                </h2>
                <div className="mt-6 divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
                  {article.faqs.map((faq, index) => (
                    <details key={`${index}-${faq.question}`} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-medium leading-relaxed marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] md:text-lg">
                        {faq.question}
                        <span aria-hidden="true" className="text-xl font-light text-[#7C3AED] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="max-w-3xl pt-4 leading-relaxed text-[#5F5F66]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label={article.title} className="rounded-2xl border border-[#E5E2EA] bg-white p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85858C]">{article.title}</p>
              <ol className="mt-4 space-y-3">
                {article.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex gap-3 text-sm leading-relaxed text-[#55555D] transition-colors hover:text-[#7C3AED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
                    >
                      <span className="font-mono text-xs text-[#A3A3AA]">{String(index + 1).padStart(2, '0')}</span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        {article.related.length > 0 && (
          <section className="mt-20 border-t border-[#E5E5E5] pt-12 md:mt-28 md:pt-16" aria-labelledby="article-related-title">
            <h2 id="article-related-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              {article.relatedTitle}
            </h2>
            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {article.related.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/blog/${related.slug}`}
                  className="group rounded-2xl border border-[#E5E2EA] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#CFC2E8] hover:shadow-[0_14px_38px_-20px_rgba(20,20,35,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] md:p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">{related.category}</span>
                  <span className="mt-3 block text-lg font-semibold leading-snug tracking-tight text-[#11121A] group-hover:text-[#6030C0]">
                    {related.title}
                  </span>
                  <span aria-hidden="true" className="mt-5 block text-[#7C3AED]">↗</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 overflow-hidden rounded-[1.5rem] bg-[#17131F] px-6 py-10 text-white md:mt-24 md:rounded-[2rem] md:px-12 md:py-14" aria-labelledby="article-cta-title">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="max-w-3xl">
              <h2 id="article-cta-title" className="text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl">
                {article.ctaTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-white/70 md:text-lg">{article.ctaText}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#17131F] transition-colors hover:bg-[#E9DFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#17131F]"
            >
              {article.ctaButton}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
