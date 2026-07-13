const fs = require('fs');
const path = require('path');

const pages = [
  {
    path: 'about/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

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
}`
  },
  {
    path: 'work/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';
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
}`
  },
  {
    path: 'contact/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

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
}`
  },
  {
    path: 'services/ai-agents/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

export default async function AIAgentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.services?.aiAgents?.title}
        </h1>
        <p className="text-xl text-[#86868B] font-light leading-relaxed mb-16">
          {dict.services?.aiAgents?.description}
        </p>
      </div>
    </main>
  );
}`
  },
  {
    path: 'services/saas/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

export default async function SaaSPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.services?.saas?.title}
        </h1>
        <p className="text-xl text-[#86868B] font-light leading-relaxed mb-16">
          {dict.services?.saas?.description}
        </p>
      </div>
    </main>
  );
}`
  },
  {
    path: 'services/automation/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

export default async function AutomationPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
          {dict.services?.automation?.title}
        </h1>
        <p className="text-xl text-[#86868B] font-light leading-relaxed mb-16">
          {dict.services?.automation?.description}
        </p>
      </div>
    </main>
  );
}`
  },
  {
    path: 'legal/privacy/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

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
}`
  },
  {
    path: 'legal/terms/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {dict.legal?.terms?.title}
        </h1>
        <div className="prose prose-invert prose-lg text-[#86868B]">
          <p>{dict.legal?.terms?.content}</p>
        </div>
      </div>
    </main>
  );
}`
  },
  {
    path: 'legal/mentions-legales/page.tsx',
    content: `import { getDictionary } from '@/i18n/getDictionary';

export default async function MentionsLegalesPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  
  return (
    <main className="w-full min-h-screen bg-transparent pt-40 px-6 relative z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {dict.legal?.mentions?.title}
        </h1>
        <div className="prose prose-invert prose-lg text-[#86868B]">
          <p>{dict.legal?.mentions?.content}</p>
        </div>
      </div>
    </main>
  );
}`
  }
];

const basePath = path.join(__dirname, '../src/app/[lang]');

pages.forEach(page => {
  const fullPath = path.join(basePath, page.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, page.content);
});

console.log("Pages scaffolded!");
