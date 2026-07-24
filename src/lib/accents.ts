import type { CSSProperties } from "react";
import type { MediaTone } from "./types";

/**
 * Per-project accent identities. Applied as CSS-var overrides on a wrapping
 * element (`style={accentVars.blue}`): `--accent` drives fills, borders and
 * large marks; `--accent-ink` is the small-text-safe variant (AA on paper).
 * Green/yellow never appear as text — their `--accent-ink` is a dark cousin.
 */
export const accentVars: Record<MediaTone, CSSProperties> = {
  orange: {
    "--accent": "var(--color-orange)",
    "--accent-ink": "var(--color-orange-deep)",
  } as CSSProperties,
  blue: {
    "--accent": "var(--color-blue)",
    "--accent-ink": "var(--color-blue-deep)",
  } as CSSProperties,
  green: {
    "--accent": "var(--color-green)",
    "--accent-ink": "var(--color-green-deep)",
  } as CSSProperties,
  yellow: {
    "--accent": "var(--color-yellow)",
    "--accent-ink": "var(--color-orange-deep)",
  } as CSSProperties,
};
