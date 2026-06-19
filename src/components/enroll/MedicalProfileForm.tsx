import MaterialIcon from "@/components/shared/MaterialIcon";

export default function MedicalProfileForm({
  bloodType,
  emergencyContact,
  allergies,
  conditions,
  onBloodTypeChange,
  onEmergencyContactChange,
  onAllergiesChange,
  onConditionsChange,
}: {
  bloodType: string;
  emergencyContact: string;
  allergies: string;
  conditions: string;
  onBloodTypeChange: (value: string) => void;
  onEmergencyContactChange: (value: string) => void;
  onAllergiesChange: (value: string) => void;
  onConditionsChange: (value: string) => void;
}) {
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
          <select
            value={bloodType}
            onChange={(event) => onBloodTypeChange(event.target.value)}
            className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors focus:border-primary"
          >
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
            Emergency contact
          </span>
          <input
            type="text"
            placeholder="+1 (555) 000-0000"
            value={emergencyContact}
            onChange={(event) => onEmergencyContactChange(event.target.value)}
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
          value={allergies}
          onChange={(event) => onAllergiesChange(event.target.value)}
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
          value={conditions}
          onChange={(event) => onConditionsChange(event.target.value)}
          className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
        />
      </label>
    </section>
  );
}
