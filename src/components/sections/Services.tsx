"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services } from "@/config/services";
import { Section, SectionHead } from "@/components/ui/Section";
import { servicePhotos } from "@/config/images";
import { DecorImage } from "@/components/ui/Photo";
import { motionTokens } from "@/lib/utils";

/**
 * Editorial service index — full-width rows rather than a card grid.
 * Hover lifts the row, reveals the description and slides an accent
 * wash behind it. All hover state has a keyboard-focus equivalent, and
 * the row itself is a single link so the whole strip is one target.
 */
export function Services({ showHead = true }: { showHead?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();


  return (
    <Section id="services">
      <div className="shell">
        {showHead && (
          <SectionHead
            eyebrow="Services"
            title={"Everything You Need\nto Go Digital."}
            lead="Eight disciplines, one team. Most projects use three or four of them together."
          />
        )}

      <div className="relative">
        <ul className={`${showHead ? "mt-20 " : ""}border-t border-line`}>
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

                  <p className="pretty relative z-10 max-w-md flex-1 text-sm leading-relaxed text-ink-dim xl:max-w-[17rem]">
                    {service.short}
                  </p>

                  {/* Row-anchored preview.
                      Anchoring to the row rather than the cursor makes this
                      deterministic and — more importantly — reachable by
                      keyboard: onFocus sets the same active state, so a user
                      tabbing the service links sees the preview too. A
                      cursor-following panel never could. */}
                  <AnimatePresence>
                    {isActive && !reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-20 top-1/2 z-20 hidden h-28 w-44 -translate-y-1/2 overflow-hidden rounded-lg border border-line-strong xl:block"
                        initial={{ opacity: 0, scale: 0.94, x: 16 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.97, x: 8 }}
                        transition={{ duration: motionTokens.fast, ease: motionTokens.ease }}
                      >
                        <DecorImage
                          id={servicePhotos[service.slug].id}
                          width={480}
                          sizes="176px"
                          className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.75)]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-volt/30 to-viol/20 mix-blend-color" />
                      </motion.span>
                    )}
                  </AnimatePresence>

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
      </div>
    </Section>
  );
}
