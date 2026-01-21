/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
if (!API_URL) {
  throw new Error('La variable de entorno NEXT_PUBLIC_API_URL no está definida. Configúrala en tu archivo .env');
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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
      {
        source: '/api/admin/:path*',
        destination: `${API_URL}/api/admin/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
