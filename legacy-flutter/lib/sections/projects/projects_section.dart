import 'package:flutter/material.dart';
import '../../core/constants/app_strings.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../data/project_data.dart';
import '../../widgets/effects/scroll_reveal.dart';
import '../../widgets/section_header.dart';
import 'project_card.dart';

class ProjectsSection extends StatefulWidget {
  const ProjectsSection({super.key});

  @override
  State<ProjectsSection> createState() => _ProjectsSectionState();
}

class _ProjectsSectionState extends State<ProjectsSection> {
  String _selectedCategory = 'All';

  List<ProjectModel> get _filteredProjects {
    if (_selectedCategory == 'All') return ProjectData.projects;
    return ProjectData.projects
        .where((p) => p.category == _selectedCategory)
        .toList();
  }

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
          constraints: const BoxConstraints(maxWidth: AppSpacing.maxContentWidth),
          child: Column(
            children: [
              ScrollReveal(
                child: const SectionHeader(
                  overline: AppStrings.projectsOverline,
                  title: AppStrings.projectsTitle,
                  subtitle: AppStrings.projectsSubtitle,
                ),
              ),
              const SizedBox(height: AppSpacing.xxl),

              // Filter chips
              ScrollReveal(
                delay: const Duration(milliseconds: 200),
                child: _buildFilterBar(isDark),
              ),
              const SizedBox(height: AppSpacing.xxl),

              // Project grid
              _buildProjectGrid(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFilterBar(bool isDark) {
    return Wrap(
      spacing: AppSpacing.s,
      runSpacing: AppSpacing.s,
      alignment: WrapAlignment.center,
      children: ProjectData.categories.map((category) {
        final isSelected = _selectedCategory == category;
        return FilterChip(
          label: Text(category),
          selected: isSelected,
          onSelected: (_) => setState(() => _selectedCategory = category),
          backgroundColor: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
          selectedColor: AppColors.primary.withValues(alpha: 0.2),
          checkmarkColor: AppColors.primary,
          labelStyle: AppFonts.labelMedium.copyWith(
            color: isSelected
                ? AppColors.primary
                : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight),
          ),
          side: BorderSide(
            color: isSelected
                ? AppColors.primary
                : (isDark ? AppColors.borderDark : AppColors.borderLight),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppSpacing.radiusFull),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildProjectGrid(BuildContext context) {
    final crossAxisCount = context.responsive(mobile: 1, tablet: 2, desktop: 3);

    return AnimatedSwitcher(
      duration: AppSpacing.durationNormal,
      child: GridView.builder(
        key: ValueKey(_selectedCategory),
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: crossAxisCount,
          crossAxisSpacing: AppSpacing.l,
          mainAxisSpacing: AppSpacing.l,
          childAspectRatio: context.responsive(
            mobile: 0.85,
            tablet: 0.75,
            desktop: 0.72,
          ),
        ),
        itemCount: _filteredProjects.length,
        itemBuilder: (context, index) {
          return ScrollReveal(
            delay: Duration(milliseconds: 100 * index),
            child: ProjectCard(project: _filteredProjects[index]),
          );
        },
      ),
    );
  }
}
