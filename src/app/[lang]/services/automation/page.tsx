'use client';
import { useTranslation } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export default function AutomationPage() {
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
            {dict.services?.automation?.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed max-w-3xl mx-auto">
            {dict.services?.automation?.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[1, 2, 3].map((num) => {
            const featureTitle = dict.services?.automation?.[`feature${num}` as keyof typeof dict.services.automation];
            const featureDesc = dict.services?.automation?.[`feature${num}Desc` as keyof typeof dict.services.automation];
            
            return (
              <motion.div key={num} variants={itemVariants} className="glass-panel p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-6xl text-[#30D158] blur-[2px] group-hover:blur-none font-bold">0{num}</div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{featureTitle}</h3>
                <p className="text-[#86868B] leading-relaxed relative z-10">{featureDesc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Block for App Previews */}
        <motion.div variants={itemVariants} className="w-full glass-panel rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden relative mb-24 py-12">
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#000000] to-transparent z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#000000] to-transparent z-10" />
          
          <h3 className="text-2xl font-bold text-white mb-10 px-10 relative z-20">Interfaces en Action</h3>
          
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: [0, -1500] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[
                "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
                // Duplicate for infinite scroll
                "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
              ].map((imgSrc, idx) => (
                <div key={idx} className="w-[300px] h-[200px] md:w-[400px] md:h-[260px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt="App Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}