import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
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

class ContactSection extends StatefulWidget {
  const ContactSection({super.key});

  @override
  State<ContactSection> createState() => _ContactSectionState();
}

class _ContactSectionState extends State<ContactSection> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _messageController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _sendMessage() {
    // Open email with pre-filled fields as a simple approach
    final subject = Uri.encodeComponent('Portfolio Contact from ${_nameController.text}');
    final body = Uri.encodeComponent(
      'Name: ${_nameController.text}\n'
      'Email: ${_emailController.text}\n\n'
      '${_messageController.text}',
    );
    launchUrl(Uri.parse('mailto:${AppStrings.email}?subject=$subject&body=$body'));
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
      color: isDark ? AppColors.surfaceDark.withValues(alpha: 0.5) : AppColors.surfaceElevatedLight,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppSpacing.maxContentWidth),
          child: Column(
            children: [
              ScrollReveal(
                child: const SectionHeader(
                  overline: AppStrings.contactOverline,
                  title: AppStrings.contactTitle,
                  subtitle: AppStrings.contactSubtitle,
                ),
              ),
              SizedBox(
                height: context.responsive(
                  mobile: AppSpacing.xxl,
                  desktop: AppSpacing.huge,
                ),
              ),
              context.isMobile
                  ? _buildMobileLayout(isDark)
                  : _buildDesktopLayout(isDark),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopLayout(bool isDark) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: ScrollReveal(
            slideOffset: const Offset(-40, 0),
            child: _buildContactInfo(isDark),
          ),
        ),
        const SizedBox(width: AppSpacing.huge),
        Expanded(
          child: ScrollReveal(
            slideOffset: const Offset(40, 0),
            delay: const Duration(milliseconds: 200),
            child: _buildContactForm(isDark),
          ),
        ),
      ],
    );
  }

  Widget _buildMobileLayout(bool isDark) {
    return Column(
      children: [
        ScrollReveal(child: _buildContactInfo(isDark)),
        const SizedBox(height: AppSpacing.xxl),
        ScrollReveal(
          delay: const Duration(milliseconds: 200),
          child: _buildContactForm(isDark),
        ),
      ],
    );
  }

  Widget _buildContactInfo(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Let\'s work together',
          style: AppFonts.h4.copyWith(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.m),
        Text(
          'I\'m always open to discussing new projects, creative ideas, '
          'or opportunities to be part of your vision.',
          style: AppFonts.bodyMedium.copyWith(
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.xxl),
        _contactLink(
          Icons.email_outlined,
          AppStrings.email,
          AppUrls.email,
          isDark,
        ),
        const SizedBox(height: AppSpacing.m),
        _contactLink(
          FontAwesomeIcons.linkedin,
          'LinkedIn',
          AppUrls.linkedin,
          isDark,
        ),
        const SizedBox(height: AppSpacing.m),
        _contactLink(
          FontAwesomeIcons.github,
          'GitHub',
          AppUrls.github,
          isDark,
        ),
        const SizedBox(height: AppSpacing.m),
        _contactLink(
          Icons.location_on_outlined,
          AppStrings.location,
          null,
          isDark,
        ),
      ],
    );
  }

  Widget _contactLink(IconData icon, String label, String? url, bool isDark) {
    final content = Row(
      children: [
        Icon(icon, size: 20, color: AppColors.primary),
        const SizedBox(width: AppSpacing.s),
        Text(
          label,
          style: AppFonts.bodyMedium.copyWith(
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
        ),
      ],
    );

    if (url != null) {
      return InkWell(
        onTap: () => launchUrl(Uri.parse(url)),
        child: content,
      );
    }
    return content;
  }

  Widget _buildContactForm(bool isDark) {
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
        children: [
          TextField(
            controller: _nameController,
            decoration: const InputDecoration(
              hintText: AppStrings.contactNameHint,
            ),
          ),
          const SizedBox(height: AppSpacing.m),
          TextField(
            controller: _emailController,
            decoration: const InputDecoration(
              hintText: AppStrings.contactEmailHint,
            ),
            keyboardType: TextInputType.emailAddress,
          ),
          const SizedBox(height: AppSpacing.m),
          TextField(
            controller: _messageController,
            decoration: const InputDecoration(
              hintText: AppStrings.contactMessageHint,
            ),
            maxLines: 5,
          ),
          const SizedBox(height: AppSpacing.xl),
          SizedBox(
            width: double.infinity,
            child: PrimaryButton(
              text: AppStrings.contactSend,
              icon: Icons.send_rounded,
              onPressed: _sendMessage,
            ),
          ),
        ],
      ),
    );
  }
}
