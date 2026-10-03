/**
 * ORBIT — capabilities marquee.
 * An infinite, seamless band of technical keywords. These terms are technical
 * nouns and are intentionally NOT translated (identical across all locales).
 */

const TERMS = [
  'AGENTS',
  'SAAS',
  'AUTOMATION',
  'LLM',
  'RAG',
  'COMPUTER VISION',
  'NLP',
  'FINE-TUNING',
  'MLOPS',
  'MULTI-MODAL',
]

export default function CapabilitiesMarquee() {
  return (
    <section className="relative w-full py-10 md:py-14 bg-transparent z-10 overflow-hidden">
      <div className="border-y border-white/10">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center shrink-0">
                {TERMS.map((term, i) => (
                  <span key={`${copy}-${i}`} className="flex items-center">
                    <span className="px-5 md:px-10 text-5xl md:text-7xl font-bold tracking-tight text-white/20 select-none">
                      {term}
                    </span>
                    <span className="text-white/10 text-xl md:text-2xl">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
