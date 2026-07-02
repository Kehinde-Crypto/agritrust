import { History, Lock } from "lucide-react";

const stats = [
  { value: "18,447", label: "Total transactions" },
  { value: "1,204", label: "Active wallets" },
  { value: "100%", label: "Verified on-chain" },
];

const rows = [
  {
    hash: "0x8f2c4a7e1b9d3f...",
    type: "REGISTRATION",
    typeTone: "bg-accent-green/20 text-accent-green",
    batch: "AGT-0042",
    actor: "Amara Okafor",
    timestamp: "Jun 14, 2026 14:32",
    status: "CONFIRMED",
  },
  {
    hash: "0x4d9a2c8f6b1e3a...",
    type: "INSPECTION",
    typeTone: "bg-accent-blue/20 text-accent-blue",
    batch: "AGT-0042",
    actor: "NAFDAC-0042",
    timestamp: "Jun 17, 2026 09:15",
    status: "CONFIRMED",
  },
  {
    hash: "0x2e7b9a3d6c1f4b...",
    type: "CERTIFICATION",
    typeTone: "bg-accent-purple/20 text-accent-purple",
    batch: "AGT-0042",
    actor: "NAFDAC-0042",
    timestamp: "Jun 17, 2026 09:18",
    status: "CONFIRMED",
  },
  {
    hash: "0x7c1a5e9b3d2f8a...",
    type: "HANDOFF",
    typeTone: "bg-accent-amber/20 text-accent-amber",
    batch: "AGT-0042",
    actor: "PH Agri Logistics",
    timestamp: "Jun 19, 2026 11:02",
    status: "CONFIRMED",
  },
  {
    hash: "0x9f3b7d2e6a4c1f...",
    type: "REGISTRATION",
    typeTone: "bg-accent-green/20 text-accent-green",
    batch: "AGT-0044",
    actor: "Amara Okafor",
    timestamp: "Jun 12, 2026 08:47",
    status: "CONFIRMED",
  },
  {
    hash: "0x5e8c2a6d9f3b7e...",
    type: "INSPECTION",
    typeTone: "bg-accent-blue/20 text-accent-blue",
    batch: "AGT-0044",
    actor: "NAFDAC-0039",
    timestamp: "Jun 12, 2026 16:20",
    status: "CONFIRMED",
  },
  {
    hash: "0x1a4d8f2b6e9c3a...",
    type: "REGISTRATION",
    typeTone: "bg-accent-green/20 text-accent-green",
    batch: "AGT-0046",
    actor: "Folake Adebayo",
    timestamp: "Jun 11, 2026 10:05",
    status: "CONFIRMED",
  },
  {
    hash: "0x6b9e3a7c1f5d2b...",
    type: "HANDOFF",
    typeTone: "bg-accent-amber/20 text-accent-amber",
    batch: "AGT-0038",
    actor: "PH Agri Logistics",
    timestamp: "Jun 08, 2026 13:40",
    status: "CONFIRMED",
  },
];

export default function AuditTrailPage() {
  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <div className="mb-3 flex items-center gap-2">
          <History className="h-4 w-4 text-accent-purple" />
          <span className="text-xs font-bold tracking-widest text-accent-purple">
            IMMUTABLE LEDGER
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Audit Trail
        </h1>
        <p className="mt-1 text-agri-muted">
          Every blockchain transaction across the AgriTrust network, in order.
        </p>
      </header>

      <div className="mb-6 flex gap-4 px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-agri-border bg-agri-surface px-4 py-3"
          >
            <p className="text-lg font-bold text-agri-text">{stat.value}</p>
            <p className="text-sm text-agri-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-8 overflow-hidden rounded-xl border border-agri-border bg-agri-surface">
        <table className="min-w-full">
          <thead className="bg-agri-raised">
            <tr>
              {[
                "Tx Hash",
                "Type",
                "Batch ID",
                "Actor",
                "Timestamp",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-agri-muted"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.hash} className="border-t border-agri-border">
                <td className="px-4 py-3 font-mono text-xs text-accent-cyan">
                  {row.hash}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${row.typeTone}`}
                  >
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {row.batch}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {row.actor}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {row.timestamp}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  <span className="rounded-full bg-accent-green/20 px-2 py-0.5 text-xs font-bold text-accent-green">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-8 mt-4 flex items-center gap-2 rounded-lg border border-agri-border bg-agri-raised px-4 py-3">
        <Lock className="h-4 w-4 text-agri-muted" />
        <p className="text-xs text-agri-muted">
          This ledger is permanently anchored on-chain and cannot be edited or
          deleted.
        </p>
      </div>
    </div>
  );
}
