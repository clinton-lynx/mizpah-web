import Link from "next/link";

import MaterialIcon from "@/components/shared/MaterialIcon";

type ActiveNav =
  | "dashboard"
  | "event-log"
  | "watchlists"
  | "enroll"
  | "system-health"
  | "analytics";

const navGroups = [
  {
    label: "Operations",
    items: [
      { label: "Live Monitor", href: "/dashboard", id: "dashboard", icon: "videocam" },
      { label: "Event Log", href: "/event-log", id: "event-log", icon: "list_alt", badge: "3" },
      { label: "Watchlists", href: "/watchlists", id: "watchlists", icon: "search" },
      { label: "Enroll", href: "/enroll", id: "enroll", icon: "person_add" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "System Health", href: "/system-health", id: "system-health", icon: "monitor_heart" },
      { label: "Analytics", href: "/analytics", id: "analytics", icon: "query_stats" },
    ],
  },
] as const;

export default function Sidebar({ activeNav }: { activeNav: ActiveNav }) {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[280px] border-r border-outline-variant bg-surface-container-lowest/95 px-5 py-5 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex items-start gap-3 pb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary-container/20 text-primary shadow-[0_0_0_1px_rgba(89,219,199,0.08)]">
            <MaterialIcon name="shield" className="text-[22px]" />
          </div>
          <div className="pt-0.5">
            <div className="text-[28px] font-extrabold tracking-[-0.06em] text-primary">
              MIZPAH
            </div>
            <div className="font-label-mono text-label-mono uppercase tracking-[0.05em] text-on-surface-variant">
              AI VISION SAFETY
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {navGroups.map((group) => (
            <section key={group.label}>
              <p className="mb-2 px-3 font-label-mono text-label-mono uppercase tracking-[0.05em] text-on-surface-variant">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-full px-3 py-2 transition-colors ${
                      item.id === activeNav
                        ? "bg-primary text-on-primary shadow-[0_0_0_1px_rgba(89,219,199,0.3)]"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                    }`}
                  >
                    <MaterialIcon name={item.icon} className="text-[20px]" />
                    <span className="text-[14px] font-semibold">{item.label}</span>
                    {"badge" in item && item.badge ? (
                      <span className="ml-auto rounded-full bg-error px-2 py-0.5 font-label-mono text-[11px] leading-none text-on-error">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-auto space-y-4 pt-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-error/40 bg-error-container px-4 py-3 text-sm font-semibold text-[#ffd7d2] shadow-[0_0_24px_rgba(255,180,171,0.1)] transition-colors hover:bg-error-container/90">
            <MaterialIcon name="lock" className="text-[18px]" />
            Emergency Lock
          </button>

          <div className="space-y-1">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-full px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              <MaterialIcon name="settings" className="text-[18px]" />
              <span className="text-sm">Settings</span>
            </Link>
            <Link
              href="/support"
              className="flex items-center gap-3 rounded-full px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              <MaterialIcon name="help" className="text-[18px]" />
              <span className="text-sm">Support</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container px-3 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-bright text-sm font-semibold text-on-surface">
              DC
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-on-surface">
                Dispatcher DC
              </div>
              <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
                ON DUTY
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
