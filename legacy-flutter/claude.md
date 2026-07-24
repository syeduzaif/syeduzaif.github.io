# Portflo — Syed Uzaif's Flutter Developer Portfolio

## Project Overview

**Portflo** is a personal developer portfolio website built with **Flutter for Web**. It showcases Syed Uzaif's professional experience, projects, skills, and contact information as a Flutter Developer. The app features a dark-first "Neon Cosmos" design theme with Electric Purple + Cyan branding, animated particle backgrounds, scroll-reveal effects, and full light/dark mode support.

- **Platform**: Flutter Web (primary target)
- **SDK**: Dart `^3.11.0`
- **State Management**: `ValueNotifier` + `ValueListenableBuilder` (no external state management package)
- **Architecture**: Section-based, single-page scrolling portfolio

---

## Tech Stack & Dependencies

| Category | Package | Purpose |
|---|---|---|
| Typography | `google_fonts` | Outfit (headings) + DM Sans (body) |
| Animations | `animated_text_kit` | Hero section typewriter effect |
| Animations | `visibility_detector` | Scroll-triggered reveal animations |
| Utilities | `url_launcher` | External link handling (GitHub, LinkedIn, email) |
| Icons | `font_awesome_flutter` | Brand icons (GitHub, LinkedIn, etc.) |
| Linting | `flutter_lints` | Static analysis rules |

---

## Project Structure

```
lib/
├── main.dart                  # Entry point — runApp(PortfolioApp())
├── app.dart                   # MaterialApp with theme toggling via ValueNotifier
├── portfolio_page.dart        # Main page — scroll controller, section keys, nav integration
│
├── core/
│   ├── constants/
│   │   ├── app_strings.dart   # ALL text content — edit here, never in widgets
│   │   └── app_urls.dart      # External URLs (GitHub, LinkedIn, Formspree, etc.)
│   ├── responsive/
│   │   └── responsive.dart    # Breakpoints (mobile: 768, tablet: 1024, desktop: 1440)
│   └── theme/
│       ├── app_colors.dart    # "Neon Cosmos" color palette + Material 3 ColorSchemes
│       ├── app_fonts.dart     # Typography system (Outfit + DM Sans via Google Fonts)
│       ├── app_spacing.dart   # Spacing tokens, radii, icon sizes, animation durations
│       └── app_theme.dart     # ThemeData (light + dark) with M3 component theming
│
├── data/
│   ├── experience_data.dart   # ExperienceModel + ExperienceData (timeline entries)
│   ├── project_data.dart      # ProjectModel + ProjectData (portfolio projects list)
│   └── skill_data.dart        # SkillModel, SkillCategoryModel + SkillData
│
├── sections/                  # Each section is in its own subdirectory
│   ├── hero/hero_section.dart          # Full-screen hero with particle bg + typewriter
│   ├── about/about_section.dart        # About me, stats, education, availability
│   ├── experience/experience_section.dart  # Work timeline
│   ├── projects/
│   │   ├── projects_section.dart       # Category-filtered project grid
│   │   └── project_card.dart           # Individual project card widget
│   ├── skills/skills_section.dart      # Skill categories with animated progress bars
│   ├── github_stats/github_stats_section.dart  # GitHub stats cards (via API images)
│   ├── contact/contact_section.dart    # Contact form (Formspree) + social links
│   └── footer/footer_section.dart      # Footer credits
│
├── widgets/
│   ├── buttons/primary_button.dart     # Reusable CTA button (filled + outlined variants)
│   ├── effects/
│   │   ├── particle_background.dart    # Animated canvas with connecting particles
│   │   ├── scroll_progress_indicator.dart  # Top progress bar tracking scroll position
│   │   └── scroll_reveal.dart          # Scroll-triggered fade+slide animation wrapper
│   ├── navigation/floating_nav_bar.dart  # Glassmorphism navbar (desktop full / mobile hamburger)
│   ├── section_header.dart             # Reusable overline + title header component
│   ├── tech_badge.dart                 # Tech stack pill/badge for project cards
│   └── theme_toggle.dart              # Light/dark mode toggle button
│
assets/
├── images/    # Profile/personal images
├── projects/  # Project screenshots
└── icons/     # Custom icon assets
```

---

## Architecture & Patterns

### Single-Page Scrollable Design
- `PortfolioPage` contains all sections in a `SingleChildScrollView` + `Column`.
- Each section is wrapped in `KeyedSubtree` with `GlobalKey` for scroll-to-section navigation.
- `_onScroll()` determines the active section by checking render object positions.
- `FloatingNavBar` sits in a `Stack` overlay with glassmorphism styling.

