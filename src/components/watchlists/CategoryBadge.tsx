export default function CategoryBadge({
  category,
}: {
  category: "watchlist" | "missing" | "medical";
}) {
  const styles =
    category === "watchlist"
      ? "bg-error-container text-[#ffd7d2]"
      : category === "missing"
        ? "bg-tertiary-container text-on-tertiary"
        : "bg-primary-container text-on-primary-container";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] ${styles}`}>
      {category.toUpperCase()}
    </span>
  );
}
