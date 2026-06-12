import MatchHistoryRow from "@/components/watchlist-profile/MatchHistoryRow";

export default function WatchlistMatchHistory() {
  return (
    <section className="space-y-4">
      <div className="border-b border-outline-variant pb-2">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-on-surface">
          Match History
        </h3>
      </div>

      <div className="space-y-3">
        <MatchHistoryRow
          tone="active"
          camera="Gate A camera"
          confidence="97.4%"
          title="Alert sent to security"
          subtitle="Confirmed by Dispatcher DC"
          timestamp="Today 09:14"
        />
        <MatchHistoryRow
          tone="muted"
          camera="Main hall camera"
          confidence="58.2%"
          title="Dismissed"
          subtitle="Dismissed by Dispatcher DC"
          timestamp="Yesterday 16:40"
        />
      </div>
    </section>
  );
}
