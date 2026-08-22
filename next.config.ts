import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Photography is served from Unsplash's CDN. Declared narrowly:
    // one host, https only, no wildcard subdomains.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Matches the breakpoints the layouts actually request.
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
};

export default nextConfig;
