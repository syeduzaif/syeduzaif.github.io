import { cn } from "@/lib/utils";
import { Tape } from "./Tape";

const tones = {
  yellow: "bg-yellow",
  paper: "bg-paper-soft",
  green: "bg-green",
} as const;

/**
 * A sticky product note — the lab's thinking-out-loud artefact. Serif italic
 * "handwriting", slight rotation, optional tape. Static server component;
 * for the draggable hero variant see <DraggableNote>.
 */
export function ProductNote({
  tone = "yellow",
  rotate = -2,
  taped = true,
  label,
  className,
  children,
}: {
  tone?: keyof typeof tones;
  rotate?: number;
  taped?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative max-w-[16rem] p-4 text-ink shadow-[2px_3px_0_rgb(23_23_23/0.12)]",
        tones[tone],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {taped && <Tape />}
      <p className="font-serif text-[1.05rem] leading-snug italic">{children}</p>
      {label && (
        <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/60">
          {label}
        </p>
      )}
    </div>
  );
}
