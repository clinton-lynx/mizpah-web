"use client";

import { useState, type ReactNode } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  LabelList,
} from "recharts";

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
  { label: "System Health", href: "/system-health", icon: "monitor_heart" },
  { label: "Analytics", href: "/analytics", icon: "query_stats", active: true },
] as const;

const statCards = [
  {
    label: "TOTAL MATCHES (24H)",
    value: "12,482",
    icon: "group",
    badge: "+12.4%",
    badgeClass: "bg-primary text-on-primary",
    progressClass: "bg-primary",
    progressWidth: "84%",
    valueClass: "text-primary",
    valueSuffix: null,
  },
  {
    label: "WATCHLIST HITS",
    value: "143",
    icon: "warning",
    badge: "+3 Critical",
    badgeClass: "bg-error-container text-[#9e0007]",
    progressClass: "bg-[#ffb4ab]",
    progressWidth: "12%",
    valueClass: "text-[#ffb4ab]",
    valueSuffix: "bars",
  },
  {
    label: "MISSING PERSONS LOCATED",
    value: "14",
    icon: "verified",
    badge: "Goal 100%",
    badgeClass: "bg-[#ff9f7d] text-[#3d1102]",
    progressClass: "bg-[#ffb59e]",
    progressWidth: "100%",
    valueClass: "text-[#ffb59e]",
    valueSuffix: null,
  },
] as const;

const trendData = [
  { label: "00:00", normal: 34, watchlist: 26 },
  { label: "04:00", normal: 43, watchlist: 28 },
  { label: "08:00", normal: 40, watchlist: 27 },
  { label: "12:00", normal: 72, watchlist: 26 },
  { label: "16:00", normal: 18, watchlist: 30 },
  { label: "20:00", normal: 83, watchlist: 36 },
  { label: "23:59", normal: 48, watchlist: 44 },
];

const confidenceData = [
  { label: "0-20%", value: 18, fill: "#59dbc7" },
  { label: "21-50%", value: 42, fill: "#59dbc7" },
  { label: "51-85%", value: 91, fill: "#79f7e3" },
  { label: "86-100%", value: 68, fill: "#59dbc7" },
];

const leaderboardRows = [
  {
    id: "GATE_A_MAIN_ENTRANCE",
    status: "ACTIVE",
    statusTone: "teal",
    total: "4,821",
    trend: "↑ 4%",
    trendTone: "text-primary",
    confidence: "94.2%",
    peakTime: "08:42:12",
    dot: "bg-primary",
  },
  {
    id: "ZONE_C_SECURE_PERIMETER",
    status: "HIGH ALERT",
    statusTone: "red",
    total: "2,109",
    trend: "↑ 18%",
    trendTone: "text-[#ffb4ab]",
    confidence: "89.8%",
    peakTime: "14:15:00",
    dot: "bg-[#ffb4ab]",
  },
  {
    id: "SOUTH_HALL_ELEVATORS",
    status: "ACTIVE",
    statusTone: "teal",
    total: "1,852",
    trend: "↓ 2%",
    trendTone: "text-on-surface-variant",
    confidence: "96.1%",
    peakTime: "12:30:45",
    dot: "bg-primary",
  },
  {
    id: "LOADING_DOCK_B",
    status: "MAINTENANCE",
    statusTone: "muted",
    total: "432",
    trend: "--",
    trendTone: "text-on-surface-variant",
    confidence: "91.4%",
    peakTime: "03:00:21",
    dot: "bg-[#ffb59e]",
  },
] as const;

function AnalyticsSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[280px] border-r border-outline-variant bg-surface-container-lowest px-5 py-5">
      <div className="flex h-full flex-col">
        <div className="pb-8">
          <div className="text-[31px] font-extrabold tracking-[-0.06em] text-primary">
            Mizpah
          </div>
          <div className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
            VIGILANCE &amp; PRECISION
          </div>
        </div>

        <nav className="space-y-6">
          <section>
            <div className="mb-3 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
              Operational
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-full px-3 py-3 transition-colors ${
                    item.active
                      ? "bg-primary text-on-primary shadow-[0_0_0_1px_rgba(89,219,199,0.22)]"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name={item.icon} className="text-[20px]" />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </section>

        </nav>

        <div className="mt-auto space-y-4 pt-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#ffb4ab]/70 bg-[#c10f11] px-4 py-3 font-label-mono text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:brightness-95"
            type="button"
          >
            Emergency Lock
          </button>

          <div className="overflow-hidden border-t border-outline-variant pt-3">
            <div className="ticker-track font-label-mono text-[10px] uppercase tracking-[0.08em] text-on-surface-variant">
              <span>
                INTERNAL OPERATIONAL USE ONLY // NODE: CC-MIZ-04 // LAT: 37.7749 N LON: 122.4194 W
              </span>
              <span aria-hidden="true">
                INTERNAL OPERATIONAL USE ONLY // NODE: CC-MIZ-04 // LAT: 37.7749 N LON: 122.4194 W
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function AnalyticsTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-start justify-between gap-6 border-b border-outline-variant pb-4">
      <div className="max-w-[320px]">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <MaterialIcon name="menu" className="text-[20px]" />
          </button>
          <h1 className="text-[31px] font-bold tracking-[-0.04em] text-on-surface">
            Mizpah Operational Command
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="border-l border-outline-variant pl-4">
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(89,219,199,0.12)]" />
            <span className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-primary">
              System Normal
            </span>
          </div>
        </div>

        <label className="relative w-[320px]">
          <MaterialIcon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant"
          />
          <input
            aria-label="Search events"
            className="h-12 w-full rounded-sm border border-outline-variant bg-surface-container-high pl-12 pr-4 text-[14px] text-on-surface placeholder:text-on-surface-variant focus:outline-none"
            placeholder="Search events..."
            readOnly
            type="text"
          />
        </label>

        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
          type="button"
        >
          <MaterialIcon name="notifications" className="text-[26px]" />
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-[#ffb4ab]" />
        </button>

        <div className="flex items-center gap-4">
          <span className="text-[14px] font-medium text-on-surface">Dispatcher DC</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/45 text-primary">
            <MaterialIcon name="account_circle" className="text-[28px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

function AnalyticsStatCard({
  label,
  value,
  icon,
  badge,
  badgeClass,
  progressClass,
  progressWidth,
  valueClass,
  valueSuffix,
}: (typeof statCards)[number]) {
  return (
    <article className="min-h-[140px] rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
            {label}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className={`text-[44px] font-bold leading-none tracking-[-0.04em] ${valueClass}`}>
              {value}
            </div>
            {badge ? (
              <div className={`rounded-sm px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.08em] ${badgeClass}`}>
                {badge}
              </div>
            ) : null}
            {valueSuffix === "bars" ? <MiniBars /> : null}
          </div>
        </div>

        <MaterialIcon name={icon} className="text-[30px] text-on-surface-variant/60" />
      </div>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
        <div className={`h-full ${progressClass}`} style={{ width: progressWidth }} />
      </div>
    </article>
  );
}

function MiniBars() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 20" className="h-6 w-10 text-[#b80f0d]">
      <rect x="0" y="10" width="5" height="10" fill="currentColor" />
      <rect x="8" y="6" width="5" height="14" fill="currentColor" />
      <rect x="16" y="2" width="5" height="18" fill="currentColor" />
      <rect x="24" y="8" width="5" height="12" fill="currentColor" />
      <rect x="32" y="4" width="5" height="16" fill="currentColor" />
      <rect x="40" y="11" width="4" height="9" fill="currentColor" />
    </svg>
  );
}

