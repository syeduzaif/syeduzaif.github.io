import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";

/**
 * Display / narrative — editorial serif. Instrument Serif ships weight 400
 * only (normal + italic). The italic doubles as the site's "handwritten"
 * annotation voice — controlled, not novelty-font childish.
 */
export const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Body / interface — Geist (product & interface text). */
export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Technical labels, annotations, metadata — Geist Mono. */
export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