### Theme System
- **Dark-first** design (default `ThemeMode.dark`).
- `ValueNotifier<ThemeMode>` passed from `PortfolioApp` → `PortfolioPage` → `FloatingNavBar` → `ThemeToggle`.
- Colors use a comprehensive system: brand, background/surface, text, semantic, border, glassmorphism, and gradient tokens.
- Full `ColorScheme` definitions for both light and dark in `AppColors`.
- `AppTheme` configures M3 component themes (buttons, inputs, chips, etc.).

### Typography System
- **Headings**: `Outfit` (geometric, modern) via `GoogleFonts.outfit()`
- **Body/Labels**: `DM Sans` (clean, readable) via `GoogleFonts.dmSans()`
- Named style getters: `heroTitle`, `h1`–`h6`, `bodyLarge/Medium/Small`, `labelLarge/Medium/Small`, `buttonLarge/Medium`, `overline`, `caption`
- Full `TextTheme` mapped for Material 3 compatibility.

### Responsive System
- Breakpoints: **mobile** `<768`, **tablet** `768–1024`, **desktop** `≥1024`
- `Responsive.value<T>()` static method + `context.responsive<T>()` extension for clean responsive code.
- Helper extensions: `context.isMobile`, `context.isTablet`, `context.isDesktop`, `context.screenWidth/Height`.

### Animation Patterns
- **Staggered entrance**: Hero section uses 5 `AnimationController`s fired with 200ms delays.
- **Scroll reveal**: `ScrollReveal` widget wraps any child — uses `VisibilityDetector` to trigger once when entering viewport. Configurable delay, duration, slide offset, curve, and visibility threshold.
- **Particle background**: `CustomPainter` with 50 particles, connecting lines between nearby particles, continuous animation via `AnimationController.repeat()`.
- **Skill progress bars**: Animate from 0 to proficiency value on scroll into view.
- **Standard durations**: `durationFast` (200ms), `durationNormal` (400ms), `durationSlow` (600ms), `durationReveal` (800ms) in `AppSpacing`.

### Data Layer
- All portfolio content is stored as static `const` lists of model objects in `lib/data/`.
- Models: `ProjectModel`, `ExperienceModel`, `SkillModel`, `SkillCategoryModel`.
- Text content is centralized in `AppStrings` — **never hardcode text in widgets**.
- External URLs are centralized in `AppUrls`.

---

## Key Conventions

### DO
- ✅ Use design tokens from `AppColors`, `AppFonts`, `AppSpacing` — never hardcode values.
- ✅ Use `AppStrings` for all user-facing text.
- ✅ Use `context.responsive()` or `context.isMobile/isDesktop` for responsive layouts.
- ✅ Wrap section content in `ConstrainedBox(maxWidth: AppSpacing.maxContentWidth)`.
- ✅ Use `ScrollReveal` for scroll-triggered entrance animations.
- ✅ Check `Theme.of(context).brightness` to select dark/light variants.
- ✅ Private constructor pattern for utility classes (e.g., `AppColors._();`).
- ✅ Keep each section in its own subdirectory under `lib/sections/`.
- ✅ Use `const` constructors wherever possible.

### DON'T
- ❌ Don't use external state management (no Provider, Riverpod, Bloc, GetX, etc.).
- ❌ Don't hardcode colors, fonts, spacing, or text strings in widget files.
- ❌ Don't use `withOpacity()` — use `withValues(alpha: ...)` instead (project convention).
- ❌ Don't mix section logic — each section should be self-contained.
- ❌ Don't add unnecessary packages — keep dependencies minimal.

---

## Build & Run

```bash
# Install dependencies
flutter pub get

# Run in Chrome (development)
flutter run -d chrome

# Build for web deployment
flutter build web

# Analyze code
flutter analyze
```

---

## Content Updates

To update portfolio content, modify files in these locations:

| What to Update | File |
|---|---|
| Personal info, section text | `lib/core/constants/app_strings.dart` |
| Social links, GitHub stats URLs | `lib/core/constants/app_urls.dart` |
| Projects list | `lib/data/project_data.dart` |
| Work experience | `lib/data/experience_data.dart` |
| Skills & proficiencies | `lib/data/skill_data.dart` |
| Colors & branding | `lib/core/theme/app_colors.dart` |
| Typography | `lib/core/theme/app_fonts.dart` |
| Spacing & layout tokens | `lib/core/theme/app_spacing.dart` |

---

## Pending / TODOs

- `HeroSection`: Resume download button has `// TODO: Link to actual resume`.
- `AppUrls.formspreeEndpoint`: Still set to placeholder `'https://formspree.io/f/YOUR_FORM_ID'`.
- About section has a "Your Photo Here" placeholder — add actual profile photo to `assets/images/`.
- Project cards don't have screenshot images — add to `assets/projects/`.
- `GitHubStatsSection` is **not** keyed for scroll-to navigation (unlike other sections).
