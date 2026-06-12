"use client";

import { useEffect } from "react";

import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ConfirmWatchlistModal({
  isOpen,
  onClose,
  person,
}: {
  isOpen: boolean;
  onClose: () => void;
  person: {
    name: string;
    confidence: string;
    location: string;
    timestamp: string;
  };
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[480px] overflow-hidden rounded-xl border border-outline-variant bg-surface-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-1 w-full bg-primary" />

        <div className="flex gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-error-container text-on-error-container">
            <MaterialIcon name="warning" className="text-[24px]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-on-surface">
              Confirm watchlist match
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              This will immediately alert the security team lead via SMS.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-lg border border-outline-variant bg-surface-container-highest p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[18px] font-semibold tracking-[-0.03em] text-on-surface">
                  {person.name}
                </div>
                <div className="mt-2 inline-flex rounded-sm bg-error-container px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-[#ffd7d2]">
                  WATCHLIST MATCH
                </div>
              </div>
              <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
                {person.confidence}
              </div>
            </div>

            <div className="my-4 h-px bg-outline-variant/60" />

            <div className="flex items-center justify-between gap-4 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              <div className="flex items-center gap-2">
                <MaterialIcon name="photo_camera" className="text-[16px]" />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="schedule" className="text-[16px]" />
                <span>{person.timestamp} PST</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant bg-surface-container-low p-4">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#cf4342]"
            >
              <MaterialIcon name="send" className="text-[18px]" />
              Confirm & send alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
