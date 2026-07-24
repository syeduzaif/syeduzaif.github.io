import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/utils/download_helper.dart';

import '../../core/constants/app_strings.dart';
import '../../core/constants/app_urls.dart';
import '../../core/responsive/responsive.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_fonts.dart';
import '../../core/theme/app_spacing.dart';
import '../../widgets/buttons/primary_button.dart';
import '../../widgets/effects/particle_background.dart';

class HeroSection extends StatefulWidget {
  final VoidCallback onViewWorkPressed;

  const HeroSection({super.key, required this.onViewWorkPressed});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection>
    with TickerProviderStateMixin {
  late final List<AnimationController> _controllers;
  late final List<Animation<double>> _fadeAnimations;
  late final List<Animation<Offset>> _slideAnimations;

  @override
  void initState() {
    super.initState();
    // Create staggered animations for each element
    _controllers = List.generate(5, (i) {
      return AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 600),
      );
    });

    _fadeAnimations = _controllers.map((c) {
      return CurvedAnimation(parent: c, curve: Curves.easeOut);
    }).toList();

    _slideAnimations = _controllers.map((c) {
      return Tween<Offset>(
        begin: const Offset(0, 30),
        end: Offset.zero,
      ).animate(CurvedAnimation(parent: c, curve: Curves.easeOutCubic));
    }).toList();

    // Stagger the animations
    _startStaggeredAnimations();
  }

  void _startStaggeredAnimations() async {
    for (var i = 0; i < _controllers.length; i++) {
      await Future.delayed(const Duration(milliseconds: 200));
      if (mounted) _controllers[i].forward();
    }
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SizedBox(
      height: context.screenHeight,
      child: Stack(
        children: [
          // Particle background
          const Positioned.fill(child: ParticleBackground()),

          // Content
          Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(
                maxWidth: AppSpacing.maxContentWidth,
              ),
              child: Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: context.responsive(
                    mobile: AppSpacing.sectionHorizontalMobile,
                    desktop: AppSpacing.sectionHorizontal,
                  ),
                ),
                child: context.isMobile
                    ? _buildMobile(isDark)
                    : _buildDesktop(isDark),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDesktop(bool isDark) {
    return Row(
      children: [
        // Left: Text content
        Expanded(child: _buildTextContent(isDark)),
        const SizedBox(width: AppSpacing.huge),
        // Right: Avatar
        Expanded(child: Center(child: _buildAvatar(isDark))),
      ],
    );
  }

  Widget _buildMobile(bool isDark) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [_buildTextContent(isDark)],
    );
  }

  Widget _buildTextContent(bool isDark) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Greeting
        _animatedItem(
          0,
          Text(
            AppStrings.heroGreeting,
            style: AppFonts.bodyLarge.copyWith(color: AppColors.secondary),
          ),
        ),
        const SizedBox(height: AppSpacing.xs),

        // Name
        _animatedItem(
          1,
          Text(
            AppStrings.name,
            style: (context.isMobile ? AppFonts.h1 : AppFonts.heroTitle)
                .copyWith(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
          ),
        ),
        const SizedBox(height: AppSpacing.m),

        // Typewriter subtitle
        _animatedItem(
          2,
          SizedBox(
            height: 40,
            child: AnimatedTextKit(
              repeatForever: true,
              animatedTexts: AppStrings.heroTypewriterTexts.map((text) {
                return TypewriterAnimatedText(
                  text,
                  textStyle: AppFonts.h4.copyWith(color: AppColors.primary),
                  speed: const Duration(milliseconds: 80),
                );
              }).toList(),
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.l),

        // Description
        _animatedItem(
          3,
          Text(
            AppStrings.heroDescription,
            style: AppFonts.bodyLarge.copyWith(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.xxl),

        // CTA Buttons
        _animatedItem(
          4,
          Wrap(
            spacing: AppSpacing.m,
            runSpacing: AppSpacing.m,
            children: [
              PrimaryButton(
                text: AppStrings.ctaViewWork,
                icon: Icons.arrow_downward_rounded,
                onPressed: widget.onViewWorkPressed,
              ),
              PrimaryButton(
                text: AppStrings.ctaDownloadResume,
                icon: Icons.download_rounded,
                isOutlined: true,
                onPressed: () {
                  downloadAsset(
                    AppUrls.resumeAssetPath,
                    AppUrls.resumeFileName,
                  );
                },
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xxl),

        // Social icons
        _animatedItem(
          4,
          Row(
            children: [
              _socialIcon(FontAwesomeIcons.github, AppUrls.github),
              const SizedBox(width: AppSpacing.m),
              _socialIcon(FontAwesomeIcons.linkedin, AppUrls.linkedin),
              const SizedBox(width: AppSpacing.m),
              _socialIcon(Icons.email_outlined, AppUrls.email),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildAvatar(bool isDark) {
    return Container(
      width: 350,
      height: 350,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: LinearGradient(
          colors: [
            AppColors.primary.withValues(alpha: 0.3),
            AppColors.secondary.withValues(alpha: 0.3),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.2),
            blurRadius: 40,
            spreadRadius: 5,
          ),
          BoxShadow(
            color: AppColors.secondary.withValues(alpha: 0.1),
            blurRadius: 60,
            spreadRadius: 10,
          ),
        ],
      ),
      padding: const EdgeInsets.all(4),
      child: ClipOval(
        child: Image.asset(
          'assets/images/profile.png',
          width: 342,
          height: 342,
          fit: BoxFit.cover,
          alignment: Alignment.topCenter,
        ),
      ),
    );
  }

  Widget _animatedItem(int index, Widget child) {
    return AnimatedBuilder(
      animation: _controllers[index],
      builder: (context, ch) {
        return Transform.translate(
          offset: _slideAnimations[index].value,
          child: Opacity(opacity: _fadeAnimations[index].value, child: ch),
        );
      },
      child: child,
    );
  }

  Widget _socialIcon(IconData icon, String url) {
    return IconButton(
      onPressed: () => launchUrl(Uri.parse(url)),
      icon: Icon(icon, size: 22),
      color: AppColors.textSecondaryDark,
      hoverColor: AppColors.primary.withValues(alpha: 0.1),
      tooltip: url,
    );
  }
}
