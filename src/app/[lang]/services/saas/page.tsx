'use client';
import { useTranslation } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function SaasPage() {
  const { dict } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className="w-full min-h-screen bg-transparent pt-32 md:pt-40 px-6 relative z-10 flex flex-col items-center">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl w-full">
        
        <motion.div variants={itemVariants} className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {dict.services?.saas?.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed max-w-3xl mx-auto">
            {dict.services?.saas?.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[1, 2, 3].map((num) => {
            const featureTitle = dict.services?.saas?.[`feature${num}` as keyof typeof dict.services.saas];
            const featureDesc = dict.services?.saas?.[`feature${num}Desc` as keyof typeof dict.services.saas];
            
            return (
              <motion.div key={num} variants={itemVariants} className="glass-panel p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-6xl text-[#BF5AF2] blur-[2px] group-hover:blur-none font-bold">0{num}</div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{featureTitle}</h3>
                <p className="text-[#86868B] leading-relaxed relative z-10">{featureDesc}</p>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </main>
  );
}