import 'dart:math';
import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

/// Animated particle canvas with connecting lines
class ParticleBackground extends StatefulWidget {
  final int particleCount;

  const ParticleBackground({super.key, this.particleCount = 50});

  @override
  State<ParticleBackground> createState() => _ParticleBackgroundState();
}

class _ParticleBackgroundState extends State<ParticleBackground>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late List<_Particle> _particles;
  final _random = Random();

  @override
  void initState() {
    super.initState();
    _particles = List.generate(widget.particleCount, (_) => _createParticle());
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat();
  }

  _Particle _createParticle() {
    return _Particle(
      x: _random.nextDouble(),
      y: _random.nextDouble(),
      vx: (_random.nextDouble() - 0.5) * 0.3,
      vy: (_random.nextDouble() - 0.5) * 0.3,
      radius: _random.nextDouble() * 2 + 1,
      opacity: _random.nextDouble() * 0.5 + 0.1,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          painter: _ParticlePainter(
            particles: _particles,
            isDark: Theme.of(context).brightness == Brightness.dark,
          ),
          size: Size.infinite,
        );
      },
    );
  }
}

class _Particle {
  double x, y, vx, vy, radius, opacity;

  _Particle({
    required this.x,
    required this.y,
    required this.vx,
    required this.vy,
    required this.radius,
    required this.opacity,
  });
}

class _ParticlePainter extends CustomPainter {
  final List<_Particle> particles;
  final bool isDark;
  static const double connectionDistance = 0.12;

  _ParticlePainter({required this.particles, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final dotColor = isDark ? AppColors.primary : AppColors.primaryDark;
    final lineColor = isDark ? AppColors.secondary : AppColors.primary;

    for (final p in particles) {
      // Update position
      p.x += p.vx / size.width;
      p.y += p.vy / size.height;

      // Wrap around edges
      if (p.x < 0) p.x = 1.0;
      if (p.x > 1) p.x = 0.0;
      if (p.y < 0) p.y = 1.0;
      if (p.y > 1) p.y = 0.0;

      // Draw dot
      canvas.drawCircle(
        Offset(p.x * size.width, p.y * size.height),
        p.radius,
        Paint()..color = dotColor.withValues(alpha: p.opacity),
      );
    }

    // Draw connecting lines between nearby particles
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        final dx = particles[i].x - particles[j].x;
        final dy = particles[i].y - particles[j].y;
        final dist = sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          final opacity = (1 - dist / connectionDistance) * 0.15;
          canvas.drawLine(
            Offset(particles[i].x * size.width, particles[i].y * size.height),
            Offset(particles[j].x * size.width, particles[j].y * size.height),
            Paint()
              ..color = lineColor.withValues(alpha: opacity)
              ..strokeWidth = 0.5,
          );
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
