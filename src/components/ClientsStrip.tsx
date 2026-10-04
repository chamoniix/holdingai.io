import { useTranslations } from 'next-intl'

// Client brand names are proper nouns and stay hardcoded; only the label is translated.
const logos = [
  { name: 'Botte', src: '/images/kosmos/clients/botte.png' },
  { name: 'Sodimas', src: '/images/kosmos/clients/sodimas.png' },
  { name: 'Apimo', src: '/images/kosmos/clients/apimo.png' },
  { name: 'Coges', src: '/images/kosmos/clients/coges.png' },
  { name: 'Point P', src: '/images/kosmos/clients/pointp.png' },
  { name: 'VRF', src: '/images/kosmos/clients/vrf.png' },
]

export default function ClientsStrip() {
  const t = useTranslations('clients')

  return (
    <section className="relative py-12 md:py-16 px-6 bg-transparent z-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8E8E93] font-semibold mb-10">
          {t('label')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((l) => (
            <img
              key={l.name}
              src={l.src}
              alt={l.name}
              className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
