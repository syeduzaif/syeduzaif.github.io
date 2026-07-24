import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SkillModel {
  final String name;
  final IconData icon;
  final double proficiency; // 0.0 to 1.0

  const SkillModel({
    required this.name,
    required this.icon,
    required this.proficiency,
  });
}

class SkillCategoryModel {
  final String title;
  final IconData icon;
  final List<SkillModel> skills;

  const SkillCategoryModel({
    required this.title,
    required this.icon,
    required this.skills,
  });
}

/// Skills grouped by category — based on resume
class SkillData {
  SkillData._();

  static const List<SkillCategoryModel> categories = [
    SkillCategoryModel(
      title: 'Languages & Frameworks',
      icon: Icons.code_rounded,
      skills: [
        SkillModel(name: 'Dart', icon: FontAwesomeIcons.bullseye, proficiency: 0.95),
        SkillModel(name: 'Flutter SDK', icon: FontAwesomeIcons.mobile, proficiency: 0.95),
        SkillModel(name: 'JavaScript', icon: FontAwesomeIcons.js, proficiency: 0.55),
        SkillModel(name: 'Stacked Architecture', icon: Icons.view_column_rounded, proficiency: 0.90),
      ],
    ),
    SkillCategoryModel(
      title: 'Mobile Development',
      icon: Icons.phone_android_rounded,
      skills: [
        SkillModel(name: 'Cross-Platform', icon: Icons.devices_rounded, proficiency: 0.90),
        SkillModel(name: 'Material Design', icon: Icons.design_services_rounded, proficiency: 0.90),
        SkillModel(name: 'Responsive UI', icon: Icons.aspect_ratio_rounded, proficiency: 0.85),
        SkillModel(name: 'Provider', icon: Icons.sync_rounded, proficiency: 0.80),
      ],
    ),
    SkillCategoryModel(
      title: 'Backend & Tools',
      icon: Icons.build_rounded,
      skills: [
        SkillModel(name: 'Firebase', icon: FontAwesomeIcons.fire, proficiency: 0.90),
        SkillModel(name: 'REST APIs', icon: Icons.api_rounded, proficiency: 0.85),
        SkillModel(name: 'Git & GitHub', icon: FontAwesomeIcons.github, proficiency: 0.85),
        SkillModel(name: 'Postman', icon: Icons.send_rounded, proficiency: 0.80),
      ],
    ),
    SkillCategoryModel(
      title: 'Deployment',
      icon: Icons.rocket_launch_rounded,
      skills: [
        SkillModel(name: 'Google Play Store', icon: FontAwesomeIcons.googlePlay, proficiency: 0.90),
        SkillModel(name: 'Apple App Store', icon: FontAwesomeIcons.apple, proficiency: 0.85),
        SkillModel(name: 'TestFlight', icon: Icons.flight_rounded, proficiency: 0.85),
        SkillModel(name: 'App Release Mgmt', icon: Icons.published_with_changes_rounded, proficiency: 0.80),
      ],
    ),
  ];
}
