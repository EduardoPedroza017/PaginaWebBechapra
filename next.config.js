/** @type {import('next').NextConfig} */

// Normalize backend/public URLs so rewrites always get a proper http(s) prefix
const normalizeUrl = (u) => {
  if (!u) return undefined;
  const s = String(u).trim();
  if (/^https?:\/\//i.test(s)) return s.replace(/\/$/, '');
  return `http://${s.replace(/\/$/, '')}`;
};

const BACKEND_URL = normalizeUrl(process.env.BACKEND_URL) || 'http://127.0.0.1:9999';
const NEXT_PUBLIC_API_URL = normalizeUrl(process.env.NEXT_PUBLIC_API_URL) || BACKEND_URL;
if (!process.env.NEXT_PUBLIC_API_URL && !process.env.BACKEND_URL) {
  console.warn('Advertencia: ni NEXT_PUBLIC_API_URL ni BACKEND_URL están definidas — usando fallback', BACKEND_URL);
}

const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Si necesitas imágenes propias, puedes agregar aquí usando API_URL
      // Ejemplo:
      // (() => {
      //   try {
      //     const u = new URL(API_URL);
      //     return { protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port, pathname: '/uploads/**' };
      //   } catch { return null; }
      // })(),
    ].filter(Boolean),
    unoptimized: true,
  },
  env: {
    BACKEND_URL: BACKEND_URL,
    NEXT_PUBLIC_API_URL: NEXT_PUBLIC_API_URL,
  },
  // Serve the app under /web so generated asset paths include the prefix
  basePath: '/web',
  assetPrefix: '/web',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/api/admin/:path*',
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
