"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/config/site";
import { motionTokens } from "@/lib/utils";
import { MagneticButton, ArrowLink } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { Counter } from "@/components/ui/Counter";

/**
 * Hero thesis: the agency's own craft, shown rather than claimed.
 *
 * The visual is a live wireframe lattice — an abstract interface being
 * assembled — built from CSS/SVG rather than an image, so it costs no
 * network request and cannot shift layout. It reacts to cursor position
 * on fine pointers only.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 26, mass: 0.6 });
  const py = useSpring(my, { stiffness: 90, damping: 26, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 28);
    my.set((e.clientY / innerHeight - 0.5) * 28);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-12 pt-32 md:pb-16"
    >
      {/* Structural grid + accent bloom */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div className="grid-lines absolute inset-0 opacity-[0.55]" style={{ x: px, y: py }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
        <motion.div
          className="absolute -right-40 top-1/4 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
          style={{
            x: px,
            y: py,
            background: "radial-gradient(circle, rgba(77,124,254,0.30), rgba(139,92,246,0.14) 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative z-10">
        <motion.div style={{ y: yContent, opacity }} className="flex flex-col gap-10">
          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: motionTokens.ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow text-ink-dim">{site.name}</span>
            <span aria-hidden="true" className="accent-gradient h-px w-10" />
            <span className="eyebrow">{site.descriptor}</span>
          </motion.div>

          {/* Headline — the display face doing the work */}
          <h1 className="display-xl max-w-[16ch] text-ink">
            <RevealText text={"We Build Digital\nExperiences That Matter."} by="line" delay={0.25} immediate />
          </h1>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: motionTokens.ease }}
              className="flex flex-col gap-8 lg:col-span-6"
            >
              <p className="pretty max-w-xl text-lg leading-relaxed text-ink-dim md:text-xl">
                We create high-performing websites, powerful brands and digital experiences
                designed to turn visitors into customers.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href={site.cta.primary.href}>{site.cta.primary.label}</MagneticButton>
                <MagneticButton href={site.cta.secondary.href} variant="outline">
                  {site.cta.secondary.label}
                </MagneticButton>
                <ArrowLink href={site.cta.tertiary.href} className="ml-1">
                  {site.cta.tertiary.label}
                </ArrowLink>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:col-span-6 lg:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            >
              {site.stats.map((stat) => {
                const numeric = Number(stat.value);
                const isNumber = !Number.isNaN(numeric);
                return (
                  <div key={stat.label} className="flex flex-col gap-1.5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-4xl leading-none text-ink md:text-5xl">
                      {isNumber ? (
                        <Counter value={numeric} suffix={stat.suffix} />
                      ) : (
                        <span>{stat.value}</span>
                      )}
                    </dd>
                    <span aria-hidden="true" className="text-xs leading-snug text-ink-faint">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.dl>
          </div>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="shell relative z-10 mt-14 flex items-center gap-3"
      >
        <span className="eyebrow">Scroll</span>
        <span className="relative h-px w-16 overflow-hidden bg-line-strong">
          {!reduce && (
            <motion.span
              className="accent-gradient absolute inset-y-0 left-0 w-1/2"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}
