"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Split by "word" (default) or "line" for multi-line display type */
  by?: "word" | "line";
  /** Above-the-fold headlines: animate on mount instead of on scroll. */
  immediate?: boolean;
};

/**
 * Clip-path line/word masking reveal.
 *
 * Accessibility: the full string stays in the accessibility tree as a
 * single readable node (aria-label on the wrapper, aria-hidden on the
 * split pieces), so screen readers never hear it fragmented.
 *
 * Uses `useInView` rather than `whileInView` — see Reveal.tsx for why.
 */
export function RevealText({ text, className, delay = 0, by = "word", immediate = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const pieces = by === "line" ? text.split("\n") : text.split(" ");

  /**
   * No reduced-motion branch here. Returning a different element tree for
   * reduced motion made the server HTML (always rendered unreduced) differ
   * from the client's first render, which threw a hydration mismatch for
   * exactly the users who enable the setting. One tree is rendered always;
   * the `prefers-reduced-motion` block in globals.css pins [data-reveal]
   * to its final readable state, and the split pieces stay aria-hidden
   * behind the wrapper's aria-label either way.
   */
  const show = immediate || inView;

  return (
    <span ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {pieces.map((piece, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className={
              by === "line"
                ? "block overflow-hidden"
                : "inline-block overflow-hidden align-bottom"
            }
          >
            <motion.span
              data-reveal
              className="inline-block"
              initial={{ y: "110%" }}
              animate={show ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: motionTokens.slow,
                delay: delay + i * (by === "line" ? 0.09 : motionTokens.stagger),
                ease: motionTokens.ease,
              }}
            >
              {piece}
            </motion.span>
          </span>
          {/* The inter-word space must live OUTSIDE the overflow-hidden
              wrapper. Inside an inline-block a trailing space collapses at
              the box edge, which ran the words together ("Atlas&Meridian"). */}
          {by === "word" && i < pieces.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
