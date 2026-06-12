import Link from "next/link";

import MaterialIcon from "@/components/shared/MaterialIcon";
import CategoryBadge from "@/components/watchlists/CategoryBadge";
import StatusBadge from "@/components/watchlists/StatusBadge";

export type CaseRow = {
  slug: string;
  initials: string;
  name: string;
  subtitle: string;
  category: "WATCHLIST" | "MISSING" | "MEDICAL";
  status: "ACTIVE" | "RESOLVED";
  avatarClassName: string;
};

export default function CaseListRow({ row }: { row: CaseRow }) {
  return (
    <Link
      href={`/watchlists/${row.slug}`}
      className="flex items-center gap-4 border-b border-outline-variant/60 px-3 py-4 transition-colors hover:bg-surface-container-high/70"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-sm font-bold text-white ${row.avatarClassName}`}>
        {row.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-on-surface">{row.name}</div>
        <div className="mt-1 truncate text-sm text-on-surface-variant">{row.subtitle}</div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <CategoryBadge category={row.category} />
        <StatusBadge status={row.status} />
        <MaterialIcon name="chevron_right" className="text-[20px] text-on-surface-variant" />
      </div>
    </Link>
  );
}
