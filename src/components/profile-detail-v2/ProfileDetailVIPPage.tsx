import OperationalShell from "@/components/shared/OperationalShell";
import MonitoringRail from "@/components/profile-detail-v2/MonitoringRail";
import ProfileHeaderCard from "@/components/profile-detail-v2/ProfileHeaderCard";
import ConfidenceCard from "@/components/profile-detail-v2/ConfidenceCard";
import TagsNotesCard from "@/components/profile-detail-v2/TagsNotesCard";
import MatchHistoryTable from "@/components/profile-detail-v2/MatchHistoryTable";
import MaterialIcon from "@/components/shared/MaterialIcon";

export default function ProfileDetailVIPPage() {
  return (
    <OperationalShell
      activeNav="event-log"
      rightRail={<MonitoringRail />}
      topBarActiveTabOverride="/watchlists"
      uppercaseTabs
    >
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-1 py-4">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <MaterialIcon name="arrow_back" className="text-[18px]" />
            <span>Event Log / Profile Detail</span>
          </div>

          <h1 className="text-[30px] font-bold tracking-[-0.04em] text-primary">
            Profile Detail
          </h1>

          <ProfileHeaderCard />

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.6fr]">
            <ConfidenceCard />
            <TagsNotesCard />
          </div>

          <MatchHistoryTable />
        </div>
      </main>
    </OperationalShell>
  );
}
