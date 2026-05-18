"use client";

import { useEffect, useState } from "react";

/**
 * EditorialLayer
 * Powers the Bausen editorial visual layer:
 *  - Custom cursor (lerp follow, hover scale, label mode)
 *  - Magnetic hover (data-magnetic)
 *  - Word-reveal text splitting (.reveal-words)
 *  - IntersectionObserver-driven reveals (.reveal-words, .reveal-up, .mask-reveal)
 *  - Animated counters (.ed-counter[data-target])
 *  - Page curtain (one-time on first mount)
 *  - Smooth anchor scroll
 *  - Nav scrolled class hook
 *
 * Mounts once at the app root. Safe with Lenis (does not bind to scroll).
 * Respects prefers-reduced-motion and (hover: none) for touch.
 */
export default function EditorialLayer() {
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // ---- Curtain: remove after animation completes ----
    const curtainTimer = window.setTimeout(() => setShowCurtain(false), reduceMotion ? 0 : 1900);

    // ---- Custom cursor ----
    let cursorEl: HTMLDivElement | null = null;
    let cursorLabelEl: HTMLSpanElement | null = null;
    let rafId = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    const hoverListeners: Array<{ el: Element; enter: EventListener; leave: EventListener }> = [];
    const magnetListeners: Array<{ el: HTMLElement; move: EventListener; leave: EventListener }> = [];

    if (!isTouch && !reduceMotion) {
      cursorEl = document.createElement("div");
      cursorEl.className = "ed-cursor";
      cursorEl.setAttribute("aria-hidden", "true");
      cursorLabelEl = document.createElement("span");
      cursorLabelEl.className = "ed-cursor-label";
      cursorEl.appendChild(cursorLabelEl);
      document.body.appendChild(cursorEl);
      document.body.classList.add("has-editorial-cursor");

      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      document.addEventListener("mousemove", onMove);

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const loop = () => {
        cx = lerp(cx, mx, 0.22);
        cy = lerp(cy, my, 0.22);
        if (cursorEl) {
          cursorEl.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
        }
        rafId = window.requestAnimationFrame(loop);
      };
      loop();

      const onLeave = () => { if (cursorEl) cursorEl.style.opacity = "0"; };
      const onEnter = () => { if (cursorEl) cursorEl.style.opacity = "1"; };
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseenter", onEnter);

      // ---- Bind hover targets (delegated re-bind on observer) ----
      const bindHover = () => {
        // Clear previous
        hoverListeners.forEach(({ el, enter, leave }) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
        hoverListeners.length = 0;

        const targets = document.querySelectorAll(
          'a, button, input, textarea, select, label, [data-cursor], [data-magnetic]'
        );
        targets.forEach((el) => {
          const enter: EventListener = () => {
            if (!cursorEl) return;
            cursorEl.classList.add("hover");
            const label = (el as HTMLElement).getAttribute("data-cursor");
            if (label && cursorLabelEl) {
              cursorEl.classList.add("label-on");
              cursorLabelEl.textContent = label;
            }
          };
          const leave: EventListener = () => {
            if (!cursorEl) return;
            cursorEl.classList.remove("hover", "label-on");
            if (cursorLabelEl) cursorLabelEl.textContent = "";
          };
          el.addEventListener("mouseenter", enter);
          el.addEventListener("mouseleave", leave);
          hoverListeners.push({ el, enter, leave });
        });
      };
      bindHover();

      // ---- Magnetic hover ----
      const bindMagnets = () => {
        magnetListeners.forEach(({ el, move, leave }) => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
        magnetListeners.length = 0;

        const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
        magnets.forEach((el) => {
          const strength = parseFloat(el.dataset.magneticStrength || "0.3");
          const move: EventListener = (e) => {
            const me = e as MouseEvent;
            const r = el.getBoundingClientRect();
            const dx = (me.clientX - (r.left + r.width / 2)) * strength;
            const dy = (me.clientY - (r.top + r.height / 2)) * strength;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
          };
          const leave: EventListener = () => {
            el.style.transform = "translate(0, 0)";
          };
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          magnetListeners.push({ el, move, leave });
        });
      };
      bindMagnets();

      // Re-bind hover/magnets when DOM changes (route changes, etc.)
      const mo = new MutationObserver(() => {
        bindHover();
        bindMagnets();
      });
      mo.observe(document.body, { childList: true, subtree: true });

      // store cleanup hooks
      (cursorEl as unknown as { __cleanup?: () => void }).__cleanup = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
        mo.disconnect();
      };
    }

    // ---- Split words for .reveal-words ----
    const splitWords = (root: ParentNode = document) => {
      const targets = root.querySelectorAll<HTMLElement>(".reveal-words");
      targets.forEach((el) => {
        if (el.dataset.split === "1") return;
        el.dataset.split = "1";

        const wordIdx = { n: 0 };
        const walk = (node: Node) => {
          if (node.nodeType === 3) {
            const text = node.nodeValue || "";
            if (!/\S/.test(text)) return;
            const frag = document.createDocumentFragment();
            const parts = text.split(/(\s+)/);
            parts.forEach((part) => {
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else if (part.length > 0) {
                const wrap = document.createElement("span");
                wrap.className = "rw-wrap";
                const word = document.createElement("span");
                word.className = "rw-word";
                word.style.setProperty("--w", String(wordIdx.n));
                word.textContent = part;
                wordIdx.n++;
                wrap.appendChild(word);
                frag.appendChild(wrap);
              }
            });
            node.parentNode?.replaceChild(frag, node);
          } else if (node.nodeType === 1 && !(node as HTMLElement).classList?.contains("rw-wrap")) {
            const kids = Array.from(node.childNodes);
            kids.forEach(walk);
          }
        };
        walk(el);
      });
    };
    splitWords();

    // ---- IntersectionObserver for reveals ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const observeReveals = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(".reveal-words, .reveal-up, .mask-reveal").forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const delay = el.dataset.delay;
        if (delay) el.style.setProperty("--delay", delay);
        io.observe(el);
      });
    };
    observeReveals();

    // ---- Counter animation ----
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.target || "0", 10) || 0;
          const dur = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (t < 1) window.requestAnimationFrame(tick);
          };
          window.requestAnimationFrame(tick);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    const observeCounters = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(".ed-counter, .counter").forEach((el) => counterIO.observe(el));
    };
    observeCounters();

    // ---- Re-scan on DOM mutations (Next.js route changes & dynamic content) ----
    const scanMo = new MutationObserver((mutations) => {
      let added = false;
      mutations.forEach((m) => {
        if (m.addedNodes.length > 0) added = true;
      });
      if (added) {
        splitWords();
        observeReveals();
        observeCounters();
      }
    });
    scanMo.observe(document.body, { childList: true, subtree: true });

    // ---- Nav scrolled hook ----
    const onScroll = () => {
      const nav = document.querySelector("header, nav.nav, .ed-nav, [data-editorial-nav]");
      if (!nav) return;
      if (window.scrollY > 40) nav.classList.add("ed-nav-scrolled");
      else nav.classList.remove("ed-nav-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- Cleanup ----
    return () => {
      window.clearTimeout(curtainTimer);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      counterIO.disconnect();
      scanMo.disconnect();
      if (cursorEl) {
        const cleanup = (cursorEl as unknown as { __cleanup?: () => void }).__cleanup;
        cleanup?.();
        if (rafId) window.cancelAnimationFrame(rafId);
        cursorEl.remove();
        document.body.classList.remove("has-editorial-cursor");
      }
    };
  }, []);

  if (!showCurtain) return null;

  return (
    <div className="ed-page-curtain" aria-hidden="true">
      <div className="ed-curtain-panel" style={{ ["--i" as string]: 0 } as React.CSSProperties} />
      <div className="ed-curtain-panel" style={{ ["--i" as string]: 1 } as React.CSSProperties} />
      <div className="ed-curtain-panel" style={{ ["--i" as string]: 2 } as React.CSSProperties} />
      <div className="ed-curtain-panel" style={{ ["--i" as string]: 3 } as React.CSSProperties} />
      <div className="ed-curtain-mark">
        <span className="serif">Bausen</span>
        <span className="ed-curtain-tag">Impulsamos el talento que mueve a México</span>
      </div>
    </div>
  );
}
