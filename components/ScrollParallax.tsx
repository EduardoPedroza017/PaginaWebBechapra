"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function ScrollParallax() {
const ref = useRef<HTMLDivElement>(null);


useEffect(() => {
const el = ref.current;
if (!el) return;
const ctx = gsap.context(() => {
gsap.to("[data-parallax]", {
yPercent: -20,
ease: "none",
scrollTrigger: {
trigger: el,
start: "top bottom",
end: "bottom top",
scrub: 0.6,
},
});
}, el);
return () => ctx.revert();
}, []);


return (
<div ref={ref} className="relative h-[40vh] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl">
<div data-parallax className="absolute inset-0">
<div className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-2xl" />
<div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-2xl" />
</div>
<div className="relative z-10 grid h-full place-items-center text-center">
<div>
<h2 className="text-2xl font-semibold md:text-3xl">Parallax suave con GSAP + ScrollTrigger</h2>
<p className="mt-2 text-white/70">Esta banda se desplaza sutilmente según el scroll.</p>
</div>
</div>
</div>
);
}