import { getDictionary } from '@/i18n/getDictionary';

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {dict.legal?.privacy?.title}
        </h1>
        <div className="prose prose-invert prose-lg text-[#86868B]">
          <p>{dict.legal?.privacy?.content}</p>
        </div>
      </div>
    </main>
  );
}