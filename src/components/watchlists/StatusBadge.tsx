export default function StatusBadge({
  status,
}: {
  status: "ACTIVE" | "RESOLVED";
}) {
  const styles =
    status === "ACTIVE"
      ? "bg-primary-container text-on-primary-container"
      : "bg-surface-container-high text-on-surface-variant";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] ${styles}`}>
      {status}
    </span>
  );
}
