"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceLinks } from "@/lib/links";
import { clsx } from "clsx";


export default function ServiceNav() {
const pathname = usePathname();
return (
<nav className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap gap-2">
{serviceLinks.map((s) => {
const active = pathname === s.href;
return (
<Link key={s.href} href={s.href}
className={clsx(
"rounded-xl px-3 py-2 text-sm ring-1 backdrop-blur-md",
active ? "text-white ring-[color:var(--brand-primary-35)] bg-[var(--brand-primary-15)]" : "text-white/80 ring-white/15 hover:bg-[var(--brand-secondary-15)]"
)}
>
{s.title}
</Link>
);
})}
</nav>
);
}