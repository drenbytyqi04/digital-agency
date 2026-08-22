"use client";

import Image from "next/image";
import { useState } from "react";
import { unsplashUrl, blurFrom, type Photo as PhotoMeta } from "@/config/images";
import { ProjectArt } from "./ProjectArt";
import { cn } from "@/lib/utils";

type Treatment = "duotone" | "grade" | "none";

/**
 * Unsplash photo with a brand grade and a generated-art fallback.
 *
 * THE GRADE IS THE POINT. Dropping raw stock photography onto a
 * near-black editorial page is what makes an agency site look
 * templated: every frame arrives with its own white balance, its own
 * saturation, its own idea of contrast. Pushing all of them through
 * one duotone — desaturate, then tint toward the project's accent —
 * makes a set of unrelated photographs read as a single art-directed
 * body of work sitting inside the palette.
 *
 *   duotone  desaturated + accent tint, colour returns on hover
 *   grade    desaturated + darkened only, no tint (neutral contexts)
 *   none     untouched (real client screenshots, once they exist)
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
  treatment = "duotone",
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
    treatment === "none"
      ? ""
      : treatment === "grade"
        ? "[--ph-gray:1] [--ph-bright:0.72] [--ph-contrast:1.08]"
        : "[--ph-gray:1] [--ph-bright:0.66] [--ph-contrast:1.12]";

  return (
    <div
      className={cn(
        "group/photo relative h-full w-full overflow-hidden bg-surface",
        gradeVars,
        interactive && treatment !== "none" && "hover:[--ph-gray:0.25] hover:[--ph-bright:0.88]",
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
          treatment !== "none" &&
            "[filter:grayscale(var(--ph-gray))_contrast(var(--ph-contrast))_brightness(var(--ph-bright))]"
        )}
      />

      {treatment === "duotone" && (
        <>
          {/* Accent tint — carries the brand colour into the midtones */}
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

      {treatment === "grade" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to top, ${fallback.to}bb, transparent 60%)` }}
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
