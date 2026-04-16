/** @type {import('next').NextConfig} */

// Prefer NEXT_PUBLIC_API_URL, fallback to BACKEND_URL, then to a safe localhost mock.
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://127.0.0.1:9999';
if (!process.env.NEXT_PUBLIC_API_URL && !process.env.BACKEND_URL) {
  // During local builds we prefer not to fail hard — warn instead and use a mock URL.
  // CI / production should still set proper env vars.
  console.warn('Advertencia: ni NEXT_PUBLIC_API_URL ni BACKEND_URL están definidas — usando fallback', API_URL);
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
    BACKEND_URL: process.env.BACKEND_URL || API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || API_URL}/api/:path*`,
      },
      {
        source: '/api/admin/:path*',
        destination: `${process.env.BACKEND_URL || API_URL}/api/admin/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
