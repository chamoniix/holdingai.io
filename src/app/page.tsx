import HeroSection from "@/components/HeroSection";
import WhatWeBuildSection from "@/components/WhatWeBuildSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import TechnologySection from "@/components/TechnologySection";
import ProcessSection from "@/components/ProcessSection";
import NumbersSection from "@/components/NumbersSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black overflow-hidden">
      <HeroSection />
      <WhatWeBuildSection />
      <ShowcaseSection />
      <TechnologySection />
      <ProcessSection />
      <NumbersSection />
      <FinalCTASection />
    </main>
  );
}
