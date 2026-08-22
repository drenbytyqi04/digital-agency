"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { industries } from "@/config/content";
import { industryPhotos } from "@/config/images";
import { DecorImage } from "@/components/ui/Photo";
import { Section, SectionHead } from "@/components/ui/Section";
import { motionTokens } from "@/lib/utils";

/**
 * Industry index with a cursor-following photo preview.
 *
 * The preview is decorative and pointer-only: every industry name is
 * present as text at all times, so nothing is communicated by the image
 * alone. It is skipped on touch, on coarse pointers and under reduced
 * motion, where the list is simply a readable index.
 *
 * The floating layer is aria-hidden and pointer-events-none, so it can
 * never intercept a click or reach assistive technology.
 */
export function Industries() {
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!enabled) setEnabled(true);
    const rect = hostRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const activePhoto = active !== null ? industryPhotos[industries[active].name] : null;

  return (
    <Section className="overflow-hidden">
      <div className="shell">
        <SectionHead
          eyebrow="Industries"
          title="We Build For Ambitious Businesses."
          lead="Different sectors, the same underlying question: what does this business need a visitor to do?"
        />

        <div ref={hostRef} className="relative mt-20" onMouseMove={onMove}>
          {/* Cursor-following preview */}
          <AnimatePresence>
            {enabled && !reduce && activePhoto && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-strong lg:block"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: motionTokens.fast, ease: motionTokens.ease }}
              >
                <DecorImage
                  id={activePhoto.id}
                  width={640}
                  sizes="320px"
                  className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.7)]"
                />
                {/* Same duotone logic as <Photo>: tint the sector shot toward
                    the industry's own accent so it belongs to the palette. */}
                <span
                  className="absolute inset-0 mix-blend-color opacity-70"
                  style={{ background: industries[active!].accent }}
                />
                <span className="absolute inset-0 bg-void/20" />
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="relative border-t border-line">
            {industries.map((industry, i) => (
              <li key={industry.name} className="border-b border-line">
                <div
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
                              color: active === i ? "#ededE8" : "#7d7d80",
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
                    className="relative z-10 text-lg"
                    animate={
                      reduce ? {} : { opacity: active === i ? 1 : 0, x: active === i ? 0 : -10 }
                    }
                    transition={{ duration: motionTokens.base, ease: motionTokens.ease }}
                    style={{ color: industry.accent }}
                  >
                    →
                  </motion.span>

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
      </div>
    </Section>
  );
}
