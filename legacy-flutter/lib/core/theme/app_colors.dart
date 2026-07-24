import 'package:flutter/material.dart';

/// Earth & Clay — Warm, grounded portfolio color palette
/// Terracotta + Olive for a natural developer aesthetic
class AppColors {
  AppColors._();

  // ─── Brand Colors ──────────────────────────────────────────────
  static const Color primary = Color(0xFF8C5A3C); // Terracotta
  static const Color primaryDark = Color(0xFF6E452F); // Deep Clay
  static const Color primaryLight = Color(0xFFB07A57); // Soft Clay
  static const Color secondary = Color(0xFF6B8E23); // Olive Green
  static const Color secondaryDark = Color(0xFF556B1B); // Deep Olive
  static const Color secondaryLight = Color(0xFF8FAF4D); // Light Olive

  // ─── Background & Surface (Dark) ───────────────────────────────
  static const Color backgroundDark = Color(0xFF1C1A17); // Charcoal Brown
  static const Color surfaceDark = Color(0xFF26221D); // Dark Stone
  static const Color surfaceElevatedDark = Color(0xFF2F2A24); // Elevated Stone

  // ─── Background & Surface (Light) ──────────────────────────────
  static const Color backgroundLight = Color(0xFFF4EFE6); // Warm Sand
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color surfaceElevatedLight = Color(0xFFE8E1D6); // Light Sand

  // ─── Text Colors (Dark Theme) ──────────────────────────────────
  static const Color textPrimaryDark = Color(0xFFF5EFE6); // Soft Cream
  static const Color textSecondaryDark = Color(0xFFC2B6A6);
  static const Color textMutedDark = Color(0xFF9A8F82);

  // ─── Text Colors (Light Theme) ─────────────────────────────────
  static const Color textPrimaryLight = Color(0xFF2C241D); // Dark Cocoa
  static const Color textSecondaryLight = Color(0xFF5C5146);
  static const Color textMutedLight = Color(0xFF8C8175);

  // ─── Semantic Colors ───────────────────────────────────────────
  static const Color success = Color(0xFF4F6F52); // Forest Green
  static const Color error = Color(0xFF9C3D3D); // Earthy Red
  static const Color warning = Color(0xFFB8860B); // Mustard
  static const Color info = Color(0xFF3E6B6F); // Muted Teal

  // ─── Border & Divider ──────────────────────────────────────────
  static const Color borderDark = Color(0xFF3A342D);
  static const Color borderLight = Color(0xFFD6CBBF);
  static const Color dividerDark = Color(0xFF3A342D);
  static const Color dividerLight = Color(0xFFD6CBBF);

  // ─── Overlay & Shadow ──────────────────────────────────────────
  static const Color overlay = Color(0x801C1A17);
  static const Color shadowDark = Color(0x40000000);
  static const Color shadowLight = Color(0x1A2C241D);

  // ─── Glassmorphism ─────────────────────────────────────────────
  static const Color glassDark = Color(0x3326221D);
  static const Color glassLight = Color(0x33FFFFFF);
  static const Color glassBorderDark = Color(0x33F5EFE6);
  static const Color glassBorderLight = Color(0x332C241D);

  // ─── Gradients ─────────────────────────────────────────────────
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFF8C5A3C), Color(0xFF6B8E23)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient primaryGradientVertical = LinearGradient(
    colors: [Color(0xFF8C5A3C), Color(0xFF6B8E23)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient subtleGradient = LinearGradient(
    colors: [Color(0xFF8C5A3C), Color(0xFFB07A57)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkBgGradient = LinearGradient(
    colors: [Color(0xFF1C1A17), Color(0xFF26221D)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient cardGradientDark = LinearGradient(
    colors: [Color(0xFF26221D), Color(0xFF2F2A24)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // ─── Material 3 ColorScheme — Dark ─────────────────────────────
  static const ColorScheme darkScheme = ColorScheme(
    brightness: Brightness.dark,
    primary: Color(0xFF8C5A3C),
    onPrimary: Color(0xFFFFFFFF),
    primaryContainer: Color(0xFF6E452F),
    onPrimaryContainer: Color(0xFFF5EFE6),
    secondary: Color(0xFF6B8E23),
    onSecondary: Color(0xFFFFFFFF),
    secondaryContainer: Color(0xFF556B1B),
    onSecondaryContainer: Color(0xFFE6F2D8),
    tertiary: Color(0xFFB07A57),
    onTertiary: Color(0xFF2C241D),
    tertiaryContainer: Color(0xFF8C5A3C),
    onTertiaryContainer: Color(0xFFF5EFE6),
    error: Color(0xFF9C3D3D),
    onError: Color(0xFFFFFFFF),
    errorContainer: Color(0xFF5A1F1F),
    onErrorContainer: Color(0xFFF5D6D6),
    surface: Color(0xFF1C1A17),
    onSurface: Color(0xFFF5EFE6),
    surfaceContainerHighest: Color(0xFF2F2A24),
    onSurfaceVariant: Color(0xFFC2B6A6),
    outline: Color(0xFF9A8F82),
    outlineVariant: Color(0xFF3A342D),
    shadow: Color(0xFF000000),
    scrim: Color(0xFF000000),
    inverseSurface: Color(0xFFF5EFE6),
    onInverseSurface: Color(0xFF1C1A17),
    inversePrimary: Color(0xFFB07A57),
  );

  // ─── Material 3 ColorScheme — Light ────────────────────────────
  static const ColorScheme lightScheme = ColorScheme(
    brightness: Brightness.light,
    primary: Color(0xFF8C5A3C),
    onPrimary: Color(0xFFFFFFFF),
    primaryContainer: Color(0xFFD9C2AF),
    onPrimaryContainer: Color(0xFF2C241D),
    secondary: Color(0xFF6B8E23),
    onSecondary: Color(0xFFFFFFFF),
    secondaryContainer: Color(0xFFE6F2D8),
    onSecondaryContainer: Color(0xFF2E3B12),
    tertiary: Color(0xFF6E452F),
    onTertiary: Color(0xFFFFFFFF),
    tertiaryContainer: Color(0xFFD9C2AF),
    onTertiaryContainer: Color(0xFF2C241D),
    error: Color(0xFF9C3D3D),
    onError: Color(0xFFFFFFFF),
    errorContainer: Color(0xFFF5D6D6),
    onErrorContainer: Color(0xFF5A1F1F),
    surface: Color(0xFFF4EFE6),
    onSurface: Color(0xFF2C241D),
    surfaceContainerHighest: Color(0xFFE8E1D6),
    onSurfaceVariant: Color(0xFF5C5146),
    outline: Color(0xFF8C8175),
    outlineVariant: Color(0xFFD6CBBF),
    shadow: Color(0xFF2C241D),
    scrim: Color(0xFF2C241D),
    inverseSurface: Color(0xFF2C241D),
    onInverseSurface: Color(0xFFF4EFE6),
    inversePrimary: Color(0xFFB07A57),
  );
}
