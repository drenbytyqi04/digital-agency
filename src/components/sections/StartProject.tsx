"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { sectionPhotos } from "@/config/images";
import { DecorImage } from "@/components/ui/Photo";

export function StartProject() {
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (reduce) return;
    setPulse(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden border-t border-line">
      {/* Slow-drifting accent field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <DecorImage
          id={sectionPhotos.cta.id}
          width={2000}
          sizes="100vw"
          className="object-cover opacity-[0.30] [filter:brightness(0.65)_saturate(1.1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" />
        <div className="grid-lines absolute inset-0 opacity-30" />
        {/* Same reasoning as the hero bloom: gradient, not blur().
            The slow pulse is a permanently-running compositor animation, so
            it is limited to pointer devices — on mobile it burned frames and
            battery for an effect nobody notices behind the headline. */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[46rem] md:w-[46rem]"
          style={{
            background:
              "radial-gradient(circle, rgba(77,124,254,0.18) 0%, rgba(110,105,250,0.12) 32%, rgba(139,92,246,0.07) 56%, transparent 78%)",
          }}
          animate={pulse ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] } : undefined}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="shell relative z-10 flex flex-col items-center gap-10 py-28 text-center">
        <h2 className="display-xl balance max-w-[14ch] text-ink">
          <RevealText text={"Have a Business\nWorth Showing Off?"} by="line" />
        </h2>
        <Reveal delay={0.15}>
          <p className="pretty max-w-xl text-lg text-ink-dim">
            Let&apos;s build a digital presence that makes people take notice.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={site.cta.primary.href}>{site.cta.primary.label}</MagneticButton>
            {site.contact.bookingUrl ? (
              <MagneticButton href={site.contact.bookingUrl} variant="outline">
                Book a Call
              </MagneticButton>
            ) : (
              <MagneticButton href="/contact" variant="outline">
                Book a Call
              </MagneticButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
