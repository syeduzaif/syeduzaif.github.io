import 'package:flutter_test/flutter_test.dart';
import 'package:portflo/app.dart';

void main() {
  testWidgets('Portfolio app renders', (WidgetTester tester) async {
    await tester.pumpWidget(const PortfolioApp());
    expect(find.text('SU'), findsWidgets);
  });
}
