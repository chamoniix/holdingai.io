export function MockupCard({ title, category, color }: { title: string, category: string, color: string }) {
  return (
    <div className={`relative w-[240px] h-[480px] md:w-[320px] md:h-[640px] rounded-[2rem] border-8 border-brand-graphite overflow-hidden bg-black shadow-2xl flex-shrink-0 group`}>
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${color}`} />
      
      {/* Content / UI Mockup placeholder */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center text-white/50 text-sm">
          <span>9:41</span>
          <div className="flex gap-2">
            <div className="w-4 h-3 bg-white/50 rounded-sm" />
            <div className="w-4 h-3 bg-white/50 rounded-sm" />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} opacity-80`} />
          <h4 className="text-3xl font-bold text-white">{title}</h4>
          <p className="text-brand-neon uppercase tracking-widest text-xs font-semibold">{category}</p>
        </div>

        <div className="space-y-4 w-full">
          <div className="w-full h-24 rounded-2xl glass-panel" />
          <div className="flex gap-4">
            <div className="flex-1 h-32 rounded-2xl glass-panel" />
            <div className="flex-1 h-32 rounded-2xl glass-panel" />
          </div>
          <div className="w-full h-16 rounded-2xl glass-panel" />
        </div>
      </div>
    </div>
  );
}
