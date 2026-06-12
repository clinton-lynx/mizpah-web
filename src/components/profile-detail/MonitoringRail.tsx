import MaterialIcon from "@/components/shared/MaterialIcon";

const alerts = [
  {
    tone: "error",
    label: "CAM 04 - SECTOR B",
    body: "Unrecognized personnel detected in restricted zone.",
    timestamp: "Just now",
    icon: "error",
  },
  {
    tone: "info",
    label: "SYSTEM",
    body: "Database sync completed successfully.",
    timestamp: "2m ago",
    icon: "info",
  },
] as const;

export default function MonitoringRail() {
  return (
    <aside className="fixed right-0 top-0 z-30 h-screen w-[320px] border-l border-outline-variant bg-surface-container-lowest/95 px-4 py-4 backdrop-blur-xl">
      <div className="flex h-full flex-col rounded-[28px] border border-outline-variant bg-surface-container p-4">
        <div className="space-y-3 border-b border-outline-variant/60 pb-4">
          <div className="text-[12px] font-semibold tracking-[0.1em] text-on-surface-variant">
            ACTIVE MONITORING
          </div>
          <div className="flex items-center gap-5">
            <span className="border-b-2 border-primary pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
              Critical
            </span>
            <span className="pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Warning
            </span>
            <span className="pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Info
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.label} className="rounded-[20px] border border-outline-variant bg-surface-container-low p-3">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    alert.tone === "error" ? "bg-error-container text-[#ffd7d2]" : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  <MaterialIcon name={alert.icon} className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className={`font-label-mono text-[11px] uppercase tracking-[0.05em] ${alert.tone === "error" ? "text-error" : "text-on-surface-variant"}`}>
                    {alert.label}
                  </div>
                  <div className="mt-1 text-sm text-on-surface">{alert.body}</div>
                  <div className="mt-2 text-sm text-on-surface-variant">{alert.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
