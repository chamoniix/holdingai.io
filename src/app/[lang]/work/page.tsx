'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function WorkPage() {
  const t = useTranslations('work');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className="w-full min-h-screen bg-transparent pt-32 md:pt-40 px-6 relative z-10 flex flex-col items-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {(['aura', 'nexus', 'prism', 'onyx'] as const).map((key, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-white/[0.02] border border-white/10 cursor-pointer"
            >
              {/* Abstract Project Placeholder (Since we don't have images yet) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2997FF]/10 to-[#BF5AF2]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-700 ease-out flex items-center justify-center backdrop-blur-xl">
                  {/* Dynamic keys: cast `as never` to satisfy next-intl key typing. */}
                  <span className="text-xs tracking-[0.2em] uppercase text-white/50">{t(`projects.${key}.year` as never)}</span>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[#2997FF] text-sm tracking-[0.2em] font-semibold uppercase mb-3">{t(`projects.${key}.category` as never)}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t(`projects.${key}.title` as never)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
