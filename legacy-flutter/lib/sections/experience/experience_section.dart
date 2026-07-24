import 'package:flutter/material.dart';
import '../../core/constants/app_strings.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../data/experience_data.dart';
import '../../widgets/effects/scroll_reveal.dart';
import '../../widgets/section_header.dart';

class ExperienceSection extends StatelessWidget {
  const ExperienceSection({super.key});

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
      color: isDark ? AppColors.surfaceDark.withValues(alpha: 0.5) : AppColors.surfaceElevatedLight,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppSpacing.maxContentWidth),
          child: Column(
            children: [
              ScrollReveal(
                child: const SectionHeader(
                  overline: AppStrings.experienceOverline,
                  title: AppStrings.experienceTitle,
                ),
              ),
              SizedBox(
                height: context.responsive(
                  mobile: AppSpacing.xxl,
                  desktop: AppSpacing.huge,
                ),
              ),
              ...ExperienceData.experiences.asMap().entries.map((entry) {
                final index = entry.key;
                final exp = entry.value;
                return ScrollReveal(
                  delay: Duration(milliseconds: 200 * index),
                  slideOffset: Offset(context.isMobile ? 0 : (index.isEven ? -40 : 40), 20),
                  child: _buildTimelineCard(exp, isDark, context, index),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTimelineCard(
    ExperienceModel exp,
    bool isDark,
    BuildContext context,
    int index,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.xxl),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline indicator
          if (!context.isMobile) ...[
            SizedBox(
              width: 60,
              child: Column(
                children: [
                  Container(
                    width: 16,
                    height: 16,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: exp.isCurrent ? AppColors.primary : Colors.transparent,
                      border: Border.all(
                        color: AppColors.primary,
                        width: 2,
                      ),
                    ),
                  ),
                  if (index < ExperienceData.experiences.length - 1)
                    Container(
                      width: 2,
                      height: 200,
                      color: isDark ? AppColors.borderDark : AppColors.borderLight,
                    ),
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.l),
          ],

          // Card
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(AppSpacing.xl),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceLight,
                borderRadius: BorderRadius.circular(AppSpacing.radiusL),
                border: Border.all(
                  color: isDark ? AppColors.borderDark : AppColors.borderLight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header row
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              exp.role,
                              style: AppFonts.h5.copyWith(
                                color: isDark
                                    ? AppColors.textPrimaryDark
                                    : AppColors.textPrimaryLight,
                              ),
                            ),
                            const SizedBox(height: AppSpacing.xxs),
                            Text(
                              exp.company,
                              style: AppFonts.bodyLarge.copyWith(
                                color: AppColors.primary,
                                fontWeight: AppFonts.semiBold,
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (exp.isCurrent)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: AppSpacing.s,
                            vertical: AppSpacing.xxs,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.success.withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(AppSpacing.radiusFull),
                          ),
                          child: Text(
                            'Current',
                            style: AppFonts.labelSmall.copyWith(
                              color: AppColors.success,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.xxs),

                  // Duration
                  Text(
                    exp.duration,
                    style: AppFonts.labelMedium.copyWith(
                      color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.m),

                  // Description
                  Text(
                    exp.description,
                    style: AppFonts.bodyMedium.copyWith(
                      color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.m),

                  // Achievements
                  ...exp.achievements.map((achievement) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: AppSpacing.xs),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(top: 6),
                            child: Container(
                              width: 6,
                              height: 6,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: AppColors.primary,
                              ),
                            ),
                          ),
                          const SizedBox(width: AppSpacing.s),
                          Expanded(
                            child: Text(
                              achievement,
                              style: AppFonts.bodySmall.copyWith(
                                color: isDark
                                    ? AppColors.textSecondaryDark
                                    : AppColors.textSecondaryLight,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
