"use client";

import Link from "next/link";
import { AlertTriangle, Clock, Info } from "lucide-react";

const filters = ["All", "Critical", "Warnings", "Info"] as const;

const alerts = [
  {
    type: "critical",
    title: "Batch AGT-1103 flagged: GMO disclosure missing",
    description: "GreenFields Farms, Kaduna",
    time: "2 hours ago",
    href: "/dashboard/trace/AGT-1103",
  },
  {
    type: "warning",
    title: "Farm ID #0892 inspection overdue",
    description: "Sunrise Agro Ltd., Oyo State",
    time: "5 hours ago",
    href: "/dashboard/farms",
  },
  {
    type: "critical",
    title: "Batch AGT-0987 failed residue test (Chlorpyrifos)",
    description: "Ife Agri Cooperative, Edo",
    time: "8 hours ago",
    href: "/dashboard/trace/AGT-0987",
  },
  {
    type: "warning",
    title: "AGT-0041 awaiting inspection",
    description: "Due Jun 25",
    time: "1 day ago",
    href: "/dashboard/trace/AGT-0041",
  },
  {
    type: "info",
    title: "Submit Q2 farming practices report",
    description: "Due Jun 30",
    time: "1 day ago",
    href: "/dashboard/reports",
  },
  {
    type: "warning",
    title: "Incomplete documentation for Batch AGT-1044",
    description: "Niger Delta Rice Farms, Rivers",
    time: "2 days ago",
    href: "/dashboard/trace/AGT-1044",
  },
  {
    type: "info",
    title: "Renew NASC seed certification",
    description: "Due Jul 15",
    time: "3 days ago",
    href: "/dashboard/compliance",
  },
  {
    type: "info",
    title: "New compliance guideline published by NAFDAC",
    description: "Network-wide",
    time: "4 days ago",
    href: "/dashboard/compliance",
  },
];

export default function AlertsPage() {
  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Alerts
        </h1>
        <p className="mt-1 text-agri-muted">
          Stay on top of inspections, compliance flags, and supply chain events.
        </p>
      </header>

      <div className="mb-6 flex gap-2 px-8">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`rounded-full px-3.5 py-1.5 text-sm ${
              index === 0
                ? "bg-accent-blue text-white"
                : "border border-agri-border text-agri-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mx-8 flex flex-col gap-3">
        {alerts.map((alert) => {
          const iconStyles =
            alert.type === "critical"
              ? "bg-accent-red/20 text-accent-red"
              : alert.type === "warning"
                ? "bg-accent-amber/20 text-accent-amber"
                : "bg-accent-blue/20 text-accent-blue";

          const Icon =
            alert.type === "critical"
              ? AlertTriangle
              : alert.type === "warning"
                ? Clock
                : Info;

          return (
            <div
              key={alert.title}
              className="flex items-start gap-4 rounded-xl border border-agri-border bg-agri-surface p-4"
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconStyles}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-agri-text">
                  {alert.title}
                </p>
                <p className="mt-1 text-xs text-agri-muted">
                  {alert.description}
                </p>
                <p className="mt-1 text-xs text-agri-muted">{alert.time}</p>
              </div>
              <Link
                href={alert.href}
                className="flex-shrink-0 text-xs text-accent-blue"
              >
                Review →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
