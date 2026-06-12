"use client";

import { useState } from "react";
import Link from "next/link";

import AppSidebar from "@/components/shared/AppSidebar";
import MaterialIcon from "@/components/shared/MaterialIcon";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Live Monitor", href: "/dashboard", icon: "videocam" },
  { label: "Event Log", href: "/event-log", icon: "list_alt" },
  { label: "Watchlists", href: "/watchlists", icon: "search" },
  { label: "System Health", href: "/system-health", icon: "monitor_heart", active: true },
  { label: "Analytics", href: "/analytics", icon: "query_stats" },
] as const;

const statCards = [
  {
    label: "CORE UPTIME",
    value: "99.9%",
    icon: "trending_up",
    accent: "bg-primary",
    progressClass: "bg-primary",
    progressWidth: "97%",
    valueClass: "text-primary",
  },
  {
    label: "ACTIVE CAMERAS",
    value: "48/50",
    icon: "videocam",
    accent: "bg-primary",
    progressClass: "bg-primary",
    progressWidth: "96%",
    valueClass: "text-on-surface",
  },
  {
    label: "SERVER LOAD",
    value: "43%",
    icon: "dns",
    accent: "bg-secondary",
    progressClass: "bg-secondary",
    progressWidth: "43%",
    valueClass: "text-secondary",
  },
  {
    label: "NETWORK LATENCY",
    value: "12ms",
    icon: "speed",
    accent: "bg-primary",
    progressClass: "bg-primary",
    progressWidth: "15%",
    valueClass: "text-primary",
  },
] as const;

const cameraRows = [
  { id: "CAM-01", location: "Main Gate East", status: "Online", uptime: "14d 2h", online: true },
  { id: "CAM-02", location: "Loading Dock B", status: "Online", uptime: "8d 14h", online: true },
  { id: "CAM-03", location: "Secure Perimeter N", status: "Offline", uptime: "—", online: false },
  { id: "CAM-04", location: "Lobby Reception", status: "Online", uptime: "31d 9h", online: true },
  { id: "CAM-05", location: "Parking Level G1", status: "Online", uptime: "12h 45m", online: true },
] as const;

const gpuNodes = [
  { name: "Node_A1 (RTX 4090)", utilization: 82, temp: "72°C", memory: "18.2/24 GB", width: "82%", note: null },
  { name: "Node_A2 (RTX 4090)", utilization: 65, temp: "68°C", memory: "14.5/24 GB", width: "65%", note: null },
  { name: "Node_B1 (RTX 4090)", utilization: 24, temp: "52°C", memory: "4.8/24 GB", width: "24%", note: null },
  { name: "Node_B2 (RTX 4090)", utilization: 94, temp: "84°C", memory: null, width: "94%", note: "High Utilization" },
] as const;

const diagnosticRows = [
  {
    timestamp: "2023-10-27 14:24:02.11",
    source: "NODE_B2",
    details: "GPU Memory usage exceeded 90% threshold for >30s",
    severity: "critical",
  },
  {
    timestamp: "2023-10-27 14:21:45.09",
    source: "CORE_NET",
    details: "Scheduled firewall rules update successful",
    severity: "info",
  },
  {
    timestamp: "2023-10-27 14:18:12.55",
    source: "CAM_CONTROLLER",
    details: "Re-establishing connection with CAM-03... Retrying (3/5)",
    severity: "warning",
  },
  {
    timestamp: "2023-10-27 14:15:33.10",
    source: "SYS_AUTH",
    details: "New session initialized for user: Dispatcher DC",
    severity: "info",
  },
] as const;

function SystemHealthTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-outline-variant pb-4">
      <div className="flex items-center gap-4">
        <button
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <MaterialIcon name="menu" className="text-[20px]" />
        </button>
        <h1 className="text-[31px] font-bold tracking-[-0.04em] text-on-surface">
          System Health
        </h1>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(89,219,199,0.12)]" />
          <span className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-primary">
            System Normal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="relative w-[280px]">
          <MaterialIcon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant"
          />
          <input
            aria-label="Search parameters"
            className="h-10 w-full rounded-sm border border-outline-variant bg-surface-container-high pl-10 pr-3 text-[14px] text-on-surface placeholder:text-on-surface-variant focus:outline-none"
            placeholder="Search parameters..."
            readOnly
            type="text"
          />
        </label>

        <button
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
          type="button"
        >
          <MaterialIcon name="notifications" className="text-[24px]" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-on-surface">Dispatcher DC</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/45 text-primary">
            <MaterialIcon name="account_circle" className="text-[28px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  icon,
  progressWidth,
  progressClass,
  valueClass,
}: (typeof statCards)[number]) {
  return (
    <article className="flex min-h-[144px] flex-col rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-label-mono text-label-mono text-on-surface-variant">{label}</div>
          <div className="mt-2 flex items-baseline gap-1">
            {label === "ACTIVE CAMERAS" ? (
              <>
                <span className={`text-[44px] font-bold leading-none tracking-[-0.04em] ${valueClass}`}>
                  48
                </span>
                <span className="pb-1 text-[16px] leading-none text-on-surface-variant">/50</span>
              </>
            ) : (
              <span className={`text-[44px] font-bold leading-none tracking-[-0.04em] ${valueClass}`}>
                {value}
              </span>
            )}
          </div>
        </div>

        <MaterialIcon name={icon} className="text-[28px] text-primary" />
      </div>

      <div className="mt-auto pt-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
          <div className={`h-full ${progressClass}`} style={{ width: progressWidth }} />
        </div>
      </div>
    </article>
  );
}

