"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";

export type EnrollCategory = "watchlist" | "missing" | "medical" | null;

const options = [
  {
    label: "Watchlist",
    icon: "shield_alert",
    value: "watchlist",
  },
  {
    label: "Missing",
    icon: "person_search",
    value: "missing",
  },
  {
    label: "Medical",
    icon: "medical_services",
    value: "medical",
  },
] as const;

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: {
  selectedCategory: EnrollCategory;
  onSelectCategory: (category: Exclude<EnrollCategory, null>) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        Category
      </legend>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => {
          const selected = selectedCategory === option.value;

          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectCategory(option.value)}
              className={`flex h-[120px] flex-col items-center justify-center rounded-xl border px-4 py-3 text-center transition-colors ${
                selected
                  ? "border-primary/70 bg-[rgba(89,219,199,0.08)] text-primary"
                  : "border-outline-variant bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <MaterialIcon
                name={option.icon}
                className={`text-[30px] ${selected ? "text-primary" : "text-on-surface-variant"}`}
              />
              <span className="mt-3 text-sm font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
