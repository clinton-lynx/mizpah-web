import MaterialIcon from "@/components/shared/MaterialIcon";

const alerts = [
  {
    tone: "error",
    label: "UNAUTHORIZED ACCESS",
    timestamp: "Just now",
    body: "Watchlist match (Emeka Okafor) detected at Server Room Alpha.",
  },
  {
    tone: "tertiary",
    label: "LOITERING DETECTED",
    timestamp: "2m ago",
    body: "Unknown individual near Perimeter Fence Sector 4.",
  },
  {
    tone: "muted",
    label: "CAMERA OFFLINE",
    timestamp: "15m ago",
    body: "Feed lost from Loading Dock Cam 02. Technician dispatched.",
  },
] as const;

export default function WatchlistAlertsRail() {
  return (
    <aside className="fixed right-0 top-0 z-30 h-screen w-[320px] border-l border-outline-variant bg-surface-container-lowest/95 px-4 py-4 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="border-b border-outline-variant/60 px-1 pb-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-[#ffb4ab]">
              <MaterialIcon name="warning" className="text-[20px]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-on-surface">
                Real-time Alerts
              </h2>
              <div className="mt-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                ACTIVE MONITORING
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

        <div className="space-y-0 px-1 py-4">
          {alerts.map((alert) => (
            <article
              key={alert.label}
              className="border-b border-outline-variant/50 pb-4 pt-0"
            >
              <div
                className={`border-l-[3px] pl-3 ${
                  alert.tone === "error"
                    ? "border-error"
                    : alert.tone === "tertiary"
                      ? "border-tertiary"
                      : "border-outline-variant"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`font-label-mono text-[11px] uppercase tracking-[0.05em] ${
                      alert.tone === "error"
                        ? "text-error"
                        : alert.tone === "tertiary"
                          ? "text-tertiary"
                          : "text-on-surface-variant"
                    }`}
                  >
                    {alert.label}
                  </div>
                  <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                    {alert.timestamp}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-on-surface">{alert.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
