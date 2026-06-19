import MaterialIcon from "@/components/shared/MaterialIcon";

export default function BiometricUpload({
  fileName,
  onFileChange,
}: {
  fileName: string | null;
  onFileChange: (file: File | null) => void;
}) {
  const handleClick = () => {
    document.getElementById("enroll-photo-input")?.click();
  };

  return (
    <div>
      <div className="mb-3 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        Biometric Data
      </div>
      <input
        id="enroll-photo-input"
        accept="image/*"
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        type="file"
      />
      <button
        type="button"
        onClick={handleClick}
        className="flex h-[160px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-6 text-center transition-colors hover:bg-surface-container"
      >
        <MaterialIcon name="photo_camera" className="text-[36px] text-on-surface-variant" />
        <div className="mt-3 text-[15px] font-semibold text-on-surface">
          {fileName ? fileName : "Upload photo or capture with camera"}
        </div>
        <div className="mt-2 max-w-[360px] text-sm text-on-surface-variant">
          Clear front-facing photo required for face recognition
        </div>
      </button>
    </div>
  );
}
