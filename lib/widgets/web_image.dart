import 'package:flutter/material.dart';
import 'package:web/web.dart' as web;
import 'dart:ui_web' as ui_web;

/// Widget that renders an external URL using an HTML iframe element.
/// Used for rendering GitHub Stats images (SVGs) that Flutter's
/// Image.network cannot handle on the web platform.
class WebImage extends StatefulWidget {
  final String url;
  final double width;
  final double height;

  const WebImage({
    super.key,
    required this.url,
    required this.width,
    required this.height,
  });

  @override
  State<WebImage> createState() => _WebImageState();
}

class _WebImageState extends State<WebImage> {
  late final String _viewType;

  @override
  void initState() {
    super.initState();
    _viewType =
        'web-image-${widget.url.hashCode}-${DateTime.now().millisecondsSinceEpoch}';

    ui_web.platformViewRegistry.registerViewFactory(_viewType, (int viewId) {
      // Use an img tag — the github-readme-streak-stats service returns
      // a renderable SVG. For github-readme-stats we use a wrapper approach.
      final container = web.document.createElement('div') as web.HTMLDivElement;
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.overflow = 'hidden';
      container.style.borderRadius = '12px';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.backgroundColor = 'transparent';

      final img = web.document.createElement('img') as web.HTMLImageElement;
      img.src = widget.url;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';

      container.appendChild(img);
      return container;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: HtmlElementView(viewType: _viewType),
    );
  }
}
