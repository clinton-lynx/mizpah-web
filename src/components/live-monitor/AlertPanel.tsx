const alerts = [
  {
    kind: "WATCHLIST MATCH",
    tone: "error",
    timestamp: "now",
    name: "Emeka Okafor",
    location: "Gate A · 97% conf.",
    action: "Confirm",
    actionVariant: "fill",
    icon: "close",
  },
  {
    kind: "MISSING PERSON",
    tone: "tertiary",
    timestamp: "2m ago",
    name: "Taiwo Adeyemi",
    location: "Main hall · 91% conf.",
    action: "Confirm",
    actionVariant: "fill",
    icon: "more_horiz",
  },
  {
    kind: "MEDICAL PROFILE",
    tone: "primary",
    timestamp: "5m ago",
    name: "Adewale Balogun",
    location: "Medical tent · 94% conf.",
    action: "Send to medic",
    actionVariant: "outline",
    icon: null,
  },
] as const;

function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

export default function AlertPanel() {
  return (
    <aside className="fixed right-0 top-0 z-30 h-screen w-[320px] border-l border-outline-variant bg-surface-container-lowest/95 px-4 py-4 backdrop-blur-xl">
      <div className="flex h-full flex-col rounded-[28px] border border-outline-variant bg-surface-container-low/80 p-4">
        <div className="space-y-3 border-b border-outline-variant/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-error-container text-[#ffd7d2]">
              <MaterialIcon name="notifications" className="text-[22px]" />
            </div>
            <div>
              <div className="text-[20px] font-bold tracking-[-0.03em] text-on-surface">
                Real-time Alerts
              </div>
              <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                Active Monitoring
              </div>
            </div>
            <span className="ml-auto rounded-full bg-error px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-error">
              3
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="border-b-2 border-error pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-error">
              Critical
            </span>
            <span className="pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Warning
            </span>
            <span className="pb-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Logs
            </span>
          </div>
        </div>

        <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {alerts.map((alert) => (
            <article
              key={`${alert.kind}-${alert.name}`}
              className={`relative overflow-hidden rounded-[24px] border bg-surface-container px-4 py-4 ${
                alert.tone === "error"
                  ? "border-error/70 shadow-[0_0_0_1px_rgba(255,180,171,0.14)]"
                  : alert.tone === "tertiary"
                    ? "border-tertiary/70 shadow-[0_0_0_1px_rgba(255,181,158,0.12)]"
                    : "border-primary/60 shadow-[0_0_0_1px_rgba(89,219,199,0.12)]"
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1.5 ${
                  alert.tone === "error"
                    ? "bg-error"
                    : alert.tone === "tertiary"
                      ? "bg-tertiary"
                      : "bg-primary"
                }`}
              />

              <div
                className={`mb-4 inline-flex items-center rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${
                  alert.tone === "error"
                    ? "bg-error-container text-[#ffd7d2]"
                    : alert.tone === "tertiary"
                      ? "bg-[rgba(255,181,158,0.14)] text-tertiary"
                      : "bg-primary-container text-on-primary-container"
                }`}
              >
                {alert.kind}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[17px] font-semibold tracking-[-0.02em] text-on-surface">
                    {alert.name}
                  </div>
                  <div className="mt-1 text-sm text-on-surface-variant">
                    {alert.location}
                  </div>
                </div>
                <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                  {alert.timestamp}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button className="flex-1 rounded-full bg-primary-container px-3 py-2 text-sm font-semibold text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary-fixed">
                  {alert.action}
                </button>
                {alert.icon ? (
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
                    <MaterialIcon name={alert.icon} className="text-[18px]" />
                  </button>
                ) : null}
              </div>

              {alert.tone === "primary" ? (
                <button className="mt-3 flex w-full items-center justify-center rounded-full border border-primary/50 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-container/20">
                  Send to medic
                </button>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
