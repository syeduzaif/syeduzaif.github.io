import 'package:flutter/material.dart';
import '../core/theme/app_colors.dart';

/// Animated dark/light mode toggle
class ThemeToggle extends StatelessWidget {
  final ValueNotifier<ThemeMode> themeNotifier;

  const ThemeToggle({super.key, required this.themeNotifier});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeNotifier,
      builder: (context, mode, _) {
        final isDark = mode == ThemeMode.dark;
        return IconButton(
          onPressed: () {
            themeNotifier.value = isDark ? ThemeMode.light : ThemeMode.dark;
          },
          icon: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            transitionBuilder: (child, animation) => RotationTransition(
              turns: animation,
              child: FadeTransition(opacity: animation, child: child),
            ),
            child: Icon(
              isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              key: ValueKey(isDark),
              color: isDark ? AppColors.secondary : AppColors.primary,
            ),
          ),
          tooltip: isDark ? 'Light mode' : 'Dark mode',
        );
      },
    );
  }
}
