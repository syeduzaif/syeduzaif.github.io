import 'package:flutter/material.dart';

class ProjectModel {
  final String title;
  final String description;
  final List<String> techStack;
  final String category;
  final String? githubUrl;
  final String? playStoreUrl;
  final String? liveDemoUrl;
  final IconData icon;
  final bool isFeatured;

  const ProjectModel({
    required this.title,
    required this.description,
    required this.techStack,
    required this.category,
    this.githubUrl,
    this.playStoreUrl,
    this.liveDemoUrl,
    required this.icon,
    this.isFeatured = false,
  });
}

/// All portfolio projects — based on real GitHub repos and resume
class ProjectData {
  ProjectData._();

  static const List<String> categories = [
    'All',
    'Flutter',
    'Open Source',
  ];

  static const List<ProjectModel> projects = [
    // ─── Production Work ─────────────────────────────────────────
    ProjectModel(
      title: 'SimpliEd - LMS Platform',
      description:
          'Production education platform serving 10,000+ active users across '
          '2 live apps on Play Store and App Store. Reduced load time by 45% '
          '(3.2s to 1.76s) and app bundle size by 28%. Maintained 99%+ crash-free rate.',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Stacked', 'REST APIs'],
      category: 'Flutter',
      isFeatured: true,
      icon: Icons.school_rounded,
    ),

    // ─── Personal Projects ───────────────────────────────────────
    ProjectModel(
      title: 'Budget Buddy',
      description:
          'Expense tracking app with Clean Architecture, Firebase Auth/Firestore, '
          'and CI/CD pipeline using GitHub Actions. Category-based budgeting '
          'with offline-first design using Hive local storage.',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Hive', 'GetX', 'GitHub Actions'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/Budget-buddy',
      isFeatured: true,
      icon: Icons.account_balance_wallet_rounded,
    ),
    ProjectModel(
      title: 'Stupid Alarm',
      description:
          'Alarm clock app that prevents snoozing until the user physically '
          'sits up. Built with Stacked architecture and featured in a YouTube series.',
      techStack: ['Flutter', 'Dart', 'Stacked'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/stupid_alarm_flutter',
      icon: Icons.alarm_rounded,
    ),
    ProjectModel(
      title: 'Quiz Genius',
      description:
          'Interactive quiz app with Firebase integration and real-time '
          'feedback. Dynamic question loading and score tracking.',
      techStack: ['Flutter', 'Dart', 'Firebase'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/Quiz-Genius',
      icon: Icons.quiz_rounded,
    ),
    ProjectModel(
      title: 'Chess Timer',
      description:
          'Modern, intuitive chess game timer with clean UI. '
          'Customizable time controls for different game formats.',
      techStack: ['Flutter', 'Dart'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/Chess_Timer',
      icon: Icons.timer_rounded,
    ),
    ProjectModel(
      title: 'Shopping App',
      description:
          'E-commerce mobile application with product browsing, '
          'cart management, and checkout flow.',
      techStack: ['Flutter', 'Dart'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/Shopping_app',
      icon: Icons.shopping_cart_rounded,
    ),
    ProjectModel(
      title: 'Flutter Animations',
      description:
          '11+ unique animation examples showcasing Flutter\'s animation '
          'system. A learning resource for complex UI animations.',
      techStack: ['Flutter', 'Dart', 'Animations'],
      category: 'Flutter',
      githubUrl: 'https://github.com/syeduzaif/Flutter-Animations',
      icon: Icons.animation_rounded,
    ),

    // ─── Open Source Contributions ────────────────────────────────
    ProjectModel(
      title: 'Hacktoberfest 2024',
      description:
          'Contributed 8 pull requests to open-source Flutter packages '
          'including documentation improvements and bug fixes. '
          'Earned Pull Shark badge on GitHub.',
      techStack: ['Flutter', 'Dart', 'Open Source'],
      category: 'Open Source',
      githubUrl: 'https://github.com/syeduzaif',
      isFeatured: true,
      icon: Icons.code_rounded,
    ),
  ];
}
