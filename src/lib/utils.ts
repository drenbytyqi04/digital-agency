import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared motion rhythm. Every animation in the project pulls from here. */
export const motionTokens = {
  ease: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.87, 0, 0.13, 1] as const,
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  /** Exit runs at ~65% of enter — responsiveness over symmetry. */
  exit: 0.26,
  stagger: 0.04,
} as const;
