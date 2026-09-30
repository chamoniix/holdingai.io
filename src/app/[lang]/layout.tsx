import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import NeuralCloud from "@/components/canvas/NeuralCloud";
import ScrollManager from "@/components/ScrollManager";
import Navigation from "@/components/Navigation";
import Atmosphere from "@/components/ui/Atmosphere";
import OpenAIAdsPixel from "@/components/OpenAIAdsPixel";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HoldingAI.io - Premium AI Product Studio",
  description: "We build the next generation of AI products. HoldingAI.io designs and engineers world-class mobile applications, SaaS platforms, and AI agents.",
  icons: {
    icon: '/icon.svg',
  },
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
  if (!hasLocale(routing.locales, lang)) notFound();
  const dict = await getDictionary(lang);
  const messages = await getMessages();

  return (
    <html lang={lang} className="dark">
      <body className={`${inter.variable} antialiased bg-transparent text-[#F5F5F7] selection:bg-[#2997FF]/30 selection:text-white overflow-auto`}>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider lang={lang} dict={dict}>
            <OpenAIAdsPixel />
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
