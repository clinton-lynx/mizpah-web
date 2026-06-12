const tabs = [
  { label: "All (12)", active: true },
  { label: "Watchlist (4)", active: false },
  { label: "Missing (3)", active: false },
  { label: "Medical (5)", active: false },
] as const;

export default function CaseFilterTabs() {
  return (
    <div className="border-b border-outline-variant/70">
      <div className="flex items-end gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={`border-b-2 pb-3 text-sm transition-colors ${
              tab.active
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
