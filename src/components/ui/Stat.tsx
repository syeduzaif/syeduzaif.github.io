/** A single metric — serif value over a muted label. */
export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="font-serif text-h3 text-sand">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
