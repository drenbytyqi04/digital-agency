"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis smooth scroll — pointer devices only.
 *
 * Lenis is deliberately NOT started on touch devices. On a phone it
 * intercepts the touch scroll and re-drives it from JavaScript, which
 * replaces the platform's own momentum and rubber-banding with a
 * noticeably laggy, floaty scroll — and every scroll-linked animation
 * inherits that lag, so sections appear to "open" late or stutter.
 * Native scrolling on mobile is both smoother and free.
 *
 * Also skipped entirely under prefers-reduced-motion: hijacking scroll
 * is exactly the kind of motion that setting opts out of.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A coarse pointer (finger) or no hover capability means a touch device.
    const touch =
      window.matchMedia("(pointer: coarse)").matches ||
      !window.matchMedia("(hover: hover)").matches;

    if (reduced || touch) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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

  // Route changes must land at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
