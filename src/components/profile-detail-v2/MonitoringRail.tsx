import MaterialIcon from "@/components/shared/MaterialIcon";

const alerts = [
  {
    tone: "error",
    label: "UNAUTHORIZED ENTRY",
    body: "Sector 7G, Door 42. Facial mismatch detected.",
    timestamp: "14:02:11",
    icon: "error",
  },
  {
    tone: "info",
    label: "WATCHLIST MATCH",
    body: "Adewale Balogun (VIP) logged at Main Lobby.",
    timestamp: "13:45:00",
    icon: "info",
  },
] as const;

export default function MonitoringRail() {
  return (
    <aside className="fixed right-0 top-0 z-30 h-screen w-[320px] border-l border-outline-variant bg-surface-container-lowest/95 px-4 py-4 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="border-b border-outline-variant/60 px-1 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-[#ffb4ab]">
              <MaterialIcon name="warning" className="text-[20px]" />
            </div>
            <div>
              <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                REAL-TIME ALERTS
              </div>
              <div className="mt-2 text-[26px] font-bold tracking-[-0.03em] text-on-surface">
                Active Monitoring
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-outline-variant/60 px-1 py-4">
          <div className="flex items-center gap-6">
            <span className="border-b-2 border-primary pb-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface">
              Critical
            </span>
            <span className="pb-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Warning
            </span>
            <span className="pb-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Info
            </span>
            <span className="pb-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Logs
            </span>
          </div>
        </div>

        <div className="space-y-3 px-2 py-4">
          {alerts.map((alert) => (
            <article
              key={alert.label}
              className="rounded-lg border border-outline-variant bg-surface-container p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    alert.tone === "error"
                      ? "bg-error-container text-on-error-container"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  <MaterialIcon name={alert.icon} className="text-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`font-label-mono text-[11px] uppercase tracking-[0.05em] ${alert.tone === "error" ? "text-error" : "text-on-surface-variant"}`}>
                      {alert.label}
                    </div>
                    <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                      {alert.timestamp}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-on-surface">
                    {alert.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
