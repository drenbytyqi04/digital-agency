import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Placeholder client logos rendered as wordmarks in the display face.
 * Swap the array for real <Image> logos — the marquee needs no changes.
 */
const placeholderClients = [
  "Maison Nord", "Atlas & Meridian", "Northline", "Fold & Grain",
  "Verge", "Kestrel", "Lumen Co.", "Studio Halle",
];

export function TrustBar() {
  return (
    <section className="relative border-y border-line py-14" aria-labelledby="trust-heading">
      <div className="shell mb-10">
        <Reveal>
          <p id="trust-heading" className="eyebrow text-center">
            Trusted to build better digital experiences
          </p>
        </Reveal>
      </div>

      <Marquee duration={45}>
        {placeholderClients.map((name) => (
          <span
            key={name}
            className="font-display whitespace-nowrap text-2xl text-ink-faint grayscale transition-colors duration-300 hover:text-ink-dim md:text-3xl"
          >
            {name}
          </span>
        ))}
      </Marquee>

      <p className="shell mt-8 text-center text-[11px] text-ink-faint">
        Sample wordmarks shown — replace with real client logos.
      </p>
    </section>
  );
}
