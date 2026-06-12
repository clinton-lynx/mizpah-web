export default function CategoryBadge({
  category,
}: {
  category: "WATCHLIST" | "MISSING" | "MEDICAL";
}) {
  const styles =
    category === "WATCHLIST"
      ? "bg-error-container text-[#ffd7d2]"
      : category === "MISSING"
        ? "bg-tertiary-container text-on-tertiary"
        : "bg-primary-container text-on-primary-container";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] ${styles}`}>
      {category}
    </span>
  );
}
