"use client";

import { useState, type ReactNode } from "react";

import AppSidebar from "@/components/shared/AppSidebar";
import TopBar from "@/components/live-monitor/TopBar";

export default function OperationalShell({
  activeNav,
  uppercaseTabs = false,
  topBarMode = "default",
  topBarActiveTabOverride,
  children,
  rightRail,
}: {
  activeNav: "dashboard" | "event-log" | "watchlists" | "enroll" | "system-health" | "analytics";
  uppercaseTabs?: boolean;
  topBarMode?: "default" | "muted";
  topBarActiveTabOverride?: "/dashboard" | "/live-monitor" | "/watchlists" | null;
  children: ReactNode;
  rightRail?: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  return (
    <div className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(89,219,199,0.07),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,181,158,0.05),transparent_26%),linear-gradient(180deg,#101415_0%,#0b0f10_100%)]">
      <AppSidebar activeNav={activeNav} variant="operations" mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      {rightRail ? (
        <>
          <button
            aria-label="Close alerts panel"
            className={`fixed inset-0 z-40 bg-black/50 transition-opacity xl:hidden ${
              railOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setRailOpen(false)}
            type="button"
          />
          <div
            className={`fixed right-0 top-0 z-50 h-screen w-[320px] transition-transform duration-200 ease-out xl:hidden ${
              railOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {rightRail}
          </div>
          <div className="fixed right-0 top-0 z-30 hidden h-screen w-[320px] xl:block">
            {rightRail}
          </div>
        </>
      ) : null}

      <div className={`flex h-full min-w-0 flex-col px-4 py-4 sm:px-5 sm:py-5 lg:ml-[280px] ${rightRail ? "xl:mr-[320px]" : ""}`}>
        <TopBar
          uppercaseTabs={uppercaseTabs}
          mode={topBarMode}
          activeTabOverride={topBarActiveTabOverride}
          onMenuClick={() => setSidebarOpen(true)}
          onNotificationsClick={rightRail ? () => setRailOpen((open) => !open) : undefined}
          showMenuButton
        />
        {children}
      </div>
    </div>
  );
}
