/** Shared content + media types. */

/**
 * Media is a discriminated union so every visual slot degrades gracefully.
 * When a real asset arrives, flip a single data entry from `placeholder` → `image`.
 */
export type Media =
  | { kind: "image"; src: string; alt: string }
  | { kind: "placeholder"; label: string; tone?: MediaTone };

export type MediaTone = "terracotta" | "olive" | "sand";

export type Platform = "Android" | "iOS";

export interface Metric {
  value: string;
  label: string;
}
