import type { NextConfig } from "next";
const nextConfig: NextConfig = {
reactStrictMode: true,
// Allow development requests from the local LAN IP used when testing on other devices.
// Add additional origins here if you access the dev server from other hostnames.
allowedDevOrigins: ["192.168.1.89"],
	images: {
		domains: ["images.unsplash.com", "bechapra.com", "www.bechapra.com"],
		qualities: [75, 90, 95, 100],
	},
experimental: { optimizePackageImports: ["framer-motion", "@react-three/drei"] },
};
export default nextConfig;