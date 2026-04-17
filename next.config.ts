import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
if (!API_URL) {
  throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
}


function getRemotePattern(url: string, pathname: string) {
  try {
    const u = new URL(url);
    const pattern: any = {
      protocol: u.protocol.replace(':', ''),
      hostname: u.hostname,
      pathname,
    };
    if (u.port) pattern.port = u.port;
    return pattern;
  } catch {
    return { protocol: 'http', hostname: 'localhost', port: '5000', pathname };
  }
}

const nextConfig: NextConfig = {
  basePath: '/web',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${API_URL}/api/:path*`,
      },
      {
        source: '/api/backend/uploads/:path*',
        destination: `${API_URL}/uploads/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      getRemotePattern(API_URL, '/uploads/galery/**'),
      getRemotePattern(API_URL, '/uploads/**'),
      getRemotePattern(API_URL, '/uploads/news/**'),
      getRemotePattern(API_URL, '/uploads/organigrama/**'),
      getRemotePattern(API_URL, '/image/**'),
      getRemotePattern(API_URL, '/images/**'),
      getRemotePattern(API_URL, '/api/proxy-image'),
      getRemotePattern(API_URL, '/uploads/branding/**'),
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
