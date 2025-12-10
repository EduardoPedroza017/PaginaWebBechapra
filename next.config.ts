import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        pathname: '/uploads/news/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/organigrama/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/image/**',
        search: '',
      },
      {
        pathname: '/api/proxy-image',
        search: '',
      },
    ],
  },
};

export default nextConfig;
