import MaterialIcon from "@/components/shared/MaterialIcon";

export default function EnrollButton() {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-container/90"
    >
      <MaterialIcon name="person_add" className="text-[18px]" />
      Enroll profile
    </button>
  );
}
