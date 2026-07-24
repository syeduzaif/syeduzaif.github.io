import 'package:flutter/material.dart';
import 'core/theme/app_spacing.dart';
import 'sections/about/about_section.dart';
import 'sections/contact/contact_section.dart';
import 'sections/experience/experience_section.dart';
import 'sections/footer/footer_section.dart';
import 'sections/github_stats/github_stats_section.dart';
import 'sections/hero/hero_section.dart';
import 'sections/projects/projects_section.dart';
import 'sections/skills/skills_section.dart';
import 'widgets/effects/scroll_progress_indicator.dart';
import 'widgets/navigation/floating_nav_bar.dart';

class PortfolioPage extends StatefulWidget {
  final ValueNotifier<ThemeMode> themeNotifier;

  const PortfolioPage({super.key, required this.themeNotifier});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  final _scrollController = ScrollController();
  final _activeSection = ValueNotifier<int>(0);

  // GlobalKeys for each section to enable scroll-to
  final _sectionKeys = List.generate(6, (_) => GlobalKey());

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    _activeSection.dispose();
    super.dispose();
  }

  void _onScroll() {
    // Determine which section is currently in view
    for (var i = _sectionKeys.length - 1; i >= 0; i--) {
      final key = _sectionKeys[i];
      final context = key.currentContext;
      if (context != null) {
        final box = context.findRenderObject() as RenderBox;
        final position = box.localToGlobal(Offset.zero);
        if (position.dy <= MediaQuery.of(this.context).size.height * 0.5) {
          _activeSection.value = i;
          break;
        }
      }
    }
  }

  void _scrollToSection(int index) {
    final key = _sectionKeys[index];
    final context = key.currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: AppSpacing.durationSlow,
        curve: Curves.easeInOutCubic,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Main scrollable content
          SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                // Hero
                KeyedSubtree(
                  key: _sectionKeys[0],
                  child: HeroSection(
                    onViewWorkPressed: () => _scrollToSection(3),
                  ),
                ),

                // About
                KeyedSubtree(
                  key: _sectionKeys[1],
                  child: const AboutSection(),
                ),

                // Experience
                KeyedSubtree(
                  key: _sectionKeys[2],
                  child: const ExperienceSection(),
                ),

                // Projects
                KeyedSubtree(
                  key: _sectionKeys[3],
                  child: const ProjectsSection(),
                ),

                // Skills
                KeyedSubtree(
                  key: _sectionKeys[4],
                  child: const SkillsSection(),
                ),

                // GitHub Stats
                const GitHubStatsSection(),

                // Contact
                KeyedSubtree(
                  key: _sectionKeys[5],
                  child: const ContactSection(),
                ),

                // Footer
                const FooterSection(),
              ],
            ),
          ),

          // Floating nav bar
          FloatingNavBar(
            activeSection: _activeSection,
            themeNotifier: widget.themeNotifier,
            onNavItemTap: _scrollToSection,
          ),

          // Scroll progress indicator
          ScrollProgressIndicator(scrollController: _scrollController),
        ],
      ),
    );
  }
}
