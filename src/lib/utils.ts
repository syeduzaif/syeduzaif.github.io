import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The `@theme` type scale (`text-hero`, `text-h2`, …) isn't part of
 * tailwind-merge's built-in font-size group, so it classified those as text
 * *colours* — meaning `cn("text-h2", "text-ink")` silently dropped the size
 * and rendered headings at body size. Registering the scale fixes the whole
 * codebase rather than each call site.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["eyebrow", "hero", "h2", "h3", "lead", "body", "meta"] },
      ],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Kebab-case a heading into a stable id for aria-labelledby / anchors. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
