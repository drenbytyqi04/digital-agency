"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/config/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { motionTokens } from "@/lib/utils";

/**
 * Testimonial slider.
 *
 * Advancing is manual only — no autoplay, so there is no moving content
 * to pause. The live region announces the change without moving focus.
 * Every quote is explicitly labelled as sample copy: these are NOT
 * presented as real client reviews.
 */
export function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[i];

  const go = (dir: 1 | -1) =>
    setI((prev) => (prev + dir + testimonials.length) % testimonials.length);

  return (
    <Section>
      <div className="shell">
        <SectionHead eyebrow="Testimonials" title="What Clients Say." />

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Sample copy — not real client reviews
          </span>
        </div>

        <div className="mt-12 min-h-[18rem] md:min-h-[16rem]">
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{
                  duration: reduce ? 0.01 : motionTokens.base,
                  ease: motionTokens.ease,
                }}
                className="flex flex-col gap-8"
              >
                <div className="flex gap-1" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} aria-hidden="true" className="h-4 w-4 fill-[#D4A574] text-[#D4A574]" />
                  ))}
                </div>

                <blockquote className="display-md balance max-w-4xl text-ink">
                  “{t.quote}”
                </blockquote>

                <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-dim">
                  <span className="text-ink">{t.name}</span>
                  <span aria-hidden="true" className="text-ink-faint">
                    ·
                  </span>
                  <span>{t.company}</span>
                  <span aria-hidden="true" className="text-ink-faint">
                    ·
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    {t.industry}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong text-ink-dim transition-colors hover:border-ink hover:text-ink"
          >
            <span className="sr-only">Previous testimonial</span>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong text-ink-dim transition-colors hover:border-ink hover:text-ink"
          >
            <span className="sr-only">Next testimonial</span>
            <span aria-hidden="true">→</span>
          </button>
          <span className="tnum ml-2 font-mono text-xs text-ink-faint">
            {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </Section>
  );
}
