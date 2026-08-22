"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger and
 * Lenis share one RAF loop (two loops cause scroll jitter).
 *
 * Disabled entirely under prefers-reduced-motion — hijacking scroll is
 * exactly the kind of motion that setting exists to opt out of.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Route changes must land at the top — Lenis keeps scroll position otherwise.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
