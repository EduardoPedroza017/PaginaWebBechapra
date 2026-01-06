import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
      {
        source: '/api/backend/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/galery/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/news/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/organigrama/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/image/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/proxy-image',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/branding/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
