import MaterialIcon from "@/components/shared/MaterialIcon";

export default function MatchHistoryRow({
  tone,
  camera,
  confidence,
  title,
  subtitle,
  timestamp,
}: {
  tone: "active" | "muted";
  camera: string;
  confidence: string;
  title: string;
  subtitle: string;
  timestamp: string;
}) {
  const muted = tone === "muted";

  return (
    <article className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-start gap-4">
        <div className={`mt-2 h-2.5 w-2.5 rounded-full ${muted ? "bg-surface-container-high" : "bg-primary"}`} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className={`flex items-center gap-2 ${muted ? "text-on-surface-variant" : "text-on-surface"}`}>
                <MaterialIcon name="videocam" className={`text-[16px] ${muted ? "text-on-surface-variant" : "text-on-surface"}`} />
                <span className="text-[18px] font-semibold tracking-[-0.02em]">{camera}</span>
              </div>
              <div className={`mt-2 font-label-mono text-[11px] uppercase tracking-[0.05em] ${muted ? "text-on-surface-variant" : "text-primary"}`}>
                Confidence: {confidence}
              </div>
            </div>

            <div className="text-sm text-on-surface-variant">{timestamp}</div>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <div className={`text-[18px] ${muted ? "text-on-surface-variant" : "text-on-surface"}`}>
              {title}
            </div>
            <div className="mt-1 text-sm text-on-surface-variant">
              {subtitle}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
