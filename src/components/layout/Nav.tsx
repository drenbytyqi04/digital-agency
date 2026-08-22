"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { cn, motionTokens } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll, trap focus, and restore focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Move focus into the panel so keyboard users are not left behind it.
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const featured = projects[0];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-line bg-void/85 backdrop-blur-md md:bg-void/70 md:backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="shell flex h-20 items-center justify-between" aria-label="Primary">
          <Link
            href="/"
            className="font-display text-2xl leading-none tracking-tight text-ink"
            aria-label={`${site.name} — home`}
          >
            {site.name}
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex min-h-11 items-center text-sm transition-colors",
                      active ? "text-ink" : "text-ink-dim hover:text-ink"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "accent-gradient absolute -bottom-0.5 left-0 h-px w-full origin-right transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <MagneticButton href={site.cta.primary.href} className="px-6 py-3 text-xs uppercase tracking-widest">
                {site.cta.primary.label}
              </MagneticButton>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-void px-6 pb-10 pt-28 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.01 : 0.6, ease: motionTokens.easeInOut }}
          >
            <ul className="flex flex-col gap-1">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.2 + i * 0.05, duration: 0.5, ease: motionTokens.ease }}
                >
                  <Link
                    href={item.href}
                    className="display-md block py-2 text-ink"
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-6">
              <Link
                href={`/work/${featured.slug}`}
                className="group flex items-center gap-4 border-t border-line pt-6"
              >
                <span
                  aria-hidden="true"
                  className="h-16 w-24 shrink-0 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${featured.art.from}, ${featured.art.accent}44)`,
                  }}
                />
                <span className="flex flex-col">
                  <span className="eyebrow">Featured work</span>
                  <span className="text-base text-ink">{featured.name}</span>
                </span>
              </Link>
              <MagneticButton href={site.cta.primary.href} className="w-full">
                {site.cta.primary.label}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
