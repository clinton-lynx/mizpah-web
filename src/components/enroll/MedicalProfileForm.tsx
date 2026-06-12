import MaterialIcon from "@/components/shared/MaterialIcon";

export default function MedicalProfileForm() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <MaterialIcon name="medical_services" className="text-[18px] text-primary" />
        <h2 className="text-sm font-semibold text-primary">Medical profile</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Blood type
          </span>
          <select className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors focus:border-primary">
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Emergency contact
          </span>
          <input
            type="text"
            placeholder="+1 (555) 000-0000"
            className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
          Known allergies
        </span>
        <input
          type="text"
          placeholder="e.g. Penicillin, Latex"
          className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
        />
      </label>

      <label className="block space-y-2">
        <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
          Existing conditions
        </span>
        <input
          type="text"
          placeholder="e.g. Type-2 Diabetes"
          className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
        />
      </label>
    </section>
  );
}
