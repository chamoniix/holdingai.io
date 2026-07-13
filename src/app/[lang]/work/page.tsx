import { getDictionary } from '@/i18n/getDictionary';
import Portfolio from '@/components/Portfolio';
import ShowcaseSection from '@/components/ShowcaseSection';

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.work?.title || "Our Work"}
        </h1>
        <p className="text-xl text-[#86868B] font-light max-w-3xl mx-auto">
          {dict.work?.description}
        </p>
      </div>
      
      <Portfolio />
      <ShowcaseSection />
    </main>
  );
}