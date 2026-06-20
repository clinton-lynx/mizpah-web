"use client";

import { useState } from "react";

import AlertPanel from "@/components/live-monitor/AlertPanel";
import CameraGrid from "@/components/live-monitor/CameraGrid";
import type { LiveAlert, LiveAlertType, LiveMatchPayload } from "@/components/live-monitor/types";
import MaterialIcon from "@/components/shared/MaterialIcon";
import OperationalShell from "@/components/shared/OperationalShell";

export default function LiveMonitorPage() {
  const [liveAlerts, setLiveAlerts] = useState<LiveAlert[]>([]);

  function formatConfidence(confidence: LiveMatchPayload["confidence"]) {
    if (confidence == null) {
      return null;
    }

    if (typeof confidence === "number") {
      if (confidence <= 1) {
        return `${Math.round(confidence * 100)}%`;
      }

      return `${Math.round(confidence)}%`;
    }

    return String(confidence);
  }

  function pickAlertType(match: LiveMatchPayload) {
    const watchlistReport = match.reports.find((report) => report.report_type === "watchlist");
    if (watchlistReport) {
      return watchlistReport;
    }

    const missingReport = match.reports.find((report) => report.report_type === "missing");
    if (missingReport) {
      return missingReport;
    }

    return null;
  }

  function buildSubtitle(
    type: LiveAlertType,
    location: string,
    confidence: LiveMatchPayload["confidence"],
    report: ReturnType<typeof pickAlertType>,
  ) {
    const confidenceLabel = formatConfidence(confidence);

    if (type === "watchlist") {
      return [location, report?.threat_level, report?.reason].filter(Boolean).join(" · ");
    }

    if (type === "missing") {
      return [location, report?.last_seen_location, report?.description].filter(Boolean).join(" · ");
    }

    return [location, confidenceLabel ? `${confidenceLabel} conf.` : null].filter(Boolean).join(" · ");
  }

  function createAlertId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function handleMatch(match: LiveMatchPayload) {
    const report = pickAlertType(match);
    const type: LiveAlertType = report?.report_type ?? "medical";

    const alert: LiveAlert = {
      id: createAlertId(),
      name: match.profileName,
      type,
      location: match.location,
      confidence: match.confidence,
      timestamp: match.timestamp,
      subtitle: buildSubtitle(type, match.location, match.confidence, report),
      reportType: report?.report_type ?? null,
      reports: match.reports,
      threatLevel: report?.threat_level ?? null,
      reason: report?.reason ?? null,
      lastSeenLocation: report?.last_seen_location ?? null,
      description: report?.description ?? null,
      flaggedBy: report?.flagged_by ?? null,
    };

    setLiveAlerts((current) => [alert, ...current].slice(0, 10));
  }

  function removeAlert(id: string) {
    setLiveAlerts((current) => current.filter((alert) => alert.id !== id));
  }

  return (
    <OperationalShell
      activeNav="dashboard"
      rightRail={
        <AlertPanel
          alerts={liveAlerts}
          onConfirmAlert={removeAlert}
          onDismissAlert={removeAlert}
        />
      }
    >
      <main className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-on-surface">
              Live Feed Matrix
            </h1>
            <p className="mt-1 flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              <MaterialIcon name="videocam" className="text-[16px]" />
              4 Cameras Active
            </p>
          </div>
        </div>

        <CameraGrid onMatch={handleMatch} />
      </main>
    </OperationalShell>
  );
}
