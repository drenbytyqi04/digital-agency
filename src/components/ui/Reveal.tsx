"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/utils";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
  /** Above-the-fold content: animate on mount instead of on scroll. */
  immediate?: boolean;
};

/**
 * Scroll-entry reveal.
 *
 * Uses the `useInView` hook rather than `whileInView`. The hook registers
 * its IntersectionObserver in an effect *after* layout and hydration, so
 * elements already inside the viewport on first paint animate correctly.
 * `whileInView` set up its observer too early and left above-the-fold
 * content stuck at its initial (invisible) state until the user scrolled.
 *
 * Under reduced motion the element renders in its final state with no
 * transition — never a hidden element waiting on an animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const show = reduce || immediate || inView;

  return (
    <MotionTag
      // @ts-expect-error — ref type varies with the polymorphic tag
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: motionTokens.slow, delay, ease: motionTokens.ease }}
    >
      {children}
    </MotionTag>
  );
}
