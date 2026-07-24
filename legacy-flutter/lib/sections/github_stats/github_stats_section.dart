import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../core/constants/app_strings.dart';
import '../../core/constants/app_urls.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../widgets/buttons/primary_button.dart';
import '../../widgets/effects/scroll_reveal.dart';
import '../../widgets/section_header.dart';
import '../../widgets/web_image.dart';

class GitHubStatsSection extends StatelessWidget {
  const GitHubStatsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: EdgeInsets.symmetric(
        vertical: context.responsive(
          mobile: AppSpacing.sectionVerticalMobile,
          desktop: AppSpacing.sectionVertical,
        ),
        horizontal: context.responsive(
          mobile: AppSpacing.sectionHorizontalMobile,
          desktop: AppSpacing.sectionHorizontal,
        ),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            maxWidth: AppSpacing.maxContentWidth,
          ),
          child: Column(
            children: [
              ScrollReveal(
                child: const SectionHeader(
                  overline: AppStrings.githubOverline,
                  title: AppStrings.githubTitle,
                ),
              ),
              const SizedBox(height: AppSpacing.huge),

              // Top row: GitHub Stats + Streak
              ScrollReveal(
                delay: const Duration(milliseconds: 200),
                child: Wrap(
                  spacing: AppSpacing.l,
                  runSpacing: AppSpacing.l,
                  alignment: WrapAlignment.center,
                  children: [
                    _buildGitHubOverviewCard(isDark, context),
                    _buildStreakCard(isDark, context),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.l),

              // Languages card
              ScrollReveal(
                delay: const Duration(milliseconds: 400),
                child: _buildTopLanguagesCard(isDark, context),
              ),
              const SizedBox(height: AppSpacing.xxl),

              // CTA
              ScrollReveal(
                delay: const Duration(milliseconds: 500),
                child: PrimaryButton(
                  text: AppStrings.githubCta,
                  icon: Icons.open_in_new_rounded,
                  onPressed: () => launchUrl(Uri.parse(AppUrls.github)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// Built-in GitHub overview card showing key stats
  Widget _buildGitHubOverviewCard(bool isDark, BuildContext context) {
    final width = context.responsive(
      mobile: context.screenWidth - 32,
      desktop: 495.0,
    );

    return Container(
      width: width,
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.surfaceElevatedDark
            : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusM),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.code_rounded, color: AppColors.primary, size: 22),
              const SizedBox(width: AppSpacing.s),
              Text(
                'syeduzaif\'s GitHub Stats',
                style: AppFonts.h5.copyWith(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.l),

          // Stats grid
          Wrap(
            spacing: AppSpacing.l,
            runSpacing: AppSpacing.m,
            children: [
              _statItem(Icons.star_rounded, 'Stars Earned', '12', isDark),
              _statItem(Icons.commit_rounded, 'Total Commits', '76+', isDark),
              _statItem(Icons.merge_rounded, 'PRs Merged', '8', isDark),
              _statItem(Icons.bug_report_rounded, 'Issues', '5', isDark),
              _statItem(Icons.people_rounded, 'Contributed To', '4', isDark),
            ],
          ),
          const SizedBox(height: AppSpacing.l),

          // Contribution bar
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Contribution Activity',
                style: AppFonts.labelSmall.copyWith(
                  color: isDark
                      ? AppColors.textMutedDark
                      : AppColors.textMutedLight,
                ),
              ),
              const SizedBox(height: AppSpacing.xs),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: 0.68,
                  minHeight: 8,
                  backgroundColor: isDark
                      ? AppColors.borderDark
                      : AppColors.borderLight,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// Streak stats card - using the working WebImage for the streak API
  Widget _buildStreakCard(bool isDark, BuildContext context) {
    final width = context.responsive(
      mobile: context.screenWidth - 32,
      desktop: 495.0,
    );

    return Container(
      width: width,
      height: 195,
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.surfaceElevatedDark
            : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusM),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: WebImage(url: AppUrls.githubStreak, width: width, height: 195),
    );
  }

  /// Built-in Top Languages card
  Widget _buildTopLanguagesCard(bool isDark, BuildContext context) {
    final width = context.responsive(
      mobile: context.screenWidth - 32,
      desktop: 495.0,
    );

    final languages = [
      _LanguageItem('Dart', 0.72, const Color(0xFF00B4AB)),
      _LanguageItem('JavaScript', 0.12, const Color(0xFFF1E05A)),
      _LanguageItem('HTML', 0.06, const Color(0xFFE34C26)),
      _LanguageItem('Swift', 0.05, const Color(0xFFFFAC45)),
      _LanguageItem('CSS', 0.03, const Color(0xFF563D7C)),
      _LanguageItem('Other', 0.02, const Color(0xFF8C8C8C)),
    ];

    return Container(
      width: width,
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.surfaceElevatedDark
            : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusM),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.pie_chart_rounded, color: AppColors.primary, size: 22),
              const SizedBox(width: AppSpacing.s),
              Text(
                'Most Used Languages',
                style: AppFonts.h5.copyWith(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.l),

          // Language bar
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: SizedBox(
              height: 10,
              child: Row(
                children: languages.map((lang) {
                  return Expanded(
                    flex: (lang.percentage * 100).toInt(),
                    child: Container(color: lang.color),
                  );
                }).toList(),
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.m),

          // Language list
          Wrap(
            spacing: AppSpacing.l,
            runSpacing: AppSpacing.s,
            children: languages.map((lang) {
              return Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 10,
                    height: 10,
                    decoration: BoxDecoration(
                      color: lang.color,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.xs),
                  Text(
                    '${lang.name} ${(lang.percentage * 100).toStringAsFixed(1)}%',
                    style: AppFonts.bodySmall.copyWith(
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                  ),
                ],
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _statItem(IconData icon, String label, String value, bool isDark) {
    return SizedBox(
      width: 140,
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.secondary),
          const SizedBox(width: AppSpacing.xs),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                value,
                style: AppFonts.h5.copyWith(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              Text(
                label,
                style: AppFonts.labelSmall.copyWith(
                  color: isDark
                      ? AppColors.textMutedDark
                      : AppColors.textMutedLight,
                  fontSize: 10,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _LanguageItem {
  final String name;
  final double percentage;
  final Color color;

  const _LanguageItem(this.name, this.percentage, this.color);
}
