# Portfolio — Syed Uzaif (Mobile Product Engineer)

Personal portfolio, **rebuilt in Next.js** and statically exported to **GitHub Pages** (`https://syeduzaif.github.io`). It repositions Syed from "Flutter Developer" to **Mobile Product Engineer** with a **"Signal Spec"** aesthetic — Swiss/International: a flat warm-grey ground, hairline rules, oversized grotesque headlines, one hot signal accent, dark bands that carry their own text colours, and projects presented as numbered technical reports.

The homepage was redesigned in pen.dev (October 2026) and ported by hand; the source design lives in `designs/homepage-redesign-v1.pen` with the content inventory in `designs/content.md`. Two earlier looks were deliberately replaced: a dark "cinematic product journal", then the warm-paper "Experimental Editorial Product Lab" with hand-drawn marks.

> The previous **Flutter Web** app is archived under `legacy-flutter/` (full git history preserved). Do not edit it — it is retired.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (`strict`)
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css` (there is **no** `tailwind.config.js`)
- **Framer Motion** — restrained, always reduced-motion aware
- **next/font** — Bricolage Grotesque (display) + Inter (body/UI) + IBM Plex Mono (technical labels/metadata). Bricolage **must** request its `opsz` and `wdth` axes explicitly (`axes: ["opsz", "wdth"]`); next/font ships only `wght` for variable fonts, and the default optical size renders wide enough to break the hero headline.
- **Static export**: `output: "export"` in `next.config.ts` → `./out`. Images are `unoptimized` (no image server on Pages); `trailingSlash: true`.

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # static export → ./out
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npx serve out      # preview the exact Pages output
```

## Architecture & conventions

- **Content lives in `src/data/`** — `siteConfig`, `caseStudies`, `process`, `ownership`, `creative`, `timeline`, `highlights`. **Never hardcode user-facing text in components.**
- **Design tokens** are the `@theme` block in `globals.css`. Token *names* are inherited from the previous palette on purpose — ~450 usages across 32 files map onto the same roles, so the redesign was a value swap, not a rename. `paper` is the ground (`#F1F1EC`), `paper-soft` is now an inset panel and **darker** than `paper`, plus `rule` for hairlines and the `night`/`night-2`/`on-night`/`on-night-2` set for dark bands. Use token utilities (`text-ink`, `bg-paper-soft`, `text-h2`, …) — don't hardcode hex/px.
  - **Contrast is load-bearing.** On `paper`, base `orange` (2.97) and `green` (2.98) **fail AA** — they are large-text, fills, rules and UI only; `orange-deep` (4.8) and `green-deep` (4.8) carry small text. `yellow` is lime: a fill on **night** only (16.2 there, 1.02 on paper). On an orange ground use **ink**, never paper (5.6 vs 3.0).
  - Per-project accents (`--accent`/`--accent-ink`, via `lib/accents.ts`): SimpliEd = blue, Budget Buddy = green, Stupid Alarm = orange.
- **`cn()` registers the `@theme` type scale with tailwind-merge** (`src/lib/utils.ts`). Without it, `text-hero`/`text-h2`/… are treated as text *colours* and get dropped when merged with `text-ink`. Add any new `--text-*` token to that list.
- **Two building blocks carry most of the layout** (`src/components/ui/`):
  - `<Eyebrow>` — the mono/uppercase/tracked label that opens every block. Pick the `tone` for the ground (`signal` on paper, `signal-on-night` on a dark band, `accent` for a per-project accent, `grey` for sub-labels).
  - `<SpecTable>` — the hairline-ruled label/value `<dl>` behind inquiry beats, case-study facts, decision records, the timeline and the principles list. Everything is visible; there is no hover-to-reveal.
- **Lab primitives** live in `src/components/lab/`: ProcessFlow, ResponsibilityMap, StoryObservation, DraggableNote, AppTrio, MediaFragment, ApproachCard, DecisionRecord. The editorial-era set (EditorialLabel, HandDrawnArrow, CircledText, Tape, ProductNote, Mark, ExperimentNumber, Glyph/ExperimentLegend, Annotation, InquiryBlock) is **deleted** — the glyph language ● ? ■ ✕ → ★ is gone, replaced by mono labels and square accent markers. Don't reintroduce them.
- **Server Components by default.** Only interactive leaves are `"use client"` (Navbar, MobileMenu, Reveal, ProcessFlow, DraggableNote).
- **Media fallbacks**: the `Media` union (`src/lib/types.ts`) is either `{kind:"image"}` or `{kind:"placeholder"}`. Missing assets render as warm textured covers via `MediaFrame`. To add a real asset, flip one data entry — no component changes. Checklist in `ASSETS.md`.
- **SEO/GEO** (`src/lib/seo.ts` + app routes): Metadata API, per-route canonicals, `sitemap.ts`, `robots.ts` (AI crawlers allowed), static `opengraph-image.png`, `public/llms.txt`, `ProfilePage`/`Person`/`WebSite` JSON-LD. Keep the `Syed Uzaif` + `Mobile Product Engineer` entity strings consistent across title/h1/meta/JSON-LD/llms.txt. Exactly one `<h1>` per page.

## Scope note

Homepage, About, the `/work` index and the `/work/[slug]` case studies are all on the Signal Spec direction. A standalone Creative page and Notes are planned later passes. Case-study bodies render from `src/data/caseStudies.ts` — every long-form field is optional and the template renders only what exists, with `gaps` surfacing as visible "content needed" markers rather than hiding a missing section.

## Do / Don't

- ✅ Reuse the `ui/` primitives (Container, Section, SectionHeader, Eyebrow, SpecTable, Button, Reveal, Timeline).
- ✅ Honour `prefers-reduced-motion` in any new motion.
- ✅ Keep links real `<a>`/`<Link>` and add trailing slashes to internal routes (`/work/x/`).
- ✅ Check contrast before putting a colour on a ground — see the token notes above.
- ❌ Don't add a theme toggle, particle background, typewriter, or floating nav pill (deliberately removed).
- ❌ Don't reintroduce the hand-drawn layer (tape, circled text, sketch arrows, sticky-note rotation) — the current direction is deliberately flat and ruled.
- ❌ Don't use `next/image` optimization features that require a server, or add API routes / server actions — the site is a static export.
- ❌ Don't show skill percentages or unverifiable claims.
