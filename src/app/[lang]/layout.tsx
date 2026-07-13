import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import NeuralCloud from "@/components/canvas/NeuralCloud";
import ScrollManager from "@/components/ScrollManager";
import Navigation from "@/components/Navigation";
import Atmosphere from "@/components/ui/Atmosphere";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageProvider } from "@/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HoldingAI.io - Premium AI Product Studio",
  description: "We build the next generation of AI products. HoldingAI.io designs and engineers world-class mobile applications, SaaS platforms, and AI agents.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="dark">
      <body className={`${inter.variable} antialiased bg-transparent text-[#F5F5F7] selection:bg-[#2997FF]/30 selection:text-white overflow-auto`}>
        <LanguageProvider lang={lang} dict={dict}>
          <Atmosphere />
          <ScrollManager />
          <NeuralCloud />
          <Navigation />
          <div className="relative z-10">
            <SmoothScroll>
              {children}
              <Footer />
            </SmoothScroll>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
