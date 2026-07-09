/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.klaviyo.com'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three', '@react-three/fiber']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

module.exports = nextConfig
