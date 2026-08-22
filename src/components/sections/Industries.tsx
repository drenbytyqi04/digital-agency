"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { industries } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { motionTokens } from "@/lib/utils";

/**
 * Industry index with a hover-follow visual.
 *
 * The preview is decorative and hover-only, so nothing is communicated
 * by it alone — every industry name is present as text at all times.
 * That keeps the section fully usable on touch and by keyboard, where
 * the preview simply doesn't appear.
 */
export function Industries() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <Section className="overflow-hidden">
      <div className="shell">
        <SectionHead
          eyebrow="Industries"
          title="We Build For Ambitious Businesses."
          lead="Different sectors, the same underlying question: what does this business need a visitor to do?"
        />

        <ul className="relative mt-20 border-t border-line">
          {industries.map((industry, i) => (
            <li key={industry.name} className="border-b border-line">
              <div
                data-cursor-hover
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative flex items-center justify-between gap-6 py-6 md:py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="tnum font-mono text-[10px] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <motion.h3
                    className="font-display text-3xl leading-none md:text-5xl"
                    animate={
                      reduce
                        ? {}
                        : {
                            color: active === i ? "#ededE8" : "#6b6b6e",
                            x: active === i ? 12 : 0,
                          }
                    }
                    transition={{ duration: motionTokens.base, ease: motionTokens.ease }}
                  >
                    {industry.name}
                  </motion.h3>
                </div>

                <motion.span
                  aria-hidden="true"
                  className="text-lg"
                  animate={
                    reduce ? {} : { opacity: active === i ? 1 : 0, x: active === i ? 0 : -10 }
                  }
                  transition={{ duration: motionTokens.base, ease: motionTokens.ease }}
                  style={{ color: industry.accent }}
                >
                  →
                </motion.span>

                {/* Hover wash in the industry's own accent */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -inset-x-6 -z-10"
                  initial={false}
                  animate={{ opacity: active === i && !reduce ? 1 : 0 }}
                  transition={{ duration: motionTokens.base }}
                  style={{
                    background: `linear-gradient(90deg, ${industry.accent}14, transparent 60%)`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
