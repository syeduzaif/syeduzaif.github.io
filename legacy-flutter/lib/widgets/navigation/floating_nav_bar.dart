import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/constants/app_strings.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../theme_toggle.dart';

class FloatingNavBar extends StatelessWidget {
  final ValueNotifier<int> activeSection;
  final ValueNotifier<ThemeMode> themeNotifier;
  final void Function(int index) onNavItemTap;

  const FloatingNavBar({
    super.key,
    required this.activeSection,
    required this.themeNotifier,
    required this.onNavItemTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Positioned(
      top: AppSpacing.m,
      left: AppSpacing.m,
      right: AppSpacing.m,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppSpacing.maxContentWidth),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(AppSpacing.radiusL),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
              child: Container(
                height: AppSpacing.navBarHeight,
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.l),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.glassDark : AppColors.glassLight,
                  borderRadius: BorderRadius.circular(AppSpacing.radiusL),
                  border: Border.all(
                    color: isDark ? AppColors.glassBorderDark : AppColors.glassBorderLight,
                  ),
                ),
                child: context.isMobile
                    ? _buildMobileNav(isDark, context)
                    : _buildDesktopNav(isDark),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopNav(bool isDark) {
    return Row(
      children: [
        // Logo/Name
        Text(
          'SU',
          style: AppFonts.h5.copyWith(
            color: AppColors.primary,
            fontWeight: AppFonts.bold,
          ),
        ),
        const Spacer(),

        // Nav items
        ValueListenableBuilder<int>(
          valueListenable: activeSection,
          builder: (context, active, _) {
            return Row(
              children: AppStrings.navItems.asMap().entries.map((entry) {
                final index = entry.key;
                final label = entry.value;
                final isActive = index == active;

                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xxs),
                  child: TextButton(
                    onPressed: () => onNavItemTap(index),
                    style: TextButton.styleFrom(
                      foregroundColor: isActive
                          ? AppColors.primary
                          : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight),
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.s,
                        vertical: AppSpacing.xs,
                      ),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          label,
                          style: AppFonts.labelMedium.copyWith(
                            color: isActive
                                ? AppColors.primary
                                : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight),
                            fontWeight: isActive ? AppFonts.semiBold : AppFonts.regular,
                          ),
                        ),
                        const SizedBox(height: 2),
                        AnimatedContainer(
                          duration: AppSpacing.durationFast,
                          width: isActive ? 20 : 0,
                          height: 2,
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(1),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            );
          },
        ),
        const SizedBox(width: AppSpacing.s),
        ThemeToggle(themeNotifier: themeNotifier),
      ],
    );
  }

  Widget _buildMobileNav(bool isDark, BuildContext context) {
    return Row(
      children: [
        Text(
          'SU',
          style: AppFonts.h5.copyWith(
            color: AppColors.primary,
            fontWeight: AppFonts.bold,
          ),
        ),
        const Spacer(),
        ThemeToggle(themeNotifier: themeNotifier),
        IconButton(
          onPressed: () => _showMobileMenu(context, isDark),
          icon: const Icon(Icons.menu_rounded),
          color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        ),
      ],
    );
  }

  void _showMobileMenu(BuildContext context, bool isDark) {
    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(AppSpacing.radiusXl)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.l),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.borderDark : AppColors.borderLight,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                const SizedBox(height: AppSpacing.l),
                ...AppStrings.navItems.asMap().entries.map((entry) {
                  return ListTile(
                    title: Text(
                      entry.value,
                      style: AppFonts.bodyLarge.copyWith(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    onTap: () {
                      Navigator.pop(ctx);
                      onNavItemTap(entry.key);
                    },
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }
}
