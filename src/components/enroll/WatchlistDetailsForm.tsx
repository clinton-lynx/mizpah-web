import MaterialIcon from "@/components/shared/MaterialIcon";

export default function WatchlistDetailsForm() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <MaterialIcon name="warning" className="text-[18px] text-error" />
        <h2 className="text-sm font-semibold text-error">Watchlist details</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Threat level
          </span>
          <select className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container px-3 text-sm text-on-surface outline-none transition-colors focus:border-primary">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Flagged by
          </span>
          <input
            type="text"
            placeholder="Operator ID or Agency"
            className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
          Reason for flagging
        </span>
        <textarea
          placeholder="Enter detailed context for this watchlist entry..."
          className="min-h-[80px] w-full rounded-lg border border-outline-variant bg-surface-container px-3 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
        />
      </label>
    </section>
  );
}
