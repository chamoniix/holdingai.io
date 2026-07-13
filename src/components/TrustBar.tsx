'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: "Optical Center", sector: "Opticien" },
  { name: "Enedis", sector: "Énergie" },
  { name: "Krys", sector: "Opticien" },
  { name: "Doctolib", sector: "Santé" },
  { name: "Basic-Fit", sector: "Sport" },
  { name: "Sanofi", sector: "Santé" },
  { name: "L'Oréal", sector: "Beauté" },
  { name: "BNP Paribas", sector: "Finance" },
];

export default function TrustBar() {
  return (
    <section className="w-full py-12 md:py-20 bg-transparent relative z-10 overflow-hidden flex flex-col items-center">
      <p className="text-sm md:text-base text-[#86868B] uppercase tracking-widest font-semibold mb-10 text-center">
        Ils nous font confiance
      </p>
      
      {/* Gradient masks for smooth fading on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 md:gap-32 px-8"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* Double the list to create a seamless infinite loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
              <span className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
                {logo.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#86868B] mt-1">
                {logo.sector}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
