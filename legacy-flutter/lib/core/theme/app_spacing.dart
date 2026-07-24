/// Neon Cosmos — Spacing & sizing system for web portfolio
class AppSpacing {
  AppSpacing._();

  // ─── Base Spacing ──────────────────────────────────────────────
  static const double xxs = 4.0;
  static const double xs = 8.0;
  static const double s = 12.0;
  static const double m = 16.0;
  static const double l = 20.0;
  static const double xl = 24.0;
  static const double xxl = 32.0;
  static const double xxxl = 48.0;
  static const double huge = 64.0;
  static const double massive = 80.0;

  // ─── Section Spacing ───────────────────────────────────────────
  static const double sectionVertical = 100.0;
  static const double sectionVerticalMobile = 60.0;
  static const double sectionHorizontal = 24.0;
  static const double sectionHorizontalMobile = 16.0;

  // ─── Border Radius ─────────────────────────────────────────────
  static const double radiusXs = 4.0;
  static const double radiusS = 8.0;
  static const double radiusM = 12.0;
  static const double radiusL = 16.0;
  static const double radiusXl = 20.0;
  static const double radiusXxl = 24.0;
  static const double radiusFull = 999.0;

  // ─── Icon Sizes ────────────────────────────────────────────────
  static const double iconXs = 16.0;
  static const double iconS = 20.0;
  static const double iconM = 24.0;
  static const double iconL = 32.0;
  static const double iconXl = 48.0;

  // ─── Button Heights ────────────────────────────────────────────
  static const double buttonHeightS = 40.0;
  static const double buttonHeightM = 48.0;
  static const double buttonHeightL = 56.0;

  // ─── Card Elevation ────────────────────────────────────────────
  static const double elevationNone = 0.0;
  static const double elevationS = 2.0;
  static const double elevationM = 4.0;
  static const double elevationL = 8.0;
  static const double elevationXl = 16.0;

  // ─── Content Width (Web) ───────────────────────────────────────
  static const double maxContentWidth = 1200.0;
  static const double maxCardWidth = 400.0;
  static const double navBarHeight = 70.0;

  // ─── Animation Durations ───────────────────────────────────────
  static const Duration durationFast = Duration(milliseconds: 200);
  static const Duration durationNormal = Duration(milliseconds: 400);
  static const Duration durationSlow = Duration(milliseconds: 600);
  static const Duration durationReveal = Duration(milliseconds: 800);
}
