import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

/// Thin gradient progress bar at the top of the page
class ScrollProgressIndicator extends StatelessWidget {
  final ScrollController scrollController;

  const ScrollProgressIndicator({super.key, required this.scrollController});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: scrollController,
      builder: (context, _) {
        double progress = 0;
        if (scrollController.hasClients) {
          final maxExtent = scrollController.position.hasContentDimensions
              ? scrollController.position.maxScrollExtent
              : 0.0;
          if (maxExtent > 0) {
            progress = scrollController.offset / maxExtent;
          }
        }
        return Positioned(
          top: 0,
          left: 0,
          right: 0,
          child: SizedBox(
            height: 3,
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: progress.clamp(0.0, 1.0),
              child: Container(
                decoration: const BoxDecoration(
                  gradient: AppColors.primaryGradient,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
