"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";

/**
 * Preloader: a 0→100 count, then a clip-path wipe to the page.
 *
 * Deliberately short and non-blocking. It shows once per browser
 * session (sessionStorage), never on repeat navigation, and is skipped
 * outright under reduced motion. The page content sits underneath and
 * is fully rendered — this overlays, it does not gate hydration, so it
 * cannot delay LCP for a user who arrives with the flag already set.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("volta:intro") === "1";
    } catch {
      // Private mode / blocked storage — treat as already seen.
      seen = true;
    }
    if (seen) return;

    setDone(false);
    const start = performance.now();
    const DURATION = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("volta:intro", "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setDone(true), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-between bg-void px-6 pb-10 md:px-10"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          // The count is progress noise for AT — announce nothing.
          aria-hidden="true"
        >
          <span className="font-display text-[12vw] leading-none text-ink md:text-[8vw]">
            {site.name}
          </span>
          <span className="tnum font-mono text-sm text-ink-faint">{pct}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
