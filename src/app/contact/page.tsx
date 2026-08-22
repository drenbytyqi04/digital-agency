import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact, socials } = site;

  /* Only render channels that are actually configured — no invented
     phone numbers, addresses or booking links. */
  const channels = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    contact.whatsapp && {
      label: "WhatsApp",
      value: "Message us",
      href: `https://wa.me/${contact.whatsapp}`,
    },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a Conversation."
        lead="Tell us what you're planning. We reply to every enquiry, usually within one working day."
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <div key={c.label} className="flex flex-col gap-1 py-7">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    {c.label}
                  </dt>
                  <dd>
                    <a
                      href={c.href}
                      className="wrap-anywhere font-display text-3xl text-ink transition-colors hover:text-volt-soft md:text-4xl"
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="flex flex-col gap-1 py-7">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Location
                </dt>
                <dd className="text-lg text-ink">{contact.location}</dd>
              </div>
              <div className="flex flex-col gap-1 py-7">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Availability
                </dt>
                <dd className="flex items-center gap-2 text-lg text-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#6EE7B7]" />
                  {contact.availability}
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-xs text-ink-faint">
              Contact details are placeholders held in{" "}
              <code className="wrap-anywhere font-mono text-ink-dim">src/config/site.ts</code>.
              Channels left as <code className="font-mono text-ink-dim">null</code> are hidden
              rather than invented.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-8">
                <h2 className="font-display text-2xl text-ink">Prefer a brief?</h2>
                <p className="pretty text-sm leading-relaxed text-ink-dim">
                  The project form takes about two minutes and gives us enough to quote properly.
                </p>
                <MagneticButton href={site.cta.primary.href} className="w-full">
                  {site.cta.primary.label}
                </MagneticButton>
                {contact.whatsapp && (
                  <MagneticButton
                    href={`https://wa.me/${contact.whatsapp}`}
                    variant="outline"
                    className="w-full"
                  >
                    WhatsApp
                  </MagneticButton>
                )}
                {contact.bookingUrl && (
                  <MagneticButton href={contact.bookingUrl} variant="outline" className="w-full">
                    Book a Call
                  </MagneticButton>
                )}
              </div>
            </Reveal>

            <nav className="mt-8" aria-label="Social profiles">
              <h2 className="eyebrow mb-4">Elsewhere</h2>
              <ul className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-xs text-ink-dim transition-colors hover:border-ink hover:text-ink"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
