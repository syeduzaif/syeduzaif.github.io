"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, easeOutSoft } from "@/lib/motion";

/** Fade + rise into view once. Renders statically under reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeOutSoft, delay }}
    >
      {children}
    </motion.div>
  );
}
