import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../data/project_data.dart';
import '../../widgets/tech_badge.dart';

class ProjectCard extends StatefulWidget {
  final ProjectModel project;

  const ProjectCard({super.key, required this.project});

  @override
  State<ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<ProjectCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: AppSpacing.durationFast,
        transform: Matrix4.identity()
          ..translate(0.0, _isHovered ? -8.0 : 0.0),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(AppSpacing.radiusL),
          border: Border.all(
            color: _isHovered
                ? AppColors.primary.withValues(alpha: 0.5)
                : (isDark ? AppColors.borderDark : AppColors.borderLight),
          ),
          boxShadow: _isHovered
              ? [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.15),
                    blurRadius: 30,
                    offset: const Offset(0, 10),
                  ),
                ]
              : [],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Project image/icon header
            _buildHeader(isDark),

            // Content
            Padding(
              padding: const EdgeInsets.all(AppSpacing.l),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title + Featured badge
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          widget.project.title,
                          style: AppFonts.h5.copyWith(
                            color: isDark
                                ? AppColors.textPrimaryDark
                                : AppColors.textPrimaryLight,
                          ),
                        ),
                      ),
                      if (widget.project.isFeatured)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: AppSpacing.xs,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            gradient: AppColors.primaryGradient,
                            borderRadius: BorderRadius.circular(AppSpacing.radiusXs),
                          ),
                          child: Text(
                            'Featured',
                            style: AppFonts.labelSmall.copyWith(
                              color: Colors.white,
                              fontSize: 10,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.s),

                  // Description
                  Text(
                    widget.project.description,
                    style: AppFonts.bodySmall.copyWith(
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: AppSpacing.m),

                  // Tech stack badges
                  Wrap(
                    spacing: AppSpacing.xs,
                    runSpacing: AppSpacing.xs,
                    children: widget.project.techStack
                        .map((tech) => TechBadge(label: tech))
                        .toList(),
                  ),
                  const SizedBox(height: AppSpacing.m),

                  // Links row
                  _buildLinksRow(isDark),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(bool isDark) {
    return Container(
      height: 160,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.vertical(
          top: Radius.circular(AppSpacing.radiusL),
        ),
        gradient: LinearGradient(
          colors: [
            AppColors.primary.withValues(alpha: 0.15),
            AppColors.secondary.withValues(alpha: 0.15),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Center(
        child: AnimatedScale(
          scale: _isHovered ? 1.1 : 1.0,
          duration: AppSpacing.durationFast,
          child: Icon(
            widget.project.icon,
            size: 60,
            color: AppColors.primary.withValues(alpha: 0.6),
          ),
        ),
      ),
    );
  }

  Widget _buildLinksRow(bool isDark) {
    return Row(
      children: [
        if (widget.project.githubUrl != null)
          _linkButton(
            FontAwesomeIcons.github,
            'Source',
            widget.project.githubUrl!,
            isDark,
          ),
        if (widget.project.playStoreUrl != null)
          _linkButton(
            FontAwesomeIcons.googlePlay,
            'Play Store',
            widget.project.playStoreUrl!,
            isDark,
          ),
        if (widget.project.liveDemoUrl != null)
          _linkButton(
            Icons.open_in_new_rounded,
            'Demo',
            widget.project.liveDemoUrl!,
            isDark,
          ),
      ],
    );
  }

  Widget _linkButton(IconData icon, String label, String url, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(right: AppSpacing.s),
      child: TextButton.icon(
        onPressed: () => launchUrl(Uri.parse(url)),
        icon: Icon(icon, size: 14),
        label: Text(label, style: AppFonts.labelSmall),
        style: TextButton.styleFrom(
          foregroundColor: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s),
        ),
      ),
    );
  }
}
