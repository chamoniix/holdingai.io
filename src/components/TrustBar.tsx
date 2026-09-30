'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const OpticalCenterLogo = () => <svg viewBox="0 0 200 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="28" fontWeight="800" letterSpacing="-1">OPTICAL CENTER</text></svg>;
const EnedisLogo = () => <svg viewBox="0 0 120 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="800" letterSpacing="-1">enedis</text></svg>;
const KrysLogo = () => <svg viewBox="0 0 80 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="900" fontStyle="italic">Krys</text></svg>;
const DoctolibLogo = () => <svg viewBox="0 0 140 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="700" letterSpacing="-1">doctolib</text></svg>;
const BasicFitLogo = () => <svg viewBox="0 0 160 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="900" fontStyle="italic" letterSpacing="-1">BASIC-FIT</text></svg>;
const SanofiLogo = () => <svg viewBox="0 0 130 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="sans-serif" fontSize="32" fontWeight="600" letterSpacing="-1">sanofi</text><circle cx="100" cy="15" r="4" /><circle cx="115" cy="20" r="4" /></svg>;
const LOrealLogo = () => <svg viewBox="0 0 150 40" className="h-6 md:h-8 fill-current"><text x="0" y="30" fontFamily="serif" fontSize="30" fontWeight="400" letterSpacing="2">L'ORÉAL</text></svg>;
const BNPLogo = () => <svg viewBox="0 0 200 40" className="h-6 md:h-8 fill-current"><path d="M5 15 L15 5 L25 15 L15 25 Z" /><text x="35" y="30" fontFamily="sans-serif" fontSize="26" fontWeight="700">BNP PARIBAS</text></svg>;

// Partner names are proper nouns and stay hardcoded; only sectors are translated.
const logos = [
  { name: "Optical Center", key: 'opticalCenter', icon: OpticalCenterLogo },
  { name: "Enedis", key: 'enedis', icon: EnedisLogo },
  { name: "Krys", key: 'krys', icon: KrysLogo },
  { name: "Doctolib", key: 'doctolib', icon: DoctolibLogo },
  { name: "Basic-Fit", key: 'basicFit', icon: BasicFitLogo },
  { name: "Sanofi", key: 'sanofi', icon: SanofiLogo },
  { name: "L'Oréal", key: 'loreal', icon: LOrealLogo },
  { name: "BNP Paribas", key: 'bnpParibas', icon: BNPLogo },
];

export default function TrustBar() {
  const t = useTranslations('trust');

  return (
    <section className="w-full pt-8 pb-2 md:pt-12 md:pb-4 bg-transparent relative z-10 overflow-hidden flex flex-col items-center">
      <p className="text-sm md:text-base text-[#86868B] uppercase tracking-widest font-semibold mb-10 text-center">
        {t('heading')}
      </p>
      
      {/* Gradient masks for smooth fading on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center gap-20 md:gap-32 px-8"
          animate={{ x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Double the list to create a seamless infinite loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 text-white">
              <logo.icon />
              <span className="text-[10px] uppercase tracking-widest text-[#86868B] mt-3">
                {/* Dynamic key: cast `as never` to satisfy next-intl key typing. */}
                {t(`trust.sectors.${logo.key}` as never)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
