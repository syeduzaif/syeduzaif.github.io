import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/constants/app_strings.dart';
import '../../core/constants/app_urls.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';

class FooterSection extends StatelessWidget {
  const FooterSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final year = DateTime.now().year;

    return Container(
      padding: const EdgeInsets.symmetric(
        vertical: AppSpacing.xxl,
        horizontal: AppSpacing.sectionHorizontal,
      ),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
      ),
      child: Column(
        children: [
          // Social icons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _socialIcon(FontAwesomeIcons.github, AppUrls.github),
              const SizedBox(width: AppSpacing.l),
              _socialIcon(FontAwesomeIcons.linkedin, AppUrls.linkedin),
              const SizedBox(width: AppSpacing.l),
              _socialIcon(Icons.email_outlined, AppUrls.email),
            ],
          ),
          const SizedBox(height: AppSpacing.l),

          // Built with
          Text(
            AppStrings.footerBuiltWith,
            style: AppFonts.bodySmall.copyWith(
              color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
            ),
          ),
          const SizedBox(height: AppSpacing.xxs),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                AppStrings.footerFlutter,
                style: AppFonts.bodySmall.copyWith(
                  color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
                ),
              ),
              const SizedBox(width: 4),
              const Icon(Icons.favorite, size: 14, color: AppColors.primary),
            ],
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            '\u00A9 $year ${AppStrings.name}. All rights reserved.',
            style: AppFonts.caption.copyWith(
              color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _socialIcon(IconData icon, String url) {
    return IconButton(
      onPressed: () => launchUrl(Uri.parse(url)),
      icon: Icon(icon, size: 20),
      color: AppColors.textMutedDark,
      hoverColor: AppColors.primary.withValues(alpha: 0.1),
    );
  }
}
