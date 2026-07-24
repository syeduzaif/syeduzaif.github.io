import 'package:web/web.dart' as web;

/// Web implementation: creates an anchor element to trigger a file download.
void triggerDownload(String base64Data, String fileName) {
  final anchor = web.document.createElement('a') as web.HTMLAnchorElement;
  anchor.href = 'data:application/octet-stream;base64,$base64Data';
  anchor.download = fileName;
  anchor.style.display = 'none';
  web.document.body?.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
