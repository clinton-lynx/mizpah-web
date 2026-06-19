import MaterialIcon from "@/components/shared/MaterialIcon";

export default function EnrollButton({
  loading,
  disabled,
}: {
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-container/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <MaterialIcon name={loading ? "progress_activity" : "person_add"} className="text-[18px]" />
      {loading ? "Enrolling..." : "Enroll profile"}
    </button>
  );
}
