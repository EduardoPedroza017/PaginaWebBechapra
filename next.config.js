/** @type {import('next').NextConfig} */
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
    ],
    unoptimized: true, // Disable image optimization for better clarity
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Cambia 5000 al puerto donde corre tu backend
      },
      {
        source: '/api/admin/:path*',
        destination: 'http://localhost:5000/api/admin/:path*', // Redirige al prefijo correcto
      },
    ];
  },
}

module.exports = nextConfig
