"use client";

import { useEffect } from "react";

import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ConfirmMissingPersonModal({
  isOpen,
  onClose,
  person,
}: {
  isOpen: boolean;
  onClose: () => void;
  person: {
    name: string;
    location: string;
    confidence: string;
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
        className="w-full max-w-[448px] overflow-hidden rounded-lg border border-outline-variant bg-surface-bright"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-1 w-full bg-primary" />

        <div className="border-b border-outline-variant/50 p-6">
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-on-surface">
            Confirm missing person match
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            This will send an SMS to the registered guardian immediately
          </p>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-outline-variant bg-surface-container p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[24px] font-semibold tracking-[-0.03em] text-on-surface">
                  {person.name}
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-on-surface-variant">
                  <MaterialIcon name="location_on" className="text-[16px]" />
                  <span>{person.location}</span>
                </div>
              </div>
              <span className="rounded-full bg-tertiary-container px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-tertiary-container">
                MISSING PERSON
              </span>
            </div>

            <div className="my-4 h-px bg-outline-variant/50" />

            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-on-surface-variant">Match Confidence</div>
              <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
                {person.confidence} conf.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/50 bg-surface p-6">
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
              className="inline-flex items-center gap-2 rounded-lg bg-tertiary-container px-4 py-2 text-sm font-semibold text-on-tertiary-container transition-colors hover:opacity-90"
            >
              <MaterialIcon name="chat" className="text-[18px]" />
              Confirm & SMS guardian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
