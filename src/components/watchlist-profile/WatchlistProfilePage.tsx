import Link from "next/link";

import OperationalShell from "@/components/shared/OperationalShell";
import MaterialIcon from "@/components/shared/MaterialIcon";
import WatchlistAlertsRail from "@/components/watchlist-profile/WatchlistAlertsRail";
import WatchlistProfileHeader from "@/components/watchlist-profile/WatchlistProfileHeader";
import ThreatLevelCard from "@/components/watchlist-profile/ThreatLevelCard";
import FlaggedByCard from "@/components/watchlist-profile/FlaggedByCard";
import ReasonCard from "@/components/watchlist-profile/ReasonCard";
import StatusCard from "@/components/watchlist-profile/StatusCard";
import WatchlistMatchHistory from "@/components/watchlist-profile/WatchlistMatchHistory";

export default function WatchlistProfilePage() {
  return (
    <OperationalShell activeNav="watchlists" rightRail={<WatchlistAlertsRail />}>
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-1 py-4">
          <Link
            href="/watchlists"
            className="inline-flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant"
          >
            <MaterialIcon name="arrow_back" className="text-[16px]" />
            BACK TO WATCHLISTS
          </Link>

          <WatchlistProfileHeader />

          <div className="grid gap-4 md:grid-cols-2">
            <ThreatLevelCard />
            <FlaggedByCard />
          </div>

          <ReasonCard />
          <StatusCard />
          <WatchlistMatchHistory />
        </div>
      </main>
    </OperationalShell>
  );
}
