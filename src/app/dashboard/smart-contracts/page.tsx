import { Code2, Copy, FileCheck, ShieldCheck, Truck } from "lucide-react";

const contracts = [
  {
    name: "ProduceRegistry",
    description: "Registers and stores batch data on-chain",
    address: "0x4F3a8B2c6D9e1F5a7C3b8D2e6F9a1C5b8D3e7F2a",
    icon: FileCheck,
    iconColor: "text-accent-green bg-accent-green/20",
  },
  {
    name: "ComplianceRegistry",
    description: "Stores inspection results and biosafety certificates",
    address: "0x7C2e9A4d6B1f3E8c5A2d9F6b3E1c8A4d7F2e9B6c",
    icon: ShieldCheck,
    iconColor: "text-accent-blue bg-accent-blue/20",
  },
  {
    name: "SupplyChainLedger",
    description: "Records custody handoffs between supply chain actors",
    address: "0x2B8e5A1c9D4f7B3e6A8d1F5c9B2e6A4d8F1c5E9b",
    icon: Truck,
    iconColor: "text-accent-amber bg-accent-amber/20",
  },
];

export default function SmartContractsPage() {
  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <div className="mb-3 flex items-center gap-2">
          <Code2 className="h-4 w-4 text-accent-blue" />
          <span className="text-xs font-bold tracking-widest text-accent-blue">
            DEPLOYED CONTRACTS
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Smart Contracts
        </h1>
        <p className="mt-1 text-agri-muted">
          The on-chain infrastructure powering AgriTrust.
        </p>
      </header>

      <div className="mx-8 mb-6 grid grid-cols-3 gap-4">
        {contracts.map((contract) => {
          const Icon = contract.icon;

          return (
            <div
              key={contract.name}
              className="rounded-xl border border-agri-border bg-agri-surface p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${contract.iconColor}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-agri-text">
                    {contract.name}
                  </h2>
                  <p className="mt-1 text-sm text-agri-muted">
                    {contract.description}
                  </p>
                </div>
                <span className="rounded-full bg-accent-green/20 px-2 py-0.5 text-xs font-bold text-accent-green">
                  ACTIVE
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-agri-muted">Contract address</p>
                <p className="mt-1 break-all font-mono text-xs text-accent-cyan">
                  {contract.address} <Copy className="ml-1 inline h-3 w-3" />
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-8 flex items-center justify-between rounded-xl border border-agri-border bg-agri-surface p-5">
        <div>
          <p className="text-sm font-semibold text-agri-text">Network</p>
          <p className="mt-1 text-xs text-agri-muted">Polygon Amoy Testnet</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
          <p className="text-xs text-accent-green">Connected</p>
        </div>
      </div>
    </div>
  );
}
