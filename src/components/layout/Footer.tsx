import Link from "next/link";
import { site } from "@/config/site";
import { services } from "@/config/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-void">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="flex flex-col gap-5 md:col-span-5">
            <Link href="/" className="font-display text-4xl leading-none text-ink">
              {site.name}
            </Link>
            <p className="pretty max-w-xs text-sm leading-relaxed text-ink-dim">{site.tagline}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-ink-faint">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#6EE7B7]" />
              {site.contact.availability}
            </p>
          </div>

          <nav className="md:col-span-3" aria-labelledby="footer-links">
            <h2 id="footer-links" className="eyebrow mb-5">
              Navigate
            </h2>
            <ul className="flex flex-col gap-3">
              {[{ label: "Home", href: "/" }, ...site.nav, site.cta.primary].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-sm text-ink-dim transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-labelledby="footer-services">
            <h2 id="footer-services" className="eyebrow mb-5">
              Services
            </h2>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.hasPage ? `/services/${s.slug}` : "/services"}
                    className="inline-flex min-h-9 items-center text-sm text-ink-dim transition-colors hover:text-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-labelledby="footer-social">
            <h2 id="footer-social" className="eyebrow mb-5">
              Social
            </h2>
            <ul className="flex flex-col gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex min-h-9 items-center text-sm text-ink-dim transition-colors hover:text-ink"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="wrap-anywhere">
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-ink">
                {site.contact.email}
              </a>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
