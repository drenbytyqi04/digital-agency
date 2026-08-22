import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/config/services";
import { site } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/config/content";
import { StartProject } from "@/components/sections/StartProject";
import { ArrowLink } from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return services.filter((s) => s.hasPage).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} — ${site.name}`, description: service.short },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || !service.hasPage) notFound();

  const others = services.filter((s) => s.slug !== slug && s.hasPage).slice(0, 4);

  return (
    <>
      <PageHeader eyebrow={`Service ${service.index}`} title={service.title} lead={service.short} />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="pretty text-xl leading-relaxed text-ink md:text-2xl">
                {service.description}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <h2 className="eyebrow mb-5">What&apos;s included</h2>
              <ul className="flex flex-col gap-3 border-t border-line pt-5">
                {service.capabilities.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-ink-dim">
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-volt" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 md:py-28">
        <div className="shell">
          <h2 className="display-md text-ink">How it runs</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 0.05}>
                  <span className="tnum font-mono text-[10px] text-ink-faint">{step.index}</span>
                  <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                  <p className="pretty mt-2 text-xs leading-relaxed text-ink-dim">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-20">
        <h2 className="eyebrow mb-8">Other services</h2>
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.slug} className="bg-void">
              <a
                href={`/services/${s.slug}`}
                className="group block h-full p-7 transition-colors hover:bg-surface"
              >
                <span className="tnum font-mono text-[10px] text-ink-faint">{s.index}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{s.title}</h3>
                <span
                  aria-hidden="true"
                  className="mt-4 inline-block text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ArrowLink href="/services">All services</ArrowLink>
        </div>
      </section>

      <StartProject />
    </>
  );
}
