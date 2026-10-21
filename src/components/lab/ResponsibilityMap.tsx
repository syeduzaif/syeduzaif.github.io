import type { OwnershipTier } from "@/data/ownership";

/**
 * Ownership drawn as containment: what I'm growing toward holds what I
 * contribute to, which holds what I actually own, with the product itself at
 * the centre. The nesting *is* the honesty boundary — the innermost box is
 * the smallest claim.
 *
 * This replaced an SVG map that needed a duplicate sr-only list; here the
 * visual structure and the accessible structure are the same markup.
 */

const CHIP =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.82rem]";

export function ResponsibilityMap({ tiers }: { tiers: OwnershipTier[] }) {
  const [owned, contributed, growing] = tiers;

  return (
    <div className="rounded-[28px] border border-ink/25 p-5 sm:p-7">
      <TierLabel tier={growing} tone="ink" />
      <ul className="mt-4 flex flex-wrap gap-2">
        {growing.points.map((p) => (
          <li key={p} className={`${CHIP} border-ink/25 bg-paper text-ink`}>
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-[22px] bg-paper-soft p-5 sm:p-7">
        <TierLabel tier={contributed} tone="ink" />
        <ul className="mt-4 flex flex-wrap gap-2">
          {contributed.points.map((p) => (
            <li key={p} className={`${CHIP} border-ink/15 bg-paper text-ink`}>
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-[18px] bg-night p-5 sm:p-7">
          <TierLabel tier={owned} tone="lime" />
          <ul className="mt-4 flex flex-wrap gap-2">
            {owned.points.map((p) => (
              <li
                key={p}
                className={`${CHIP} border-[#F1F1EC40] bg-night-2 text-on-night`}
              >
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-7 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 font-display text-[1.05rem] font-semibold text-ink">
              <span aria-hidden className="size-2 rounded-full bg-ink" />
              Mobile product
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TierLabel({
  tier,
  tone,
}: {
  tier: OwnershipTier;
  tone: "ink" | "lime";
}) {
  return (
    <p className="font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase">
      <span className={tone === "lime" ? "text-yellow" : "text-ink"}>
        {tier.title}
      </span>{" "}
      <span className={tone === "lime" ? "text-on-night-2" : "text-grey"}>
        ({tier.note})
      </span>
    </p>
  );
}
