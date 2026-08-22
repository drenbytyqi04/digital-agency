import { site } from "@/config/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

/**
 * Results metrics.
 *
 * The brief says explicitly: do not fabricate results. Every value in
 * `site.results` is therefore `null`, and each tile renders an em-dash
 * with a "pending" note instead of an invented number. Fill in the
 * config and the counters animate automatically.
 */
export function Results() {
  const hasAnyData = site.results.some((r) => r.value !== null);

  return (
    <Section className="border-y border-line bg-surface">
      <div className="shell">
        <SectionHead eyebrow="Results" title="Measured, Not Claimed." align="center" />

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {site.results.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-3 text-center">
                <dd className="font-display text-5xl leading-none text-ink md:text-7xl">
                  {metric.value === null ? (
                    <span aria-label="Awaiting verified data" className="text-ink-faint">
                      —
                    </span>
                  ) : (
                    <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                  )}
                </dd>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {metric.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>

        {!hasAnyData && (
          <p className="pretty mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-ink-faint">
            These figures are intentionally blank. We publish performance numbers only once they
            come from real, measured client engagements — add them in{" "}
            <code className="wrap-anywhere font-mono text-[11px] text-ink-dim">
              src/config/site.ts
            </code>{" "}
            and they will animate in automatically.
          </p>
        )}
      </div>
    </Section>
  );
}
