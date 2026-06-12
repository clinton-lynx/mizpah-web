"use client";

import { useState } from "react";

import ConfirmMissingPersonModal from "@/components/modals/ConfirmMissingPersonModal";
import ConfirmWatchlistModal from "@/components/modals/ConfirmWatchlistModal";
import OperationalShell from "@/components/shared/OperationalShell";
import AlertSection from "@/components/event-log/AlertSection";
import type { AlertCardData } from "@/components/event-log/AlertCard";

const unresolved: AlertCardData[] = [
  {
    name: "Emeka Okafor",
    badge: "Watchlist Match",
    badgeTone: "error",
    location: "Gate A camera · Today 09:14",
    confidence: "97.4%",
    tone: "error",
    actionLabel: "Confirm & alert security",
    actionIcon: "check_circle",
  },
  {
    name: "Taiwo Adeyemi",
    badge: "Missing Person",
    badgeTone: "tertiary",
    location: "Main hall camera · Today 09:10",
    confidence: "91.2%",
    tone: "tertiary",
    actionLabel: "Confirm & SMS guardian",
    actionIcon: "chat",
  },
  {
    name: "Adewale Balogun",
    badge: "Medical Profile",
    badgeTone: "primary",
    location: "Medical tent · Today 09:06",
    confidence: "94.1%",
    tone: "primary",
    actionLabel: "Send profile to medic",
    actionIcon: "medical_services",
  },
];

const resolved: AlertCardData[] = [
  {
    name: "Kemi Adesanya",
    badge: "Missing Person",
    badgeTone: "muted",
    location: "Exit B camera · Yesterday 18:32",
    confidence: "88.7%",
    tone: "muted",
    resolved: true,
  },
];

type ModalState =
  | { kind: "watchlist"; person: { name: string; confidence: string; location: string; timestamp: string } }
  | { kind: "missing"; person: { name: string; location: string; confidence: string } }
  | null;

export default function EventLogPage() {
  const [modal, setModal] = useState<ModalState>(null);

  const handleAlertAction = (alert: AlertCardData) => {
    if (alert.name === "Emeka Okafor") {
      setModal({
        kind: "watchlist",
        person: {
          name: alert.name,
          confidence: alert.confidence,
          location: "Gate A",
          timestamp: "14:02:11",
        },
      });
      return;
    }

    if (alert.name === "Taiwo Adeyemi") {
      setModal({
        kind: "missing",
        person: {
          name: alert.name,
          location: "Main hall",
          confidence: alert.confidence,
        },
      });
    }
  };

  return (
    <>
      <OperationalShell activeNav="event-log" topBarMode="muted">
        <main className="flex min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col px-1 py-4">
            <header className="mb-6">
              <div className="flex items-end gap-3">
                <h1 className="text-[30px] font-bold tracking-[-0.04em] text-on-surface">
                  Alerts
                </h1>
                <span className="pb-1 text-sm text-on-surface-variant">3 unresolved</span>
              </div>
            </header>

            <div className="space-y-7">
              <AlertSection label="UNRESOLVED" alerts={unresolved} onAlertAction={handleAlertAction} />
              <AlertSection label="RESOLVED" alerts={resolved} />
            </div>
          </div>
        </main>
      </OperationalShell>

      <ConfirmWatchlistModal
        isOpen={modal?.kind === "watchlist"}
        onClose={() => setModal(null)}
        person={
          modal?.kind === "watchlist"
            ? modal.person
            : {
                name: "Emeka Okafor",
                confidence: "97.4%",
                location: "Gate A",
                timestamp: "14:02:11",
              }
        }
      />

      <ConfirmMissingPersonModal
        isOpen={modal?.kind === "missing"}
        onClose={() => setModal(null)}
        person={
          modal?.kind === "missing"
            ? modal.person
            : {
                name: "Taiwo Adeyemi",
                location: "Main hall",
                confidence: "91.2%",
              }
        }
      />
    </>
  );
}
