import MaterialIcon from "@/components/shared/MaterialIcon";

const rows = [
  {
    timestamp: "Today, 13:45:02",
    location: "Main Lobby - Cam 04",
    confidence: "99.8%",
  },
  {
    timestamp: "Today, 08:12:15",
    location: "Parking Garage VIP Entrance - Cam 12",
    confidence: "98.5%",
  },
  {
    timestamp: "Yesterday, 17:30:44",
    location: "Elevator Bank A - Cam 02",
    confidence: "99.1%",
  },
  {
    timestamp: "Yesterday, 08:05:22",
    location: "Main Lobby - Cam 04",
    confidence: "99.7%",
  },
] as const;

export function MatchHistoryRow({
  timestamp,
  location,
  confidence,
}: (typeof rows)[number]) {
  return (
    <tr className="border-t border-outline-variant/50">
      <td className="px-4 py-4 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface">{timestamp}</td>
      <td className="px-4 py-4 text-sm text-on-surface">{location}</td>
      <td className="px-4 py-4 font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
        {confidence}
      </td>
      <td className="px-4 py-4 font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
        VIEW FRAME
      </td>
    </tr>
  );
}

export default function MatchHistoryTable() {
  return (
    <section className="rounded-lg border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between border-b border-outline-variant/60 px-4 py-4">
        <div className="flex items-center gap-2">
          <MaterialIcon name="history" className="text-[20px] text-on-surface-variant" />
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-on-surface">
            Match History
          </h3>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-high text-on-surface-variant">
          <MaterialIcon name="filter_list" className="text-[18px]" />
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-outline-variant/50">
            <th className="px-4 py-3 text-left font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Timestamp
            </th>
            <th className="px-4 py-3 text-left font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Location / Camera
            </th>
            <th className="px-4 py-3 text-left font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Confidence
            </th>
            <th className="px-4 py-3 text-left font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <MatchHistoryRow key={`${row.timestamp}-${row.location}`} {...row} />
          ))}
        </tbody>
      </table>

      <div className="border-t border-outline-variant/50 py-4 text-center font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
        LOAD MORE
      </div>
    </section>
  );
}
