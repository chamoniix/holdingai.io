'use client';
import { useTranslation } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { dict } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className="w-full min-h-screen bg-transparent pt-32 md:pt-40 px-6 relative z-10 flex flex-col items-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {dict.about?.title || "A Vision Beyond Code"}
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed max-w-3xl mx-auto">
            {dict.about?.description}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2 glass-panel p-10 md:p-14 rounded-3xl relative overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2997FF]/10 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-2xl font-semibold mb-6 tracking-wide">{dict.about?.mission || "Our Philosophy"}</h2>
            <p className="text-lg text-[#86868B] leading-relaxed">
              {dict.about?.missionText}
            </p>
          </motion.div>

          {/* Stats Boxes */}
          {(dict.about?.stats || []).map((stat: any, index: number) => (
            <motion.div key={index} variants={itemVariants} className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">{stat.value}</span>
              <span className="text-sm font-semibold tracking-widest text-[#86868B] uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}