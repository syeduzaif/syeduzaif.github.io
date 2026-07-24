import 'package:flutter/material.dart';
import '../../core/constants/app_strings.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../data/skill_data.dart';
import '../../widgets/effects/scroll_reveal.dart';
import '../../widgets/section_header.dart';
import 'package:visibility_detector/visibility_detector.dart';

class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final crossAxisCount = context.responsive(mobile: 1, tablet: 2, desktop: 2);

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
                  overline: AppStrings.skillsOverline,
                  title: AppStrings.skillsTitle,
                ),
              ),
              SizedBox(
                height: context.responsive(
                  mobile: AppSpacing.xxl,
                  desktop: AppSpacing.huge,
                ),
              ),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: AppSpacing.l,
                  mainAxisSpacing: AppSpacing.l,
                  childAspectRatio: context.responsive(
                    mobile: 1.2,
                    tablet: 1.3,
                    desktop: 1.6,
                  ),
                ),
                itemCount: SkillData.categories.length,
                itemBuilder: (context, index) {
                  return ScrollReveal(
                    delay: Duration(milliseconds: 150 * index),
                    child: _SkillCategoryCard(
                      category: SkillData.categories[index],
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SkillCategoryCard extends StatelessWidget {
  final SkillCategoryModel category;

  const _SkillCategoryCard({required this.category});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
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
          // Category header
          Row(
            children: [
              Icon(category.icon, color: AppColors.primary, size: 24),
              const SizedBox(width: AppSpacing.s),
              Text(
                category.title,
                style: AppFonts.h6.copyWith(
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.l),

          // Skills list with progress bars
          ...category.skills.map((skill) => _SkillProgressBar(skill: skill)),
        ],
      ),
    );
  }
}

class _SkillProgressBar extends StatefulWidget {
  final SkillModel skill;

  const _SkillProgressBar({required this.skill});

  @override
  State<_SkillProgressBar> createState() => _SkillProgressBarState();
}

class _SkillProgressBarState extends State<_SkillProgressBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;
  bool _hasAnimated = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );
    _animation = Tween<double>(begin: 0, end: widget.skill.proficiency)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return VisibilityDetector(
      key: Key('skill-${widget.skill.name}'),
      onVisibilityChanged: (info) {
        if (!_hasAnimated && info.visibleFraction > 0.3) {
          _hasAnimated = true;
          _controller.forward();
        }
      },
      child: Padding(
        padding: const EdgeInsets.only(bottom: AppSpacing.m),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(
                      widget.skill.icon,
                      size: 14,
                      color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
                    ),
                    const SizedBox(width: AppSpacing.xs),
                    Text(
                      widget.skill.name,
                      style: AppFonts.labelMedium.copyWith(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                  ],
                ),
                AnimatedBuilder(
                  animation: _animation,
                  builder: (context, _) {
                    return Text(
                      '${(_animation.value * 100).round()}%',
                      style: AppFonts.labelSmall.copyWith(
                        color: AppColors.primary,
                      ),
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.xxs),
            // Progress bar
            SizedBox(
              height: 6,
              child: AnimatedBuilder(
                animation: _animation,
                builder: (context, _) {
                  return ClipRRect(
                    borderRadius: BorderRadius.circular(3),
                    child: LinearProgressIndicator(
                      value: _animation.value,
                      backgroundColor: isDark
                          ? AppColors.borderDark
                          : AppColors.borderLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        AppColors.primary,
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
