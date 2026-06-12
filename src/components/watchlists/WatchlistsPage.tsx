import OperationalShell from "@/components/shared/OperationalShell";
import MaterialIcon from "@/components/shared/MaterialIcon";
import CaseFilterTabs from "@/components/watchlists/CaseFilterTabs";
import CaseListRow, { type CaseRow } from "@/components/watchlists/CaseListRow";
import CaseSearchBar from "@/components/watchlists/CaseSearchBar";

const cases: CaseRow[] = [
  {
    slug: "emeka-okafor",
    initials: "EO",
    name: "Emeka Okafor",
    subtitle: "Enrolled 7 Jun 2026 · Gate A match today",
    category: "WATCHLIST",
    status: "ACTIVE",
    avatarClassName: "bg-[#b64a4a]",
  },
  {
    slug: "taiwo-adeyemi",
    initials: "TA",
    name: "Taiwo Adeyemi",
    subtitle: "Enrolled 7 Jun 2026 · Last seen main hall",
    category: "MISSING",
    status: "ACTIVE",
    avatarClassName: "bg-[#d47b34]",
  },
  {
    slug: "adewale-balogun",
    initials: "AB",
    name: "Adewale Balogun",
    subtitle: "Enrolled 6 Jun 2026 · Blood type O+",
    category: "MEDICAL",
    status: "ACTIVE",
    avatarClassName: "bg-primary-container",
  },
  {
    slug: "biodun-martins",
    initials: "BM",
    name: "Biodun Martins",
    subtitle: "Enrolled 5 Jun 2026 · No matches yet",
    category: "WATCHLIST",
    status: "ACTIVE",
    avatarClassName: "bg-[#af4c42]",
  },
  {
    slug: "funke-ojo",
    initials: "FO",
    name: "Funke Ojo",
    subtitle: "Enrolled 4 Jun 2026 · Blood type A+",
    category: "MEDICAL",
    status: "ACTIVE",
    avatarClassName: "bg-[#cb6a4c]",
  },
  {
    slug: "kemi-adesanya",
    initials: "KA",
    name: "Kemi Adesanya",
    subtitle: "Enrolled 3 Jun 2026 · Found — exit B",
    category: "MISSING",
    status: "RESOLVED",
    avatarClassName: "bg-[#7a6d5f]",
  },
];

export default function WatchlistsPage() {
  return (
    <OperationalShell activeNav="dashboard">
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col px-2 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-primary">
              Cases
            </h1>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-container/90"
            >
              <MaterialIcon name="add" className="text-[18px]" />
              New case
            </button>
          </div>

          <div className="mt-5">
            <CaseFilterTabs />
          </div>

          <div className="mt-5">
            <CaseSearchBar />
          </div>

          <div className="mt-6 overflow-hidden">
            {cases.map((row) => (
              <CaseListRow key={row.slug} row={row} />
            ))}
          </div>
        </div>
      </main>
    </OperationalShell>
  );
}
