import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:5000";

/**
 * Helper to generate RemotePattern for Next.js images
 */
function getRemotePattern(url: string, pathname: string): any {
  try {
    const u = new URL(url);
    return {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      port: u.port || "",
      pathname: pathname,
    };
  } catch {
    return { 
      protocol: "http", 
      hostname: "localhost", 
      port: "5000", 
      pathname 
    };
  }
}

const nextConfig: NextConfig = {
  basePath: "/web",
  trailingSlash: true,
  
  // ✅ Configuración correcta de Turbopack en Next 15+
  // Note: 'turbo' is now a top-level key or under 'experimental' depending on the exact sub-version.
  // We'll use the recommended standard for Next 15.
  // experimental: { }, // Remove invalid keys

  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${API_URL}/api/:path*`,
      },
      {
        source: "/api/backend/uploads/:path*",
        destination: `${API_URL}/uploads/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      getRemotePattern(API_URL, "/uploads/**"),
      getRemotePattern(API_URL, "/image/**"),
      getRemotePattern(API_URL, "/images/**"),
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },

  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
