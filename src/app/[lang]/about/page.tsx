import { getDictionary } from '@/i18n/getDictionary';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.about?.title || "About Us"}
        </h1>
        <p className="text-xl text-[#86868B] font-light leading-relaxed mb-16">
          {dict.about?.description}
        </p>
        
        <h2 className="text-3xl font-bold text-white mb-6">{dict.about?.mission}</h2>
        <p className="text-lg text-[#86868B] font-light leading-relaxed">
          {dict.about?.missionText}
        </p>
      </div>
    </main>
  );
}