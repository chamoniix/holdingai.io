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
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  const t = await getTranslations({ locale: lang as Locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/icon.svg',
    },
  };
}

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
  const messages = await getMessages();

  return (
    <html lang={lang} className="dark">
      <body className={`${inter.variable} antialiased bg-transparent text-[#F5F5F7] selection:bg-[#2997FF]/30 selection:text-white overflow-auto`}>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
