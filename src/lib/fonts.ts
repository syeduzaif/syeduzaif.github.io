import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Display — Bricolage Grotesque. A variable grotesque with a tight, slightly
 * mechanical cut; carries the oversized headlines and the big numerals.
 * Variable across 200–800, so no explicit weight list.
 */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  /**
   * next/font ships only `wght` for a variable font unless the other axes are
   * requested. Without `opsz` the face renders at its small-text optical size
   * — noticeably wider — which blew the hero headline past its column. `wdth`
   * is here so the display sizes can be narrowed to match the design.
   */
  axes: ["opsz", "wdth"],
});

/** Body / interface — Inter. */
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Technical labels, status bars, metadata — IBM Plex Mono. Not a variable
 * font, so the weights actually used are listed explicitly.
 */
export const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});
