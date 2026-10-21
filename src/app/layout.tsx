import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { baseMetadata, personJsonLd, websiteJsonLd, jsonLdHtml } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#F1F1EC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
