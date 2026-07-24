import 'dart:convert';
import 'package:flutter/services.dart';

// Conditional import for web-specific download
import 'download_helper_stub.dart'
    if (dart.library.js_interop) 'download_helper_web.dart'
    as platform;

/// Downloads a bundled asset file.
/// On web: triggers a browser download dialog.
/// On other platforms: falls back to no-op (web-only portfolio).
Future<void> downloadAsset(String assetPath, String fileName) async {
  final data = await rootBundle.load(assetPath);
  final bytes = data.buffer.asUint8List();
  final base64Data = base64Encode(bytes);
  platform.triggerDownload(base64Data, fileName);
}
