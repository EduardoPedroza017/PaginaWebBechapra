"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import UiDialog from "./UiDialog";
import Link from "next/link";


export default function Navbar() {
const [open, setOpen] = useState(false);
return (
<header className="fixed inset-x-0 top-4 z-50">
<nav
  className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl"
  style={{ borderColor: "rgba(255,255,255,0.15)", background: "linear-gradient(180deg, var(--brand-secondary-15), var(--brand-primary-15))" }}
>
  <Link href="/" className="font-semibold tracking-tight">
    <span className="text-white/90">Bechapra</span>
  </Link>

  <div className="hidden items-center gap-2 text-sm md:flex">
    <Link href="/" className="nav-pill">Pag. Principal</Link>
    <Link href="/servicios" className="nav-pill">Servicios</Link>
    <Link href="/acerca-de" className="nav-pill">Acerca de</Link>
    <a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className="nav-pill">¿Eres colaborador?</a>
  </div>

  <button onClick={() => setOpen(v => !v)} className="md:hidden">
    {open ? <X /> : <Menu />}
  </button>
</nav>



{open && (
<motion.div
initial={{ opacity: 0, y: -8 }}
animate={{ opacity: 1, y: 0 }}
className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl md:hidden"
>
<div className="flex flex-col gap-3 text-sm text-white/85">
<Link href="/" onClick={() => setOpen(false)} className="hover:brightness-110">Pag. Principal</Link>
<Link href="/servicios" onClick={() => setOpen(false)} className="hover:brightness-110">Servicios</Link>
<Link href="/acerca-de" onClick={() => setOpen(false)} className="hover:brightness-110">Acerca de</Link>
<a href="https://bechapra.com.mx" target="_blank" rel="noreferrer" className="hover:brightness-110">¿Eres colaborador?</a>
<UiDialog />
</div>
</motion.div>
)}
</header>
);
}