function MatchTrendsChart() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-on-surface">
          Match Trends (24h Frequency)
        </h2>
        <div className="flex items-center gap-4 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-primary" />
            NORMAL
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 bg-[#ffb4ab]" />
            WATCHLIST
          </span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid stroke="#25313a" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#bbcac5", fontFamily: "JetBrains Mono", fontSize: 11 }}
              dy={10}
            />
            <Tooltip
              contentStyle={{
                background: "#1d2022",
                border: "1px solid #3c4946",
                borderRadius: "4px",
                color: "#e0e3e5",
                fontFamily: "JetBrains Mono",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#59dbc7" }}
              itemStyle={{ color: "#e0e3e5" }}
            />
            <Line
              dataKey="normal"
              stroke="#59dbc7"
              strokeWidth={3}
              dot={false}
              type="monotone"
            />
            <Line
              dataKey="watchlist"
              stroke="#ffb4ab"
              strokeWidth={3}
              dot={false}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ConfidenceDistChart() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
      <h2 className="mb-4 text-[24px] font-semibold tracking-[-0.03em] text-on-surface">
        Confidence Dist.
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={confidenceData} margin={{ top: 26, right: 0, bottom: 10, left: 0 }}>
            <CartesianGrid stroke="transparent" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#e0e3e5", fontFamily: "JetBrains Mono", fontSize: 11 }}
              dy={10}
            />
            <Tooltip
              contentStyle={{
                background: "#1d2022",
                border: "1px solid #3c4946",
                borderRadius: "4px",
                color: "#e0e3e5",
                fontFamily: "JetBrains Mono",
                fontSize: "11px",
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={38}>
              {confidenceData.map((entry) => (
                <Cell key={entry.label} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                content={({ x, y, width, value }) => (
                  <text
                    x={Number(x ?? 0) + Number(width ?? 0) / 2}
                    y={Number(y ?? 0) - 8}
                    fill="#e0e3e5"
                    fontFamily="JetBrains Mono"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {`${value}%`}
                  </text>
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function StatusBadge({
  tone,
  children,
}: {
  tone: "teal" | "red" | "muted";
  children: ReactNode;
}) {
  const styles =
    tone === "teal"
      ? "border-primary/50 text-primary"
      : tone === "red"
        ? "border-[#ffb4ab]/50 text-[#ffb4ab]"
        : "border-outline-variant text-on-surface-variant";

  return (
    <span className={`inline-flex rounded-sm border px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.08em] ${styles}`}>
      {children}
    </span>
  );
}

function ZoneLeaderboardTable() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
        <h2 className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface">
          DETECTIONS BY ZONE LEADERBOARD
        </h2>
        <a href="#" className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-primary">
          View All Zones →
        </a>
      </div>

      <div className="grid grid-cols-[1.3fr_.7fr_1fr_.8fr_.8fr] border-b border-outline-variant px-5 py-3 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
        <div>Zone Identifier</div>
        <div>Status</div>
        <div>Total Detections</div>
        <div>Avg. Confidence</div>
        <div>Peak Time</div>
      </div>

      <div>
        {leaderboardRows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1.3fr_.7fr_1fr_.8fr_.8fr] items-center border-b border-outline-variant px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3 font-label-mono text-[14px] text-on-surface">
              <span className={`h-2.5 w-2.5 rounded-full ${row.dot}`} />
              {row.id}
            </div>
            <div>
              <StatusBadge tone={row.statusTone}>{row.status}</StatusBadge>
            </div>
            <div className="font-body-md text-[14px] text-on-surface">
              <span>{row.total}</span>
              <span className={`ml-2 font-label-mono text-[11px] ${row.trendTone}`}>{row.trend}</span>
            </div>
            <div className="text-[14px] text-on-surface">{row.confidence}</div>
            <div className="font-label-mono text-[14px] text-on-surface-variant">{row.peakTime}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CriticalMatchToast() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex w-[320px] items-start gap-4 rounded-lg border border-outline-variant bg-surface-container-high p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-outline-variant bg-surface-container">
        <span className="font-label-mono text-[22px] text-[#ffb4ab]">!</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-label-mono text-[11px] uppercase tracking-[0.08em] text-[#ffb4ab]">
          CRITICAL MATCH DETECTED
        </div>
        <div className="mt-1 text-[14px] text-on-surface-variant">
          Zone B Perimiter - Match Score 98%
        </div>
      </div>

      <button
        aria-label="Dismiss notification"
        className="text-[26px] leading-none text-on-surface-variant transition-colors hover:text-on-surface"
        onClick={() => setVisible(false)}
        type="button"
      >
        ×
      </button>
    </div>
  );
}

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative h-screen overflow-hidden bg-background text-on-surface">
      <AppSidebar
        activeNav="analytics"
        mobileOpen={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
        variant="analytics"
      />
      <CriticalMatchToast />

      <div className="h-full min-w-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:ml-[280px]">
        <div className="flex min-h-full flex-col">
          <AnalyticsTopBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="mt-5 space-y-6">
            <section className="grid gap-5 xl:grid-cols-3">
              {statCards.map((card) => (
                <AnalyticsStatCard key={card.label} {...card} />
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
              <MatchTrendsChart />
              <ConfidenceDistChart />
            </section>

            <ZoneLeaderboardTable />

            <footer className="pb-2 font-label-mono text-[10px] uppercase tracking-[0.08em] text-on-surface-variant">
              INTERNAL OPERATIONAL USE ONLY // NODE: CC-MIZ-04 // LAT: 37.7749 N LON: 122.4194 W
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
