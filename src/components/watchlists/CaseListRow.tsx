import Link from "next/link";

import MaterialIcon from "@/components/shared/MaterialIcon";
import CategoryBadge from "@/components/watchlists/CategoryBadge";

export type CaseRow = {
  id: string;
  name: string;
  imageSrc: string | null;
  category: "watchlist" | "missing" | "medical";
  metaLine: string;
};

export default function CaseListRow({ row }: { row: CaseRow }) {
  return (
    <Link
      href={`/watchlists/${row.id}`}
      className="flex items-center gap-4 border-b border-outline-variant/60 px-3 py-4 transition-colors hover:bg-surface-container-high/70"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-surface-container-high text-sm font-bold text-white">
        {row.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.imageSrc} alt={row.name} className="h-full w-full object-cover" />
        ) : (
          <span>{row.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-on-surface">{row.name}</div>
        <div className="mt-1 truncate text-sm text-on-surface-variant">{row.metaLine}</div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <CategoryBadge category={row.category} />
        <MaterialIcon name="chevron_right" className="text-[20px] text-on-surface-variant" />
      </div>
    </Link>
  );
}
