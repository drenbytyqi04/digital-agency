"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Reading-progress indicator. Decorative, so hidden from assistive tech. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="accent-gradient fixed left-0 top-0 z-[80] h-px w-full origin-left"
    />
  );
}
