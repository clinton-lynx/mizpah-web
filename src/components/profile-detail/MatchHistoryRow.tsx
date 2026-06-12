export default function MatchHistoryRow({
  title,
  subtitle,
  confidence,
  tone = "active",
}: {
  title: string;
  subtitle: string;
  confidence: string;
  tone?: "active" | "muted";
}) {
  const muted = tone === "muted";

  return (
    <div className="flex items-center gap-4 py-4">
      <div className={`h-2.5 w-2.5 rounded-full ${muted ? "bg-surface-container-high" : "bg-primary"}`} />
      <div className="min-w-0 flex-1">
        <div className={`text-sm ${muted ? "text-on-surface-variant" : "text-on-surface"}`}>{title}</div>
        <div className="mt-1 text-sm text-on-surface-variant">{subtitle}</div>
      </div>
      <div className={`shrink-0 rounded-full px-3 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${
        muted ? "bg-surface-container-high text-on-surface-variant" : "bg-surface-container-high text-primary"
      }`}>
        {confidence}
      </div>
    </div>
  );
}
