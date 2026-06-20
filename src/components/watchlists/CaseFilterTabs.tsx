type CaseFilter = "all" | "watchlist" | "missing" | "medical";

const tabs = [
  { label: "All", value: "all" },
  { label: "Watchlist", value: "watchlist" },
  { label: "Missing", value: "missing" },
  { label: "Medical", value: "medical" },
] as const satisfies ReadonlyArray<{ label: string; value: CaseFilter }>;

export default function CaseFilterTabs({
  activeFilter,
  counts,
  onSelectFilter,
}: {
  activeFilter: CaseFilter;
  counts: Record<CaseFilter, number>;
  onSelectFilter: (filter: CaseFilter) => void;
}) {
  return (
    <div className="border-b border-outline-variant/70">
      <div className="flex items-end gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={`border-b-2 pb-3 text-sm transition-colors ${
              activeFilter === tab.value
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
            onClick={() => onSelectFilter(tab.value)}
          >
            {tab.label} ({counts[tab.value]})
          </button>
        ))}
      </div>
    </div>
  );
}
