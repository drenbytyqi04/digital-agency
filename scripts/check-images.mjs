/**
 * Verifies that every Unsplash photo declared in src/config/images.ts
 * actually resolves. Run: npm run check:images
 *
 * The IDs were authored in a network-restricted environment where
 * Unsplash could not be reached, so this is the check that confirms
 * them. Any FAIL below needs a replacement ID in src/config/images.ts.
 */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/config/images.ts", import.meta.url), "utf8");

// Pull each `id: "photo-…"` together with the alt text that follows it.
const entries = [...src.matchAll(/id:\s*"(photo-[^"]+)",\s*\n\s*alt:\s*"([^"]+)"/g)].map(
  ([, id, alt]) => ({ id, alt })
);

if (!entries.length) {
  console.error("No photo IDs found in src/config/images.ts");
  process.exit(1);
}

console.log(`Checking ${entries.length} Unsplash photos…\n`);

const results = await Promise.all(
  entries.map(async ({ id, alt }) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=64&q=60`;
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      return { id, alt, ok: res.ok, status: res.status };
    } catch (err) {
      return { id, alt, ok: false, status: 0, err: err.code ?? err.message };
    }
  })
);

/**
 * Distinguish a blocked network from bad photo IDs.
 *
 * A corporate proxy, an offline machine or a sandbox will fail EVERY
 * request identically — usually 403 on CONNECT or a DNS error. Reporting
 * that as "19 bad IDs, replace them all" would send you hunting for
 * replacements that were never the problem. A genuine bad ID shows up as
 * a 404 among otherwise-passing requests.
 */
const failures = results.filter((r) => !r.ok);
const blockedLike = failures.filter((r) => r.status === 0 || r.status === 403);

if (failures.length === entries.length && blockedLike.length === entries.length) {
  const sample = failures[0];
  console.log("  (every request failed identically)\n");
  console.log(
    `Network appears blocked here — all ${entries.length} requests returned ` +
      `${sample.status === 0 ? sample.err : "HTTP " + sample.status} .`
  );
  console.log("This says nothing about whether the photo IDs are valid.");
  console.log("Re-run on a machine with unrestricted access to images.unsplash.com.");
  process.exit(2);
}

for (const r of results) {
  if (r.ok) console.log(`  ok    ${r.id}`);
  else console.log(`  FAIL  ${r.id}  (${r.status === 0 ? r.err : "HTTP " + r.status})  — ${r.alt}`);
}

console.log(
  failures.length
    ? `\n${failures.length} of ${entries.length} failed. Replace them in src/config/images.ts.`
    : `\nAll ${entries.length} photos resolved.`
);
process.exit(failures.length ? 1 : 0);
