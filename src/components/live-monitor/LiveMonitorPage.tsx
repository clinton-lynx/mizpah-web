import AlertPanel from "@/components/live-monitor/AlertPanel";
import CameraGrid from "@/components/live-monitor/CameraGrid";
import MaterialIcon from "@/components/shared/MaterialIcon";
import OperationalShell from "@/components/shared/OperationalShell";

export default function LiveMonitorPage() {
  return (
    <OperationalShell activeNav="dashboard" rightRail={<AlertPanel />}>
      <main className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-on-surface">
              Live Feed Matrix
            </h1>
            <p className="mt-1 flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              <MaterialIcon name="videocam" className="text-[16px]" />
              4 Cameras Active
            </p>
          </div>
        </div>

        <CameraGrid />
      </main>
    </OperationalShell>
  );
}
