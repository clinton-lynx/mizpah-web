"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Video,
  ClipboardList,
  Search,
  UserPlus,
  Activity,
  BarChart2,
  Lock,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";

interface SidebarProps {
  alertCount?: number;
}

export default function Sidebar({ alertCount = 0 }: SidebarProps) {
  const pathname = usePathname();

  const getLinkClasses = (path: string, hasBadge: boolean = false) => {
    const isActive = pathname === path;
    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-full mb-1";
    const layoutClasses = hasBadge ? " justify-between" : "";
    
    if (isActive) {
      return `${baseClasses}${layoutClasses} text-on-primary bg-primary font-bold`;
    }
    return `${baseClasses}${layoutClasses} text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors`;
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-[280px] bg-surface-bright border-r border-outline-variant flex flex-col py-lg px-md z-20">
      {/* Header */}
      <div className="mb-xl flex items-center gap-sm">
        <div className="h-8 w-8 rounded bg-primary-container flex items-center justify-center">
          <Shield className="text-on-primary-container fill-on-primary-container" size={24} />
        </div>
        <div>
          <h1 className="font-display-lg text-display-lg font-bold text-primary tracking-tight">MIZPAH</h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant uppercase">AI Vision Safety</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 space-y-xs overflow-y-auto">
        <div className="mb-4">
          <p className="font-label-mono text-label-mono text-on-surface-variant mb-2 px-3 uppercase">Operations</p>
          <Link href="/" className={getLinkClasses("/", false)}>
            <Video size={24} />
            <span className="font-headline-sm text-headline-sm">Live Monitor</span>
          </Link>
          <Link href="/watchlists" className={getLinkClasses("/watchlists", false)}>
            <Search size={24} />
            <span className="font-headline-sm text-headline-sm">Watchlists</span>
          </Link>
          <Link href="/enroll" className={getLinkClasses("/enroll", false)}>
            <UserPlus size={24} />
            <span className="font-headline-sm text-headline-sm">Enroll</span>
          </Link>
        </div>
      </div>

      {/* CTA & Footer */}
      <div className="mt-auto pt-4 border-t border-outline-variant space-y-4">
        <button 
          className="w-full bg-error-container hover:bg-error text-on-error-container py-2 rounded font-headline-sm text-headline-sm transition-colors border border-error flex items-center justify-center gap-2 mb-4" 
          style={{ backgroundColor: "rgb(226, 75, 74)", color: "white" }}
        >
          <Lock size={24} />
          Emergency Lock
        </button>
        <div className="space-y-1 border-t border-outline-variant pt-4">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors rounded-full">
            <Settings size={24} />
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
          <Link href="/support" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors rounded-full">
            <HelpCircle size={24} />
            <span className="font-body-md text-body-md">Support</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 pt-4 px-2">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-headline-sm text-headline-sm border border-outline">
            DC
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm text-on-surface">Dispatcher DC</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">ON DUTY</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
