# Portfolio — Syed Uzaif (Mobile Product Engineer)

Personal portfolio, **rebuilt in Next.js** and statically exported to **GitHub Pages** (`https://syeduzaif.github.io`). It repositions Syed from "Flutter Developer" to **Mobile Product Engineer** with a cinematic, editorial "product journal" aesthetic.

> The previous **Flutter Web** app is archived under `legacy-flutter/` (full git history preserved). Do not edit it — it is retired.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (`strict`)
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/app/globals.css` (there is **no** `tailwind.config.js`)
- **Framer Motion** — restrained, always reduced-motion aware
- **next/font** — Instrument Serif (display) + Manrope (body/UI)
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
- **Design tokens** are the `@theme` block in `globals.css` (colors `bg/surface/cream/muted/terracotta/olive/sand`, fluid `text-*` sizes, radii). Use token utilities (`text-cream`, `bg-surface`, `text-h2`, …) — don't hardcode hex/px.
- **Server Components by default.** Only interactive leaves are `"use client"` (Navbar, MobileMenu, Reveal, HeroMedia, ProjectVisual).
- **Media fallbacks**: the `Media` union (`src/lib/types.ts`) is either `{kind:"image"}` or `{kind:"placeholder"}`. Missing assets render as warm textured covers via `MediaFrame`. To add a real asset, flip one data entry — no component changes. Checklist in `ASSETS.md`.
- **SEO/GEO** (`src/lib/seo.ts` + app routes): Metadata API, per-route canonicals, `sitemap.ts`, `robots.ts` (AI crawlers allowed), static `opengraph-image.png`, `public/llms.txt`, `ProfilePage`/`Person`/`WebSite` JSON-LD. Keep the `Syed Uzaif` + `Mobile Product Engineer` entity strings consistent across title/h1/meta/JSON-LD/llms.txt. Exactly one `<h1>` per page.

## Scope note

This build delivers the **foundation + homepage** (+ About and case-study route stubs). Full case-study bodies (MDX), a Creative page, and Notes are planned later passes — the `CaseStudy` model in `src/data/caseStudies.ts` already reserves fields for them.

## Do / Don't

- ✅ Reuse the `ui/` primitives (Container, Section, SectionHeader, Button, Reveal, Stat, Timeline).
- ✅ Honour `prefers-reduced-motion` in any new motion.
- ✅ Keep links real `<a>`/`<Link>` and add trailing slashes to internal routes (`/work/x/`).
- ❌ Don't add a theme toggle, particle background, typewriter, or floating nav pill (deliberately removed).
- ❌ Don't use `next/image` optimization features that require a server, or add API routes / server actions — the site is a static export.
- ❌ Don't show skill percentages or unverifiable claims.
