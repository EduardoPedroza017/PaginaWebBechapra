"use client"

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  delay?: number; // ms
};

export default function AnimatedOnScroll({ children, className = "", rootMargin = "-10% 0px", threshold = 0.12, once = true, delay = 0 }: Props){
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const node = ref.current;
    if(!node) return;

    // detect prefers-reduced-motion and small screens locally
    let prefersReduced = false;
    let isSmallScreen = false;
    try{
      prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    }catch{
      prefersReduced = false;
      isSmallScreen = false;
    }

    // If user prefers reduced motion, reveal immediately and skip observer
    if(prefersReduced){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting){
          // reduce delay on small screens for snappier UX
          const effectiveDelay = isSmallScreen ? Math.max(0, Math.floor(delay/3)) : delay;
          setTimeout(()=> {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setVisible(true);
          }, effectiveDelay);
          if(once) observer.unobserve(node);
        } else {
          if(!once) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setVisible(false);
          }
        }
      });
    }, { root: null, rootMargin, threshold });

    observer.observe(node);
    return ()=> observer.disconnect();
  }, [rootMargin, threshold, once, delay]);

  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out transform-gpu ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  );
}
