"use client"

import { useEffect, useState } from "react";

export default function AnimatedOnMount({ children, className = "" }: { children: React.ReactNode; className?: string }){
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{
    // Respect reduced motion preference
  let reduced = false;
  try{ reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch{ reduced = false }
    const t = setTimeout(()=> setMounted(true), reduced ? 0 : 30);
    return ()=> clearTimeout(t);
  },[]);

  return (
    <div className={`${className} transition-transform duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  );
}
