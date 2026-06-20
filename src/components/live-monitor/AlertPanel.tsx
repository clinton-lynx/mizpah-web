"use client";

import type { LiveAlert } from "@/components/live-monitor/types";

function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function getBadgeLabel(type: LiveAlert["type"]) {
  if (type === "medical") return "MEDICAL PROFILE";
  if (type === "missing") return "MISSING PERSON";
  return "WATCHLIST MATCH";
}

function getTone(type: LiveAlert["type"]) {
  if (type === "medical") return "primary";
  if (type === "missing") return "tertiary";
  return "error";
}

function formatConfidence(confidence: LiveAlert["confidence"]) {
  if (confidence == null) {
    return null;
  }

  if (typeof confidence === "number") {
    if (confidence <= 1) {
      return `${Math.round(confidence * 100)}%`;
    }

    return `${Math.round(confidence)}%`;
  }

  return String(confidence).replace(/\s*conf\.?$/i, "");
}

function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "now";
  }

  const deltaMs = Math.max(0, Date.now() - date.getTime());
  const deltaSeconds = Math.round(deltaMs / 1000);

  if (deltaSeconds < 60) return "now";
  const deltaMinutes = Math.round(deltaSeconds / 60);
  if (deltaMinutes < 60) return `${deltaMinutes}m ago`;
  const deltaHours = Math.round(deltaMinutes / 60);
  if (deltaHours < 24) return `${deltaHours}h ago`;
  const deltaDays = Math.round(deltaHours / 24);
  return `${deltaDays}d ago`;
}

export default function AlertPanel({
  alerts,
  onConfirmAlert,
  onDismissAlert,
}: {
  alerts: LiveAlert[];
  onConfirmAlert: (id: string) => void;
  onDismissAlert: (id: string) => void;
}) {
  const alertCount = alerts.length;

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
              {alertCount}
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
          {alerts.length ? (
            alerts.map((alert) => {
              const tone = getTone(alert.type);
              const confidence = formatConfidence(alert.confidence);
              const locationLine =
                alert.subtitle ??
                (confidence ? `${alert.location} · ${confidence} conf.` : alert.location);
              const actionLabel = alert.type === "medical" ? "Send to medic" : "Confirm";

              return (
                <article
                  key={alert.id}
                  className={`relative overflow-hidden rounded-[24px] border bg-surface-container px-4 py-4 ${
                    tone === "error"
                      ? "border-error/70 shadow-[0_0_0_1px_rgba(255,180,171,0.14)]"
                      : tone === "tertiary"
                        ? "border-tertiary/70 shadow-[0_0_0_1px_rgba(255,181,158,0.12)]"
                        : "border-primary/60 shadow-[0_0_0_1px_rgba(89,219,199,0.12)]"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-1.5 ${
                      tone === "error" ? "bg-error" : tone === "tertiary" ? "bg-tertiary" : "bg-primary"
                    }`}
                  />

                  <div
                    className={`mb-4 inline-flex items-center rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${
                      tone === "error"
                        ? "bg-error-container text-[#ffd7d2]"
                        : tone === "tertiary"
                          ? "bg-[rgba(255,181,158,0.14)] text-tertiary"
                          : "bg-primary-container text-on-primary-container"
                    }`}
                  >
                    {getBadgeLabel(alert.type)}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[17px] font-semibold tracking-[-0.02em] text-on-surface">
                        {alert.name}
                      </div>
                      <div className="mt-1 text-sm text-on-surface-variant">
                        {locationLine}
                      </div>
                    </div>
                    <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                      {formatTimeAgo(alert.timestamp)}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onConfirmAlert(alert.id)}
                      className="flex-1 rounded-full bg-primary-container px-3 py-2 text-sm font-semibold text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary-fixed"
                    >
                      {actionLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDismissAlert(alert.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                    >
                      <MaterialIcon name="close" className="text-[18px]" />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-outline-variant/70 bg-surface-container px-4 text-center">
              <div>
                <div className="text-[16px] font-semibold tracking-[-0.02em] text-on-surface">
                  No alerts yet — live monitoring active
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
