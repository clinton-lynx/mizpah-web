"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";
import AlertActionButtons from "@/components/event-log/AlertActionButtons";
import FaceMatchThumbnails from "@/components/event-log/FaceMatchThumbnails";

type AlertTone = "error" | "tertiary" | "primary" | "muted";

export type AlertCardData = {
  name: string;
  badge: string;
  badgeTone: AlertTone;
  location: string;
  confidence: string;
  tone: AlertTone;
  actionLabel?: string;
  actionIcon?: string;
  resolved?: boolean;
};

export default function AlertCard({
  alert,
  onPrimaryAction,
  onDismiss,
}: {
  alert: AlertCardData;
  onPrimaryAction?: () => void;
  onDismiss?: () => void;
}) {
  const leftBorder =
    alert.tone === "error"
      ? "border-l-error"
      : alert.tone === "tertiary"
        ? "border-l-tertiary"
        : alert.tone === "primary"
          ? "border-l-primary"
          : "border-l-outline";

  return (
    <article
      className={`flex items-center gap-5 rounded-lg border border-outline-variant bg-surface-container px-4 py-4 ${leftBorder} border-l-[3px] ${
        alert.resolved ? "opacity-75" : ""
      }`}
    >
      <FaceMatchThumbnails tone={alert.tone === "muted" ? "muted" : alert.tone} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className={`text-[18px] font-semibold tracking-[-0.02em] ${alert.resolved ? "text-on-surface-variant" : "text-on-surface"}`}>
            {alert.name}
          </h2>
          <span
            className={`rounded-full px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] ${
              alert.badgeTone === "error"
                ? "bg-error-container text-[#ffd7d2]"
                : alert.badgeTone === "tertiary"
                  ? "bg-tertiary text-on-tertiary"
                  : alert.badgeTone === "primary"
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-high text-on-surface-variant"
            }`}
          >
            {alert.badge}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
          <MaterialIcon name="photo_camera" className="text-[16px]" />
          <span>{alert.location}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-[0.05em]">
          <MaterialIcon name="face" className={`text-[16px] ${alert.resolved ? "text-on-surface-variant" : "text-primary"}`} />
          <span className={alert.resolved ? "text-on-surface-variant" : "text-primary"}>
            Conf {alert.confidence}
          </span>
        </div>
      </div>

      {alert.resolved ? (
        <div className="shrink-0 rounded-full bg-surface-container-high px-3 py-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
          ✓ Confirmed
        </div>
      ) : (
        <AlertActionButtons
          actionLabel={alert.actionLabel}
          actionIcon={alert.actionIcon}
          onAction={onPrimaryAction}
          onDismiss={onDismiss}
        />
      )}
    </article>
  );
}
