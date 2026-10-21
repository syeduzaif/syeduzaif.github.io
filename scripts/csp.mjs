/**
 * Content-Security-Policy for the static export.
 *
 * GitHub Pages cannot send custom response headers, so this ships as a
 * <meta http-equiv> injected into every built page by `inject-csp.mjs`
 * (a postbuild step — Next hoists its own preloads and scripts above
 * anything placed in <head> from the layout, and a meta policy only
 * governs what the parser meets *after* it).
 *
 * Derived from what the export actually loads. Keep in sync if you add an
 * embed, analytics, or a remote font/image:
 *  - script-src 'unsafe-inline': Next inlines the RSC flight-data payload as
 *    ~10 inline <script> blocks per page. Nonces need a server to vary them
 *    per request and there is none (output: "export"), so inline script
 *    cannot be locked down here. That is this policy's main weakness — it
 *    still blocks every *external* script origin, the realistic injection
 *    route for a site with no user input.
 *  - style-src 'unsafe-inline': Framer Motion writes inline style attributes.
 *  - img-src data:: the `.grain` paper texture is an inline SVG data URI.
 *  - connect-src 'self': App Router <Link> prefetches same-origin RSC payloads.
 *
 * `frame-ancestors` is deliberately absent: browsers ignore it in a meta tag,
 * so including it would imply clickjacking cover the site does not have.
 * That needs real headers (e.g. Cloudflare in front of Pages).
 */
export const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'none'",
  "frame-src 'none'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");
