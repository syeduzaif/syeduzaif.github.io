import type { Variants } from "framer-motion";

/** Soft ease used across the site (matches --ease-out-soft in globals.css). */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

/** Gentle fade + rise, triggered when an element enters the viewport. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};
