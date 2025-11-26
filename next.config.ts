import type { NextConfig } from "next";
const nextConfig: NextConfig = {
	reactStrictMode: true,
	// Permitir requests de desarrollo desde IPs locales
	allowedDevOrigins: ["192.168.1.89", "192.168.1.5"],
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.unsplash.com' },
			{ protocol: 'https', hostname: 'bechapra.com' },
			{ protocol: 'https', hostname: 'www.bechapra.com' }
		],
		qualities: [75, 90, 95, 100],
	},
	experimental: { optimizePackageImports: ["framer-motion", "@react-three/drei"] },
};
export default nextConfig;