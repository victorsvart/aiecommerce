import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    domains: [],
    formats: ["image/webp", "image/avif"],
    unoptimized: false,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Server external packages for production
  ...(process.env.NODE_ENV === "production" && {
    serverExternalPackages: ["@prisma/client"],
  }),

  // Output configuration for Vercel
  output: "standalone",
};

export default nextConfig;
