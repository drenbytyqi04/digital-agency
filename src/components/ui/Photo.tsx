"use client";

import Image from "next/image";
import { useState } from "react";
import { unsplashUrl, blurFrom, type Photo as PhotoMeta } from "@/config/images";
import { ProjectArt } from "./ProjectArt";
import { cn } from "@/lib/utils";

/**
 * Unsplash photo with a generated-art fallback.
 *
 * If the remote image fails — a stale photo ID, an offline build, a
 * blocked CDN — the component renders the same gradient artwork the
 * site used before photography existed. A wrong ID degrades to
 * something deliberate instead of a broken-image icon.
 *
 * `fill` + a sized parent means the aspect box is reserved before the
 * image arrives, so no layout shift. The blur placeholder is generated
 * from the slot's accent colour rather than a real thumbnail.
 */
export function Photo({
  photo,
  fallback,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  photo: PhotoMeta;
  /** Accent colours for the fallback artwork + blur tint */
  fallback: { from: string; to: string; accent: string };
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
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

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
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
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
