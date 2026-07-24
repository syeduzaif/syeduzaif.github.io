import { Instrument_Serif, Manrope } from "next/font/google";

/**
 * Display / headings — editorial serif.
 * Instrument Serif ships weight 400 only (normal + italic).
 * Alternatives if a different feel is wanted: Fraunces, Cormorant Garamond.
 */
export const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/**
 * Body / UI — clean, highly readable.
 * Alternatives: Inter, Geist, DM Sans.
 */
export const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
