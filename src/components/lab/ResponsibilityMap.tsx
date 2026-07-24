import type { OwnershipTier } from "@/data/ownership";
import { cn } from "@/lib/utils";

/**
 * Ownership drawn as a system map: a central "Mobile product" node with
 * everything I touch around it. Line style is the honesty boundary —
 * solid = directly owned · dashed = regularly contribute · dotted = growing
 * toward. The SVG is decorative (aria-hidden); the same content renders as
 * grouped lists for assistive tech and small screens.
 */

const tierStyle = [
  {
    stroke: "var(--color-ink)",
    dash: undefined,
    marker: "bg-ink",
    border: "border-t-2 border-ink",
  },
  {
    stroke: "var(--color-grey)",
    dash: "7 5",
    marker: "border border-dashed border-ink/60 bg-transparent",
    border: "border-t-2 border-dashed border-ink/50",
  },
  {
    stroke: "var(--color-orange-deep)",
    dash: "2 5",
    marker: "rounded-full border border-dotted border-orange-deep bg-transparent",
    border: "border-t-2 border-dotted border-orange-deep",
  },
];

/* Fixed editorial layout for 5 nodes per tier (extra items still appear in
   the list fallback). Coordinates in a 920×560 viewBox. */
const OWNED_POS = [
  { x: 60, y: 35, w: 200 },
  { x: 65, y: 125, w: 190 },
  { x: 72, y: 210, w: 175 },
  { x: 40, y: 295, w: 240 },
  { x: 67, y: 380, w: 185 },
];
const CONTRIB_POS = [
  { x: 647, y: 35, w: 235 },
  { x: 677, y: 125, w: 175 },
  { x: 680, y: 210, w: 170 },
  { x: 652, y: 295, w: 225 },
  { x: 657, y: 380, w: 215 },
];
const GROWING_POS = [
  { x: 10, y: 485, w: 195 },
  { x: 225, y: 485, w: 175 },
  { x: 420, y: 485, w: 175 },
  { x: 615, y: 485, w: 115 },
  { x: 750, y: 485, w: 160 },
];

const NODE_H = 40;
const CENTER = { cx: 460, cy: 230, w: 170, h: 52 };

function nodeFor(pos: { x: number; y: number; w: number }) {
  return { cx: pos.x + pos.w / 2, cy: pos.y + NODE_H / 2 };
}

export function ResponsibilityMap({ tiers }: { tiers: OwnershipTier[] }) {
  const [owned, contributed, growing] = tiers;
  const layout = [
    { tier: owned, pos: OWNED_POS, style: tierStyle[0] },
    { tier: contributed, pos: CONTRIB_POS, style: tierStyle[1] },
  ];

  return (
    <div>
      {/* Legend — always visible, explains the line language */}
      <dl
        aria-label="Line legend"
        className="flex flex-wrap items-center gap-x-6 gap-y-2"
      >
        {tiers.map((tier, i) => (
          <div key={tier.title} className="flex items-center gap-2">
            <dt aria-hidden>
              <svg width="40" height="8" viewBox="0 0 40 8" fill="none">
                <line
                  x1="1"
                  y1="4"
                  x2="39"
                  y2="4"
                  stroke={tierStyle[i].stroke}
                  strokeWidth="2"
                  strokeDasharray={tierStyle[i].dash}
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">{tier.title} line style</span>
            </dt>
            <dd className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-grey">
              {tier.title}
            </dd>
          </div>
        ))}
      </dl>

      {/* The map (decorative duplicate of the lists below) */}
      <div className="mt-6 hidden md:block" aria-hidden>
        <svg viewBox="0 0 920 560" className="h-auto w-full">
          {/* connectors first, so nodes paint over them */}
          {layout.map(({ tier, pos, style }) =>
            tier.points.slice(0, 5).map((point, i) => {
              const n = nodeFor(pos[i]);
              return (
                <line
                  key={point}
                  x1={CENTER.cx}
                  y1={CENTER.cy}
                  x2={n.cx}
                  y2={n.cy}
                  stroke={style.stroke}
                  strokeWidth="1.4"
                  strokeDasharray={style.dash}
                  strokeLinecap="round"
                />
              );
            }),
          )}
          {growing.points.slice(0, 5).map((point, i) => {
            const n = nodeFor(GROWING_POS[i]);
            // quadratic curve through the central channel, avoiding side columns
            return (
              <path
                key={point}
                d={`M${CENTER.cx} ${CENTER.cy + CENTER.h / 2} Q460 430 ${n.cx} ${GROWING_POS[i].y}`}
                fill="none"
                stroke={tierStyle[2].stroke}
                strokeWidth="1.4"
                strokeDasharray={tierStyle[2].dash}
                strokeLinecap="round"
              />
            );
          })}

          {/* nodes */}
          {[
            ...layout.flatMap(({ tier, pos, style }) =>
              tier.points.slice(0, 5).map((point, i) => ({
                point,
                pos: pos[i],
                style,
              })),
            ),
            ...growing.points.slice(0, 5).map((point, i) => ({
              point,
              pos: GROWING_POS[i],
              style: tierStyle[2],
            })),
          ].map(({ point, pos, style }) => (
            <g key={point}>
              <rect
                x={pos.x}
                y={pos.y}
                width={pos.w}
                height={NODE_H}
                rx="3"
                fill="var(--color-paper-soft)"
                stroke={style.stroke}
                strokeWidth="1.4"
                strokeDasharray={style.dash}
              />
              <text
                x={pos.x + pos.w / 2}
                y={pos.y + NODE_H / 2 + 4.5}
                textAnchor="middle"
                fontSize="13.5"
                fontFamily="var(--font-sans)"
                fill="var(--color-ink)"
              >
                {point}
              </text>
            </g>
          ))}

          {/* central node */}
          <rect
            x={CENTER.cx - CENTER.w / 2}
            y={CENTER.cy - CENTER.h / 2}
            width={CENTER.w}
            height={CENTER.h}
            rx="3"
            fill="var(--color-ink)"
          />
          <text
            x={CENTER.cx}
            y={CENTER.cy + 5}
            textAnchor="middle"
            fontSize="15"
            fontWeight="500"
            fontFamily="var(--font-sans)"
            fill="var(--color-paper-soft)"
          >
            Mobile product
          </text>
        </svg>
      </div>

      {/* Accessible + small-screen version of the same content */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3 md:sr-only">
        {tiers.map((tier, i) => (
          <div
            key={tier.title}
            className={cn("bg-paper-soft p-5", tierStyle[i].border)}
          >
            <h3 className="font-medium text-ink">{tier.title}</h3>
            <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
              {tier.note}
            </p>
            <ul className="mt-4 space-y-2">
              {tier.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-grey">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[7px] h-1.5 w-1.5 shrink-0",
                      tierStyle[i].marker,
                    )}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
