"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Custom cursor with a following glow.
 *
 * Strictly additive: it renders only on fine-pointer devices and never
 * hides the native cursor on touch or keyboard use. Purely decorative,
 * so it is aria-hidden and pointer-events-none — it can never intercept
 * a click or confuse assistive tech.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(Boolean(el?.closest("a, button, [data-cursor-hover]")));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, reduce]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference lg:block"
        style={{ x: sx, y: sy }}
        animate={{ scale: hovering ? 3.5 : 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, rgba(77,124,254,0.10) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
        }}
      />
    </>
  );
}
