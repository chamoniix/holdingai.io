import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralCloud from "@/components/canvas/NeuralCloud";
import ScrollManager from "@/components/ScrollManager";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HoldingAI.io - Premium AI Product Studio",
  description: "We build the next generation of AI products. HoldingAI.io designs and engineers world-class mobile applications, SaaS platforms, and AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#050608] text-[#F5F5F7] selection:bg-[#2997FF]/30 selection:text-white overflow-auto`}>
        <CustomCursor />
        <ScrollManager />
        <NeuralCloud />
        <Navigation />
        <div className="relative z-10 pointer-events-none">
          <SmoothScroll>
            <div className="pointer-events-auto">
              {children}
            </div>
            <div className="pointer-events-auto">
              <Footer />
            </div>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
