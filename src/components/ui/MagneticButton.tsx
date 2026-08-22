"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn, motionTokens } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

/**
 * Magnetic hover button.
 *
 * The magnetic pull is pointer-only (`pointer: fine`) and disabled under
 * reduced motion. Because the effect is `transform`-based it never shifts
 * surrounding layout. Renders a real <a> or <button> so keyboard and
 * screen-reader semantics are intact — the magnetism is pure decoration
 * layered on a working control.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className,
  disabled,
  ...rest
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.22, y: y * 0.35 });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "rounded-full px-7 py-3.5 text-sm font-medium tracking-tight",
    "min-h-11 cursor-pointer select-none",
    "transition-colors duration-200",
    variant === "solid" && "bg-ink text-void hover:bg-white",
    variant === "outline" &&
      "border border-line-strong text-ink hover:border-volt-soft hover:text-white",
    variant === "ghost" && "text-ink-dim hover:text-ink px-0",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="accent-gradient absolute inset-0 z-0 origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        />
      )}
    </>
  );

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.4 }}
    >
      {href ? (
        <Link href={href} className={styles} {...rest}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={styles} {...rest}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}

/** Small inline text link with an animated underline + arrow. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink",
        "min-h-11 cursor-pointer",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export { motionTokens };
