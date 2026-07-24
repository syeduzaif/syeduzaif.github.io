/** Shared content + media types. */

/**
 * Media is a discriminated union so every visual slot degrades gracefully.
 * When a real asset arrives, flip a single data entry from `placeholder` → `image`.
 * The placeholder renders as a schematic device-frame preview (not a fake screen),
 * with an optional short `feature` label describing what the real asset will show.
 */
export type Media =
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "placeholder"; label: string; tone?: MediaTone; feature?: string };

/** Accent identity for placeholder media — maps to the lab accent palette. */
export type MediaTone = "orange" | "blue" | "green" | "yellow";

export type Platform = "Android" | "iOS";

export interface Metric {
  value: string;
  label: string;
}

/** An annotated evidence fact — metric plus an honest margin note. */
export interface EvidenceFact extends Metric {
  note?: string;
}

/**
 * Honest ownership split for a case study — keeps individual work distinct from
 * team/product outcomes. Rendered by <ResponsibilityMatrix>.
 */
export interface Responsibility {
  /** What I personally owned and executed. */
  owned: string[];
  /** What I contributed to alongside others. */
  contributed: string[];
  /** Team/product outcomes I was part of — never claimed as solely mine. */
  teamOutcome: string[];
}

/** A single node in an <ArchitectureDiagram> flow. */
export interface FlowStep {
  label: string;
  detail?: string;
}

/**
 * A product/engineering decision told as a lab record: the call, why, what was
 * rejected, the trade-off it carried, and what it produced. Only `decision` and
 * `tradeoff` are required — the rest render when present.
 */
export interface Decision {
  decision: string;
  why?: string;
  rejected?: string;
  tradeoff: string;
  outcome?: string;
}

/** An approach that was weighed before deciding — with an explicit verdict. */
export interface ProjectOption {
  approach: string;
  verdict: "chosen" | "rejected" | "exploring";
  note?: string;
}

/**
 * A labelled "content needed" marker. Rendered by <ContentPlaceholder> so the
 * page never silently hides a missing section — it says exactly what's needed.
 */
export interface ContentGap {
  section: string;
  note: string;
}
