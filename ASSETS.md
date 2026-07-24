# Asset checklist

The homepage ships fully today with graceful fallbacks. Each item below upgrades
a placeholder to real media — usually a one-line change in `src/data/`.

Legend: 🔴 biggest gap · 🟡 recommended · ⚪ optional

---

## 🔴 Creative — product-building video (reserved slot)

The Creative section shows two real videos plus **one clearly-reserved slot**
("Stupid Alarm — building in public", renders as an "In production" future slot).
To publish it:

1. Drop a thumbnail at `public/images/creative/stupid-alarm-dev.jpg`.
2. In `src/data/creative.ts`, on that entry set `thumb` → `{ kind:"image", src, alt }`,
   `url` → the YouTube watch URL, and remove `reserved: true`.

The YouTube channel URL is already wired (`siteConfig.links.youtube`). The two
live videos ("Why I Wait for the Call to End Before I Text", "I ship apps for
everyone except myself") use real URLs + thumbnails already.

## 🟡 Project covers & case-study galleries

Covers for the two placeholder projects currently render as polished
**device-frame previews** with a visible "Visual preview in progress" pill (not
fake screens). To upgrade, drop a real (sanitised) file and flip `cover` in
`src/data/caseStudies.ts` to `{ kind:"image", src, alt }`:

- **Budget Buddy** → `public/images/projects/budget-buddy-cover.png`
  (real app logo already copied to `budget-buddy-logo.png` if useful)
- **Stupid Alarm** → `public/images/projects/stupid-alarm-cover.png`

Case-study `gallery` visuals (wired via each study's `gaps` notes):
- **SimpliEd** → sanitised Teacher-app screenshots → `public/images/projects/simplied/`
- **Budget Buddy** → expense entry / category budgets / monthly view → `public/images/projects/budget-buddy/`
- **Stupid Alarm** → prototype screens + short muted demo → `public/images/projects/stupid-alarm/`

(SimpliEd already uses a real cover: `public/images/projects/simplied-cover.png`.)

## 🟡 Favicon / app icons

The old Flutter icons were placeholders and were not carried over. Add a real
square source (≥512×512) and generate:

- `src/app/icon.png` (Next auto-wires the favicon)
- `src/app/apple-icon.png` (optional)

## ⚪ Hero video

Optional upgrade. Add `public/videos/hero.webm` + `hero.mp4` + a poster,
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
