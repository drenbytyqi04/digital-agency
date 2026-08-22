"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/config/services";
import { Section, SectionHead } from "@/components/ui/Section";
import { motionTokens } from "@/lib/utils";

/**
 * Editorial service index — full-width rows rather than a card grid.
 * Hover lifts the row, reveals the description and slides an accent
 * wash behind it. All hover state has a keyboard-focus equivalent, and
 * the row itself is a single link so the whole strip is one target.
 */
export function Services() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <Section id="services">
      <div className="shell">
        <SectionHead
          eyebrow="Services"
          title={"Everything You Need\nto Go Digital."}
          lead="Eight disciplines, one team. Most projects use three or four of them together."
        />

        <ul className="mt-20 border-t border-line">
          {services.map((service) => {
            const isActive = active === service.slug;
            return (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={service.hasPage ? `/services/${service.slug}` : "/services"}
                  className="group relative flex flex-col gap-4 overflow-hidden px-1 py-8 transition-colors md:flex-row md:items-center md:gap-10 md:py-10"
                  onMouseEnter={() => setActive(service.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(service.slug)}
                  onBlur={() => setActive(null)}
                >
                  {/* Accent wash — decorative, transform-only */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-volt/[0.07] via-viol/[0.05] to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />

                  <span className="relative z-10 font-mono text-xs text-ink-faint transition-colors group-hover:text-volt-soft md:w-16">
                    {service.index}
                  </span>

                  <h3 className="relative z-10 font-display text-3xl leading-none text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[38%] md:text-5xl md:group-hover:translate-x-3">
                    {service.title}
                  </h3>

                  <p className="pretty relative z-10 max-w-md flex-1 text-sm leading-relaxed text-ink-dim">
                    {service.short}
                  </p>

                  <motion.span
                    aria-hidden="true"
                    className="relative z-10 hidden text-ink-faint md:block"
                    animate={reduce ? {} : { x: isActive ? 0 : -8, opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: motionTokens.base, ease: motionTokens.ease }}
                  >
                    →
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
