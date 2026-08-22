"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee.
 *
 * WCAG: auto-moving content needs a stop mechanism — this pauses on
 * hover AND on keyboard focus within, and renders as a static wrapped
 * row under prefers-reduced-motion rather than scrolling.
 * The duplicated track is aria-hidden so the content is announced once.
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
  /**
   * One tree in both motion modes. A separate reduced-motion branch made
   * the server and client render different HTML and broke hydration; the
   * `.marquee-track { animation: none }` rule under prefers-reduced-motion
   * stops the scroll instead, and the duplicated track stays aria-hidden.
   */

  return (
    <div
      className={cn("marquee-host group relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-10 pr-10 focus-within:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex shrink-0 items-center gap-10 pr-10"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
