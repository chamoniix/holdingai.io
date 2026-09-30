import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.klaviyo.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    rootParams: true,
    optimizePackageImports: ["framer-motion", "gsap", "three", "@react-three/fiber"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withNextIntl(nextConfig);
