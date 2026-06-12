import MaterialIcon from "@/components/shared/MaterialIcon";

export default function InfoCard({
  label,
  value,
  icon,
  valueClassName = "",
}: {
  label: string;
  value: string;
  icon?: string;
  valueClassName?: string;
}) {
  return (
    <article className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        {label}
      </div>
      <div className="mt-4 flex items-center gap-2">
        {icon ? <MaterialIcon name={icon} className="text-[18px] text-on-surface-variant" /> : null}
        <div className={`text-[20px] font-bold tracking-[-0.03em] ${valueClassName || "text-on-surface"}`}>
          {value}
        </div>
      </div>
    </article>
  );
}
