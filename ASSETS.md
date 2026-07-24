# Asset checklist

The homepage ships fully today with graceful fallbacks. Each item below upgrades
a placeholder to real media — usually a one-line change in `src/data/`.

Legend: 🔴 biggest gap · 🟡 recommended · ⚪ optional

---

## 🔴 YouTube (channel + 3 videos)

There is **no YouTube URL anywhere yet** — the Creative section's "Watch" buttons
render as disabled "Coming soon" until provided.

1. Add the channel URL to `siteConfig.links.youtube` in `src/data/siteConfig.ts`
   (this also lights up the footer icon, the Contact "YouTube" link, and the
   `sameAs` in the JSON-LD + `public/llms.txt`).
2. In `src/data/creative.ts`, for each of the 3 videos set:
   - `url` → the YouTube watch URL (enables the Watch button)
   - `thumb` → `{ kind: "image", src: "/images/creative/<file>.jpg", alt: "…" }`
     (drop the thumbnails into `public/images/creative/`)

The three videos referenced: **Master of None**, **Why I Wait for the Call to End
Before I Text**, **Stupid Alarm — Development Series**.

## 🟡 Project covers

Real screenshots/covers for the two placeholder projects. Drop files in
`public/images/projects/`, then in `src/data/caseStudies.ts` change `cover` to
`{ kind: "image", src, alt }`:

- **Budget Buddy** → `budget-buddy-cover.png`
- **Stupid Alarm** → `stupid-alarm-cover.png`

(SimpliEd already uses a real cover: `public/images/projects/simplied-cover.png`.)

## 🟡 Favicon / app icons

The old Flutter icons were placeholders and were not carried over. Add a real
square source (≥512×512) and generate:

- `src/app/icon.png` (Next auto-wires the favicon)
- `src/app/apple-icon.png` (optional)

## ⚪ Hero video

Optional cinematic upgrade. Add `public/videos/hero.webm` + `hero.mp4` + a poster,
then pass a `video={{ webm, mp4 }}` prop to `<HeroMedia>` in
`src/components/sections/Hero.tsx`. Muted, ~8–15s loop. Auto-disabled under
reduced-motion.

## ⚪ SimpliEd case-study visuals

For the future full case study — **sanitised** SimpliEd screenshots/diagrams
(remove student data, internal URLs, private metrics). Wire into the
`gallery`/body fields on `caseStudies.simplied`.

## ⚪ Portrait & résumé

- Existing `public/images/profile.png` works; optionally replace with a
  higher-res / freshly compressed version.
- Confirm `public/documents/Syed_Uzaif_Resume.pdf` reflects the **Mobile Product
  Engineer** positioning before launch.

---

## One-time setup (done outside this repo)

- Rename the GitHub repo `Portfolio` → **`syeduzaif.github.io`** (GitHub redirects
  the old name), then `git remote set-url origin …`.
- Repo **Settings → Pages → Source: GitHub Actions**.
- Remove the now-unused Vercel secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`,
  `VERCEL_PROJECT_ID`).
