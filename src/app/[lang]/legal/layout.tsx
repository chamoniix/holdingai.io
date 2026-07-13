import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1 space-y-6">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Legal Documents</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/legal/mentions-legales" className="text-white/60 hover:text-white transition-colors block">Legal Mentions</Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-white/60 hover:text-white transition-colors block">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-white/60 hover:text-white transition-colors block">Terms & Conditions</Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3 text-white/80 space-y-6 leading-relaxed">
            {children}
          </main>
          
        </div>
      </div>
    </div>
  );
}
