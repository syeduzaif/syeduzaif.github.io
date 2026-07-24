import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

/** Shared base metadata. Per-route pages extend/override this. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} — Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Mobile Product Engineer",
    "Flutter Developer",
    "Flutter Developer Pakistan",
    "Remote Flutter Developer",
    "Mobile App Developer",
    "Product-minded engineer",
    "Android and iOS Developer",
    "Startup mobile developer",
    "Syed Uzaif",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description:
      "Mobile Product Engineer — production Android & iOS releases, 10,000+ cumulative downloads.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

/**
 * Complete per-route metadata. Sets a full openGraph + twitter (with the OG
 * image) because Next shallow-merges the `openGraph` key — a partial override
 * in a child route would otherwise drop the inherited og:image.
 */
export function routeMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const social = `${title} — ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: social,
      description,
      locale: "en_US",
      images: ["/opengraph-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

/** Structured data: ProfilePage → Person. Rich, factual, extractable for GEO. */
export function personJsonLd() {
  const sameAs = [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.youtube,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      email: siteConfig.email,
      sameAs,
      knowsAbout: [
        "Flutter",
        "Dart",
        "Mobile product engineering",
        "Android development",
        "iOS development",
        "Offline-first architecture",
        "Firebase",
        "Product thinking",
        "App Store & Play Store releases",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Virtual University of Pakistan",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Mobile Product Engineer",
        skills:
          "Flutter, Dart, product engineering, Android, iOS, offline-first architecture, Firebase, release management",
      },
    },
  };
}

/** Structured data: WebSite. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name },
  };
}

/**
 * Serialize JSON-LD for safe inlining in a <script>. Escapes `<` so a value
 * containing `</script>` can't break out of the element (data is trusted today,
 * but this keeps the only dangerouslySetInnerHTML sink safe-by-default).
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
