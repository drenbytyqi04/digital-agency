"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee.
 *
 * Paused whenever it is off-screen. Three marquees looping continuously
 * down the page kept the compositor busy for content nobody could see —
 * on mobile that is dropped frames elsewhere and wasted battery.
 * `will-change` is applied only while actually animating, so the tracks
 * do not hold promoted layers for the whole session.
 *
 * WCAG: auto-moving content needs a stop mechanism — this pauses on
 * hover and on keyboard focus within, and the prefers-reduced-motion
 * rule in globals.css stops the animation entirely.
 *
 * One element tree in every motion mode; branching on reduced motion
 * here previously caused a server/client hydration mismatch.
 */
export function Marquee({
  children,
  duration = 40,
  className,
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const trackClass = cn(
    "marquee-track flex shrink-0 items-center gap-10 pr-10",
    !onScreen && "[animation-play-state:paused] [will-change:auto]"
  );

  return (
    <div
      ref={ref}
      className={cn("marquee-host group relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(trackClass, "focus-within:[animation-play-state:paused]")}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={trackClass}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
