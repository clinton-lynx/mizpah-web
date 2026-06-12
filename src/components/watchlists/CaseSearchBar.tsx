import MaterialIcon from "@/components/shared/MaterialIcon";

export default function CaseSearchBar() {
  return (
    <label className="relative block">
      <MaterialIcon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
      />
      <input
        type="search"
        placeholder="Search by name..."
        className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container pl-11 pr-4 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
      />
    </label>
  );
}
