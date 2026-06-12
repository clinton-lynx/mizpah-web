import MaterialIcon from "@/components/shared/MaterialIcon";
import MatchHistoryRow from "@/components/profile-detail/MatchHistoryRow";

export default function MatchHistorySection() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-center gap-2">
        <MaterialIcon name="history" className="text-[18px] text-on-surface-variant" />
        <h3 className="text-sm font-semibold text-on-surface">Match History</h3>
      </div>

      <div className="mt-4 divide-y divide-outline-variant/60">
        <MatchHistoryRow
          title="Medical tent camera — profile sent to medic"
          subtitle="Today 09:06 · Confirmed by Dispatcher DC"
          confidence="94.1%"
        />
        <MatchHistoryRow
          title="Gate A camera — profile sent to medic"
          subtitle="Yesterday 14:22 · Confirmed by Dispatcher DC"
          confidence="91.8%"
        />
        <MatchHistoryRow
          title="Main hall camera — dismissed"
          subtitle="Yesterday 11:05 · Dismissed by Dispatcher DC"
          confidence="61.3%"
          tone="muted"
        />
      </div>
    </section>
  );
}
