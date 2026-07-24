class ExperienceModel {
  final String company;
  final String role;
  final String duration;
  final String description;
  final List<String> achievements;
  final bool isCurrent;

  const ExperienceModel({
    required this.company,
    required this.role,
    required this.duration,
    required this.description,
    required this.achievements,
    this.isCurrent = false,
  });
}

/// Experience timeline data
class ExperienceData {
  ExperienceData._();

  static const List<ExperienceModel> experiences = [
    ExperienceModel(
      company: 'SimpliEd',
      role: 'Flutter Developer (Promoted from Intern)',
      duration: 'September 2024 — Present',
      description:
          'Promoted from unpaid intern to full-time Flutter Developer after '
          '9 months by delivering production features for education platform '
          'serving 10,000+ active users across 2 live mobile apps.',
      achievements: [
        'Developed features for LMS app using Flutter/Dart and Stacked architecture, collaborating with 6-10 person team',
        'Integrated Firebase Authentication (Email/Google Sign-In), Firestore, Cloud Messaging, and Crashlytics — maintaining 99%+ crash-free rate',
        'Optimized app performance using Flutter DevTools profiling, reducing initial load time by 45% (3.2s to 1.76s) and app bundle size by 28%',
        'Built responsive cross-platform UI with Material Design ensuring consistent experience across iOS/Android',
        'Managed app store deployment including beta testing via TestFlight and Google Play Internal Testing for 2 live apps',
        'Currently contributing to third education app development while maintaining existing production applications',
      ],
      isCurrent: true,
    ),
  ];
}
