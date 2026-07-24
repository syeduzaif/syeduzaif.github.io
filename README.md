# Syed Uzaif — Portfolio

Personal portfolio for **Syed Uzaif, Mobile Product Engineer**. Built with Next.js (App Router) and statically exported to **GitHub Pages** at `https://syeduzaif.github.io`.

Positioning: _I turn unclear ideas into thoughtful mobile products by combining engineering, product thinking, visual judgment, and end-to-end ownership._

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Framer Motion** (restrained, reduced-motion aware)
- **next/font** — Instrument Serif (display) + Geist (body/UI) + Geist Mono (labels)
- **Static export** (`output: "export"`) → hosted on GitHub Pages

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export → `./out` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Preview the exact static output that GitHub Pages serves:

```bash
npm run build && npx serve out
```

## Project structure

```
src/
├── app/            # routes, layout, globals.css, sitemap/robots, OG image, 404
│   ├── page.tsx        # homepage (composes the section components)
│   ├── about/          # About page
│   └── work/[slug]/    # case-study pages (SSG over featured slugs)
├── components/
│   ├── layout/     # Navbar, MobileMenu, Footer
│   ├── sections/   # the homepage sections
│   ├── media/      # HeroMedia, MediaFrame + graceful fallbacks
│   └── ui/         # Container, Section, Button, Reveal, etc.
├── data/           # all content lives here (siteConfig, caseStudies, …)
└── lib/            # fonts, seo (metadata + JSON-LD), motion, utils, types
public/             # profile image, résumé PDF, llms.txt, .nojekyll
legacy-flutter/     # the previous Flutter Web app (archived, history preserved)
```

## Editing content

All copy and data live in `src/data/`. Never hardcode user-facing text in components.

| Update | File |
|---|---|
| Identity, hero, links, availability | `src/data/siteConfig.ts` |
| Featured projects / case studies | `src/data/caseStudies.ts` |
| Process, ownership, timeline, direction | `src/data/{process,ownership,timeline,highlights}.ts` |
| Creative videos | `src/data/creative.ts` |
| Design tokens (color, type, spacing) | `src/app/globals.css` (`@theme`) |

### Swapping in real media

Missing assets render as intentional textured placeholders. To add a real one, flip
its entry in the data file from `{ kind: "placeholder", ... }` to
`{ kind: "image", src, alt }`. See `ASSETS.md` for the full checklist.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) runs lint + typecheck + build and
publishes `./out` to GitHub Pages on every push to `main`. Requires repo
**Settings → Pages → Source: GitHub Actions**.

## SEO / AI SEO / GEO

Metadata API + per-route canonicals, `sitemap.xml`, `robots.txt` (AI crawlers
allowed), a static OG image, `public/llms.txt`, and rich `ProfilePage` / `Person`
JSON-LD. Static export means all content ships in the HTML — ideal for search and
generative-engine crawlers.
