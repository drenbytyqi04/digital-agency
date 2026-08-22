"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animated counter.
 *
 * Correctness before decoration: until the count actually starts, the
 * element renders its FINAL value, never 0. An out-of-view counter that
 * displays "0%" is showing false information to anyone who reaches it
 * before the observer fires (and to no-JS / SSR output).
 *
 * The trigger uses the default zero margin, so counting begins as soon
 * as a single pixel is visible — the swap to 0 happens off-screen edge
 * and is imperceptible, then it counts up as the element scrolls in.
 *
 * Tabular figures (.tnum) keep the width fixed so nothing reflows while
 * the number runs.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  /**
   * The "already ran" latch is a ref, NOT state. As state it belonged to
   * this effect's dependency list, so setting it re-ran the effect, whose
   * cleanup cancelled the in-flight rAF — the count froze after a single
   * frame. A ref latches without retriggering.
   */
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce || hasRun.current) return;
    hasRun.current = true;
    setDisplay(0);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      /**
       * Clamped at both ends. rAF hands back the timestamp of the frame
       * already in flight, which can predate the performance.now() taken
       * when scheduling — an unclamped p goes negative and expo.out then
       * returns a negative number, rendering "-2" instead of counting up.
       */
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      // expo.out — matches the shared easing token
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="tnum">
        {prefix}
        {display}
      </span>
      {suffix}
    </span>
  );
}
