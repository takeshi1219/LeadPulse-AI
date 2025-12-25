import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_AI_ENGINE_URL: process.env.NEXT_PUBLIC_AI_ENGINE_URL,
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;
