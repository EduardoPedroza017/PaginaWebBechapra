import type { Config } from "tailwindcss";


const config: Config = {
content: [
"./app/**/*.{ts,tsx}",
"./components/**/*.{ts,tsx}",
],
theme: {
extend: {
container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem" } },
colors: {},
borderRadius: { "2xl": "1.25rem" },
},
},
plugins: [],
};
export default config;