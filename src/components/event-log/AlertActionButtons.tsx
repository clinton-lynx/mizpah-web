"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";

export default function AlertActionButtons({
  dismissLabel = "Dismiss",
  actionLabel,
  actionIcon,
  onDismiss,
  onAction,
}: {
  dismissLabel?: string;
  actionLabel?: string;
  actionIcon?: string;
  onDismiss?: () => void;
  onAction?: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        onClick={onDismiss}
        type="button"
        className="rounded-full border border-outline-variant bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
      >
        {dismissLabel}
      </button>
      {actionLabel ? (
        <button
          onClick={onAction}
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-container/90"
        >
          {actionIcon ? <MaterialIcon name={actionIcon} className="text-[18px]" /> : null}
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
