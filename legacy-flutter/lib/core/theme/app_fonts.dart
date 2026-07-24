import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Neon Cosmos Typography System
/// Headings: Outfit (geometric, modern, bold)
/// Body: DM Sans (clean, readable, professional)
class AppFonts {
  AppFonts._();

  // ─── Font Families ─────────────────────────────────────────────
  static String get fontFamily => GoogleFonts.dmSans().fontFamily!;
  static String get displayFontFamily => GoogleFonts.outfit().fontFamily!;

  // ─── Font Weights ──────────────────────────────────────────────
  static const FontWeight light = FontWeight.w300;
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semiBold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;
  static const FontWeight extraBold = FontWeight.w800;

  // ─── Font Sizes ────────────────────────────────────────────────
  static const double sizeXs = 12.0;
  static const double sizeS = 14.0;
  static const double sizeM = 16.0;
  static const double sizeL = 18.0;
  static const double sizeXl = 20.0;
  static const double sizeXxl = 24.0;
  static const double sizeXxxl = 32.0;
  static const double sizeHuge = 40.0;
  static const double sizeDisplay = 56.0;
  static const double sizeHero = 72.0;

  // ─── Heading Styles (Outfit) ───────────────────────────────────
  static TextStyle get heroTitle => GoogleFonts.outfit(
        fontSize: sizeHero,
        fontWeight: extraBold,
        height: 1.1,
        letterSpacing: -1.5,
      );

  static TextStyle get h1 => GoogleFonts.outfit(
        fontSize: sizeDisplay,
        fontWeight: bold,
        height: 1.1,
        letterSpacing: -1.0,
      );

  static TextStyle get h2 => GoogleFonts.outfit(
        fontSize: sizeHuge,
        fontWeight: bold,
        height: 1.2,
        letterSpacing: -0.5,
      );

  static TextStyle get h3 => GoogleFonts.outfit(
        fontSize: sizeXxxl,
        fontWeight: semiBold,
        height: 1.3,
        letterSpacing: -0.3,
      );

  static TextStyle get h4 => GoogleFonts.outfit(
        fontSize: sizeXxl,
        fontWeight: semiBold,
        height: 1.4,
      );

  static TextStyle get h5 => GoogleFonts.outfit(
        fontSize: sizeXl,
        fontWeight: semiBold,
        height: 1.4,
      );

  static TextStyle get h6 => GoogleFonts.outfit(
        fontSize: sizeL,
        fontWeight: semiBold,
        height: 1.5,
      );

  // ─── Body Text Styles (DM Sans) ───────────────────────────────
  static TextStyle get bodyLarge => GoogleFonts.dmSans(
        fontSize: sizeL,
        fontWeight: regular,
        height: 1.7,
      );

  static TextStyle get bodyMedium => GoogleFonts.dmSans(
        fontSize: sizeM,
        fontWeight: regular,
        height: 1.6,
      );

  static TextStyle get bodySmall => GoogleFonts.dmSans(
        fontSize: sizeS,
        fontWeight: regular,
        height: 1.5,
      );

  // ─── Label Styles (DM Sans) ────────────────────────────────────
  static TextStyle get labelLarge => GoogleFonts.dmSans(
        fontSize: sizeM,
        fontWeight: medium,
        height: 1.4,
      );

  static TextStyle get labelMedium => GoogleFonts.dmSans(
        fontSize: sizeS,
        fontWeight: medium,
        height: 1.4,
      );

  static TextStyle get labelSmall => GoogleFonts.dmSans(
        fontSize: sizeXs,
        fontWeight: medium,
        height: 1.4,
      );

  // ─── Button Text Styles ────────────────────────────────────────
  static TextStyle get buttonLarge => GoogleFonts.dmSans(
        fontSize: sizeM,
        fontWeight: semiBold,
        height: 1.2,
        letterSpacing: 0.5,
      );

  static TextStyle get buttonMedium => GoogleFonts.dmSans(
        fontSize: sizeS,
        fontWeight: semiBold,
        height: 1.2,
        letterSpacing: 0.5,
      );

  // ─── Overline & Caption ────────────────────────────────────────
  static TextStyle get overline => GoogleFonts.dmSans(
        fontSize: sizeS,
        fontWeight: semiBold,
        height: 1.3,
        letterSpacing: 2.0,
      );

  static TextStyle get caption => GoogleFonts.dmSans(
        fontSize: sizeXs,
        fontWeight: regular,
        height: 1.3,
      );

  // ─── Material 3 TextTheme ──────────────────────────────────────
  static TextTheme get textTheme => TextTheme(
        displayLarge: GoogleFonts.outfit(
          fontSize: 57,
          fontWeight: FontWeight.w800,
          letterSpacing: -1.5,
        ),
        displayMedium: GoogleFonts.outfit(
          fontSize: 45,
          fontWeight: FontWeight.w700,
          letterSpacing: -0.5,
        ),
        displaySmall: GoogleFonts.outfit(
          fontSize: 36,
          fontWeight: FontWeight.w600,
        ),
        headlineLarge: GoogleFonts.outfit(
          fontSize: 32,
          fontWeight: FontWeight.w600,
        ),
        headlineMedium: GoogleFonts.outfit(
          fontSize: 28,
          fontWeight: FontWeight.w500,
        ),
        headlineSmall: GoogleFonts.outfit(
          fontSize: 24,
          fontWeight: FontWeight.w500,
        ),
        titleLarge: GoogleFonts.dmSans(
          fontSize: 22,
          fontWeight: FontWeight.w600,
        ),
        titleMedium: GoogleFonts.dmSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.15,
        ),
        titleSmall: GoogleFonts.dmSans(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.1,
        ),
        bodyLarge: GoogleFonts.dmSans(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.15,
        ),
        bodyMedium: GoogleFonts.dmSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.25,
        ),
        bodySmall: GoogleFonts.dmSans(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.4,
        ),
        labelLarge: GoogleFonts.dmSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
        labelMedium: GoogleFonts.dmSans(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.5,
        ),
        labelSmall: GoogleFonts.dmSans(
          fontSize: 11,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.5,
        ),
      );
}
