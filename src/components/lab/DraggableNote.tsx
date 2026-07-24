"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A sticky note the visitor can nudge around — it snaps back on release.
 * One of the site's few deliberate interactions. Drag only activates on
 * pointer-fine hover devices AND when reduced-motion is off; everywhere else
 * it renders as a static note (content identical, nothing lost).
 */
export function DraggableNote({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanDrag(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!canDrag || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 480, bounceDamping: 22 }}
      whileDrag={{ scale: 1.04, zIndex: 30 }}
      className={`cursor-grab active:cursor-grabbing ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
