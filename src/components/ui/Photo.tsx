"use client";

import Image from "next/image";
import { useState } from "react";
import { unsplashUrl, blurFrom, type Photo as PhotoMeta } from "@/config/images";
import { ProjectArt } from "./ProjectArt";
import { cn } from "@/lib/utils";

type Treatment = "color" | "soft" | "duotone";

/**
 * Unsplash photo with a generated-art fallback.
 *
 * Photographs render IN FULL COLOUR by default. Cohesion comes from the
 * dark surround and a bottom scrim that settles each frame into the
 * page, not from stripping the colour out of it.
 *
 *   color    full colour + bottom scrim (default — content photography)
 *   soft     full colour, slightly dimmed, for photos carrying text
 *   duotone  desaturated + accent tint (kept, no longer the default)
 *
 * If the remote image fails — a stale photo ID, an offline build, a
 * blocked CDN — it renders the same gradient artwork the site used
 * before photography existed, so a wrong ID degrades deliberately
 * instead of showing a broken-image icon.
 */
export function Photo({
  photo,
  fallback,
  sizes,
  priority = false,
  treatment = "color",
  interactive = false,
  className,
}: {
  photo: PhotoMeta;
  /** Accent colours for the grade, the blur tint and the fallback art */
  fallback: { from: string; to: string; accent: string };
  sizes: string;
  priority?: boolean;
  treatment?: Treatment;
  /** Ease the grade off on hover — only for photos inside a link */
  interactive?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <ProjectArt
        from={fallback.from}
        to={fallback.to}
        accent={fallback.accent}
        label={photo.alt}
        className={cn("h-full w-full", className)}
      />
    );
  }

  /**
   * The grade is driven by CSS custom properties declared as CLASSES on
   * the wrapper, never as an inline style.
   *
   * Both earlier attempts failed the same way: an inline `filter`, and
   * then inline custom properties, each beat the hover rule on
   * specificity, so the colour-return did nothing — the tint faded while
   * the image stayed fully desaturated. Class-set variables let the
   * hover variant, which Tailwind emits later in the sheet, actually win.
   */
  const gradeVars =
    treatment === "color"
      ? "[--ph-gray:0] [--ph-bright:1] [--ph-contrast:1] [--ph-sat:1.05]"
      : treatment === "soft"
        ? "[--ph-gray:0] [--ph-bright:0.82] [--ph-contrast:1.04] [--ph-sat:1.05]"
        : "[--ph-gray:1] [--ph-bright:0.66] [--ph-contrast:1.12] [--ph-sat:1]";

  return (
    <div
      className={cn(
        "group/photo relative h-full w-full overflow-hidden bg-surface",
        gradeVars,
        interactive && "hover:[--ph-bright:1.06] hover:[--ph-sat:1.12]",
        className
      )}
    >
      <Image
        src={unsplashUrl(photo.id, 1600)}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={blurFrom(fallback.from)}
        onError={() => setFailed(true)}
        className={cn(
          "object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "[filter:grayscale(var(--ph-gray))_contrast(var(--ph-contrast))_brightness(var(--ph-bright))_saturate(var(--ph-sat))]"
        )}
      />

      {treatment === "duotone" && (
        <>
          {/* Accent tint — only in the duotone treatment */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 mix-blend-color transition-opacity duration-700",
              interactive ? "opacity-70 group-hover/photo:opacity-30" : "opacity-70"
            )}
            style={{
              background: `linear-gradient(145deg, ${fallback.accent}, ${fallback.from})`,
            }}
          />
          {/* Weight toward the base surface so type stays legible over it */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${fallback.to}cc, transparent 55%)`,
            }}
          />
        </>
      )}

      {/* Bottom scrim. Settles a colour photograph into the dark page and
          keeps any caption below it legible, without touching the hue. */}
      {treatment !== "duotone" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${fallback.to}${treatment === "soft" ? "cc" : "99"}, transparent ${treatment === "soft" ? "55%" : "72%"})`,
          }}
        />
      )}
    </div>
  );
}

/**
 * Decorative background image.
 *
 * For purely atmospheric photography — hero and CTA backdrops, hover
 * previews — where there is nothing meaningful to fall back TO. It
 * removes itself if the source fails, so a blocked CDN or a stale ID
 * leaves the designed gradient underneath rather than a broken <img>
 * sitting in the DOM. Always alt="" — these carry no information.
 */
export function DecorImage({
  id,
  width,
  sizes,
  className,
  priority = false,
  blurTint = "#0a0a0b",
}: {
  id: string;
  width: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  blurTint?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src={unsplashUrl(id, width)}
      alt=""
      aria-hidden="true"
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL={blurFrom(blurTint)}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
