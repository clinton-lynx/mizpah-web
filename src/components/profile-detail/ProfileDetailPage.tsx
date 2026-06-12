import OperationalShell from "@/components/shared/OperationalShell";
import ProfileHeader from "@/components/profile-detail/ProfileHeader";
import ProfileInfoGrid from "@/components/profile-detail/ProfileInfoGrid";
import MatchHistorySection from "@/components/profile-detail/MatchHistorySection";
import MonitoringRail from "@/components/profile-detail/MonitoringRail";

export default function ProfileDetailPage() {
  return (
    <OperationalShell
      activeNav="dashboard"
      uppercaseTabs
      rightRail={<MonitoringRail />}
    >
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-1 py-4">
          <h1 className="text-[30px] font-bold tracking-[-0.04em] text-primary">
            Profile Detail
          </h1>

          <ProfileHeader />
          <ProfileInfoGrid />
          <MatchHistorySection />
        </div>
      </main>
    </OperationalShell>
  );
}
