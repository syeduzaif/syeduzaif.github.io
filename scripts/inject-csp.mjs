/**
 * Postbuild: inject the CSP <meta> as the first child of <head> in every
 * exported page.
 *
 * Why postbuild rather than a <meta> in the root layout: Next emits its own
 * font preloads and framework <script> tags ahead of any layout-supplied head
 * children, and a meta policy does not apply to resources the parser already
 * passed. Rewriting the emitted HTML is the only way to get it first on a
 * static export.
 */
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { contentSecurityPolicy } from "./csp.mjs";

const OUT = "out";
const TAG = `<meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}">`;

const files = [];
for await (const f of glob(`${OUT}/**/*.html`)) files.push(f);

if (files.length === 0) {
  console.error(`inject-csp: no HTML found under ${OUT}/ — did the build run?`);
  process.exit(1);
}

let injected = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");

  if (html.includes("http-equiv=\"Content-Security-Policy\"")) continue;

  const head = html.indexOf("<head>");
  if (head === -1) {
    console.error(`inject-csp: no <head> in ${file}`);
    process.exit(1);
  }

  const at = head + "<head>".length;
  await writeFile(file, html.slice(0, at) + TAG + html.slice(at));
  injected += 1;
}

console.log(`inject-csp: CSP added to ${injected}/${files.length} page(s)`);
