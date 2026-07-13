import { getDictionary } from '@/i18n/getDictionary';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.contact?.title || "Let's Build"}
        </h1>
        <p className="text-xl text-[#86868B] font-light">
          {dict.contact?.description}
        </p>
      </div>
      
      <form className="w-full max-w-xl glass-panel p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-widest text-[#86868B] uppercase">{dict.contact?.nameLabel || "Name"}</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2997FF] transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-widest text-[#86868B] uppercase">{dict.contact?.emailLabel || "Email"}</label>
          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2997FF] transition-colors" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-widest text-[#86868B] uppercase">{dict.contact?.messageLabel || "Message"}</label>
          <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2997FF] transition-colors"></textarea>
        </div>
        <button type="button" className="w-full mt-4 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
          {dict.contact?.submit || "Submit"}
        </button>
      </form>
    </main>
  );
}