function CameraStatusTable() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
        <h2 className="font-label-mono text-label-mono text-on-surface">Camera Status Matrix</h2>
        <span className="font-label-mono text-label-mono text-primary">Real-Time</span>
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-[90px_minmax(0,1.4fr)_120px_90px] border-b border-outline-variant px-5 py-3 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
          <div>ID</div>
          <div>Location</div>
          <div>Status</div>
          <div>Uptime</div>
        </div>

        {cameraRows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[90px_minmax(0,1.4fr)_120px_90px] items-center border-b border-outline-variant px-5 py-4 last:border-b-0"
          >
            <div className="font-label-mono text-[14px] text-primary">{row.id}</div>
            <div className="truncate text-[14px] text-on-surface">{row.location}</div>
            <div
              className={`flex items-center gap-2 font-label-mono text-[14px] ${
                row.online ? "text-on-surface" : "text-[#ffb4ab]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${row.online ? "bg-primary" : "bg-[#ffb4ab]"}`}
              />
              {row.status}
            </div>
            <div className="font-label-mono text-[14px] text-on-surface-variant">{row.uptime}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GpuNodeCard({
  name,
  utilization,
  temp,
  memory,
  width,
  note,
}: (typeof gpuNodes)[number]) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <div className="font-label-mono text-[14px] text-on-surface">{name}</div>
        <div className="font-label-mono text-[14px] text-primary">{utilization}%</div>
      </div>

      <div
        className={`h-10 overflow-hidden rounded-sm border ${
          note ? "border-[#ff7f5f]" : "border-outline-variant"
        } bg-surface-container-highest`}
      >
        <div className="h-full bg-primary" style={{ width }} />
      </div>

      <div className="flex items-center justify-between gap-4 font-label-mono text-[12px] text-on-surface-variant">
        <span>Temp: {temp}</span>
        {note ? <span className="text-[#ffb4ab]">{note}</span> : <span>Memory: {memory}</span>}
      </div>
    </div>
  );
}

function GpuNodeGrid() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
        <h2 className="font-label-mono text-label-mono text-on-surface">
          AI Processing Nodes (GPU Utilization)
        </h2>
        <div className="flex items-center gap-4 font-label-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="flex items-center gap-2 text-on-surface">
            <span className="h-2.5 w-2.5 bg-primary" />
            Active
          </span>
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="h-2.5 w-2.5 bg-surface-container-highest" />
            Available
          </span>
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-8 px-5 py-6 md:grid-cols-2">
        {gpuNodes.map((node) => (
          <GpuNodeCard key={node.name} {...node} />
        ))}
      </div>
    </section>
  );
}

function SeverityBadge({ tone }: { tone: "critical" | "warning" | "info" }) {
  if (tone === "critical") {
    return (
      <span className="inline-flex rounded-sm border border-[#ffb4ab] bg-error-container px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.08em] text-white">
        Critical
      </span>
    );
  }

  if (tone === "warning") {
    return (
      <span className="inline-flex rounded-sm border border-[#ffb694] px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.08em] text-[#ffb694]">
        Warning
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-sm border border-outline-variant px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
      Info
    </span>
  );
}

function DiagnosticLogsTable() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between gap-4 border-b border-outline-variant px-5 py-4">
        <div className="flex items-center gap-4">
          <h2 className="font-label-mono text-label-mono text-on-surface">
            System Diagnostic Logs
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="rounded-sm border border-outline-variant bg-surface-container-high px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface"
              type="button"
            >
              All
            </button>
            <button
              className="rounded-sm border border-outline-variant bg-transparent px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant"
              type="button"
            >
              Critical (2)
            </button>
          </div>
        </div>

        <button
          aria-label="Download logs"
          className="flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
          type="button"
        >
          <MaterialIcon name="download" className="text-[24px]" />
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="grid grid-cols-[270px_170px_minmax(0,1fr)_140px] border-b border-outline-variant px-5 py-3 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
          <div>Timestamp</div>
          <div>Source</div>
          <div>Event Details</div>
          <div>Severity</div>
        </div>

        {diagnosticRows.map((row) => (
          <div
            key={`${row.timestamp}-${row.source}`}
            className="grid grid-cols-[270px_170px_minmax(0,1fr)_140px] items-center border-b border-outline-variant px-5 py-5 last:border-b-0"
          >
            <div className="font-label-mono text-[14px] text-on-surface-variant">{row.timestamp}</div>
            <button
              className="w-fit font-label-mono text-[14px] text-primary transition-colors hover:underline"
              type="button"
            >
              {row.source}
            </button>
            <div className="pr-4 text-[14px] text-on-surface">{row.details}</div>
            <div className="justify-self-end">
              <SeverityBadge tone={row.severity} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SystemHealthPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-background text-on-surface">
      <AppSidebar
        activeNav="system-health"
        mobileOpen={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        variant="system-health"
      />

      <div className="h-full min-w-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:ml-[280px]">
        <div className="flex min-h-full flex-col">
          <SystemHealthTopBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="mt-5 space-y-6">
            <section className="grid gap-4 xl:grid-cols-4">
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-12">
              <div className="xl:col-span-5">
                <CameraStatusTable />
              </div>
              <div className="xl:col-span-7">
                <GpuNodeGrid />
              </div>
            </section>

            <DiagnosticLogsTable />
          </main>
        </div>
      </div>
    </div>
  );
}
