"use client";

import AlertCard, { type AlertCardData } from "@/components/event-log/AlertCard";

export default function AlertSection({
  label,
  alerts,
  onAlertAction,
}: {
  label: string;
  alerts: AlertCardData[];
  onAlertAction?: (alert: AlertCardData) => void;
}) {
  return (
    <section className="space-y-3">
      <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        {label}
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertCard
            key={`${alert.name}-${alert.badge}-${alert.location}`}
            alert={alert}
            onPrimaryAction={alert.actionLabel ? () => onAlertAction?.(alert) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
