import InfoCard from "@/components/profile-detail/InfoCard";

export default function ProfileInfoGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <InfoCard label="Blood Type" icon="water_drop" value="O+" valueClassName="text-primary" />
      <InfoCard label="Emergency Contact" value="+234 802 345 6789" />
      <InfoCard
        label="Known Allergies"
        icon="warning"
        value="Penicillin, Latex"
        valueClassName="text-error"
      />
      <InfoCard label="Existing Conditions" value="Type-2 Diabetes" />
    </section>
  );
}
