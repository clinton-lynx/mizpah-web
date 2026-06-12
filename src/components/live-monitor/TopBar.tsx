"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import MaterialIcon from "@/components/shared/MaterialIcon";

type TabHref = "/dashboard" | "/live-monitor" | "/watchlists";
type TopBarMode = "default" | "muted";

const tabs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Active Feeds", href: "/live-monitor" },
  { label: "Personnel", href: "/watchlists" },
] as const;

export default function TopBar({
  uppercaseTabs = false,
  activeTabOverride,
  mode = "default",
  onMenuClick,
  onNotificationsClick,
  showMenuButton = false,
  showNotificationsButton = false,
}: {
  uppercaseTabs?: boolean;
  activeTabOverride?: TabHref | null;
  mode?: TopBarMode;
  onMenuClick?: () => void;
  onNotificationsClick?: () => void;
  showMenuButton?: boolean;
  showNotificationsButton?: boolean;
}) {
  const pathname = usePathname();

  const isActive = (href: TabHref) => {
    if (mode === "muted") return false;
    if (activeTabOverride !== undefined) return activeTabOverride === href;
    return pathname === href || (href === "/watchlists" && pathname.startsWith("/watchlists"));
  };

  const tabLabel = (label: string) => (uppercaseTabs ? label.toUpperCase() : label);

  return (
    <header className="flex items-start justify-between gap-4 border-b border-outline-variant/60 pb-4">
      <div className="min-w-0 space-y-3">
        <div className="flex items-center gap-3">
          {showMenuButton ? (
            <button
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface lg:hidden"
              onClick={onMenuClick}
              type="button"
            >
              <MaterialIcon name="menu" className="text-[20px]" />
            </button>
          ) : null}
          <div className="min-w-0 text-[22px] font-bold tracking-[-0.03em] text-primary">
          Mizpah Operational Command
          </div>
        </div>
        <nav aria-label="Dashboard sections" className="hidden items-center gap-6 lg:flex">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-1 text-sm transition-colors hover:text-on-surface ${
                isActive(tab.href)
                  ? "border-b-2 border-primary text-on-surface"
                  : mode === "muted"
                    ? "text-on-surface-variant"
                    : "text-on-surface-variant"
              }`}
            >
              {tabLabel(tab.label)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary-container/20 px-3 py-2 text-sm text-on-surface">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5effa7] opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#5effa7]" />
          </span>
          <span className="font-semibold">System Normal</span>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <MaterialIcon name="notifications" className="text-[20px]" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          aria-label="Admin shield"
        >
          <MaterialIcon name="shield" className="text-[20px]" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-[radial-gradient(circle_at_30%_30%,rgba(89,219,199,0.9),rgba(16,20,21,0.95))] text-sm font-bold text-on-primary">
          AD
        </div>
      </div>
    </header>
  );
}
