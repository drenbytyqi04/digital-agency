import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="shell flex flex-col items-start gap-8">
        <span className="eyebrow">Error 404</span>
        <h1 className="display-xl max-w-[12ch] text-ink">This page doesn&apos;t exist.</h1>
        <p className="pretty max-w-md text-base text-ink-dim">
          The link may be out of date, or the page may have moved.
        </p>
        <MagneticButton href="/">Back to home</MagneticButton>
      </div>
    </section>
  );
}
