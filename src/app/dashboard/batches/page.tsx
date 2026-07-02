"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const stats = [
  { value: "47", label: "Total batches" },
  { value: "38", label: "Certified" },
  { value: "9", label: "In progress" },
];

const batches = [
  {
    id: "AGT-0042",
    crop: "Grade A Cocoa",
    quantity: "500 kg",
    farm: "Okafor Family Farm",
    status: "CERTIFIED",
    statusTone: "bg-accent-green/20 text-accent-green",
    registered: "Jun 14, 2026",
  },
  {
    id: "AGT-0043",
    crop: "Dried Hibiscus",
    quantity: "250 kg",
    farm: "Sunrise Agro Ltd",
    status: "IN TRANSIT",
    statusTone: "bg-accent-amber/20 text-accent-amber",
    registered: "Jun 13, 2026",
  },
  {
    id: "AGT-0044",
    crop: "Sesame Seeds",
    quantity: "1,000 kg",
    farm: "Northern Grains Co-op",
    status: "CERTIFIED",
    statusTone: "bg-accent-green/20 text-accent-green",
    registered: "Jun 12, 2026",
  },
  {
    id: "AGT-0045",
    crop: "Maize (White)",
    quantity: "750 kg",
    farm: "GreenFields Farms",
    status: "AWAITING INSPECTION",
    statusTone: "border border-accent-amber text-accent-amber",
    registered: "Jun 12, 2026",
  },
  {
    id: "AGT-0046",
    crop: "Palm Kernel",
    quantity: "600 kg",
    farm: "Ife Agri Cooperative",
    status: "FLAGGED",
    statusTone: "bg-accent-red/20 text-accent-red",
    registered: "Jun 11, 2026",
  },
  {
    id: "AGT-0047",
    crop: "Ginger",
    quantity: "300 kg",
    farm: "Niger Delta Rice Farms",
    status: "CERTIFIED",
    statusTone: "bg-accent-green/20 text-accent-green",
    registered: "Jun 11, 2026",
  },
  {
    id: "AGT-0048",
    crop: "Cowpea",
    quantity: "400 kg",
    farm: "Okafor Family Farm",
    status: "IN TRANSIT",
    statusTone: "bg-accent-amber/20 text-accent-amber",
    registered: "Jun 10, 2026",
  },
  {
    id: "AGT-0049",
    crop: "Cassava Chips",
    quantity: "850 kg",
    farm: "Sunrise Agro Ltd",
    status: "FLAGGED",
    statusTone: "bg-accent-red/20 text-accent-red",
    registered: "Jun 10, 2026",
  },
  {
    id: "AGT-0050",
    crop: "Yam Flour",
    quantity: "320 kg",
    farm: "Northern Grains Co-op",
    status: "REGISTERED",
    statusTone: "bg-accent-blue/20 text-accent-blue",
    registered: "Jun 09, 2026",
  },
  {
    id: "AGT-0051",
    crop: "Plantain",
    quantity: "480 kg",
    farm: "GreenFields Farms",
    status: "REGISTERED",
    statusTone: "bg-accent-blue/20 text-accent-blue",
    registered: "Jun 09, 2026",
  },
];

export default function BatchesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Batches
        </h1>
        <p className="mt-1 text-agri-muted">
          Every produce batch registered on AgriTrust.
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

      <div className="mb-6 flex flex-wrap items-center gap-3 px-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
          <input
            className="w-72 rounded-lg border border-agri-border bg-agri-surface py-2 pl-9 pr-4 text-sm text-agri-text placeholder:text-agri-muted focus:border-agri-border-focus focus:outline-none"
            placeholder="Search by batch ID or crop..."
          />
        </div>
        <select className="rounded-lg border border-agri-border bg-agri-surface px-3 py-2 text-sm text-agri-text">
          <option>All Statuses</option>
        </select>
        <select className="rounded-lg border border-agri-border bg-agri-surface px-3 py-2 text-sm text-agri-text">
          <option>All Crops</option>
        </select>
      </div>

      <div className="mx-8 overflow-hidden rounded-xl border border-agri-border bg-agri-surface">
        <table className="min-w-full">
          <thead className="bg-agri-raised">
            <tr>
              {[
                "Batch ID",
                "Crop",
                "Quantity",
                "Farm",
                "Status",
                "Registered",
                "Actions",
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
            {batches.map((batch) => (
              <tr key={batch.id} className="border-t border-agri-border">
                <td className="px-4 py-3 font-mono text-xs font-bold text-accent-cyan">
                  {batch.id}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {batch.crop}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {batch.quantity}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {batch.farm}
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${batch.statusTone}`}
                  >
                    {batch.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-agri-text">
                  {batch.registered}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link
                    href={`/dashboard/trace/${batch.id}`}
                    className="text-accent-blue"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-8 mt-4 flex flex-col gap-2 text-sm text-agri-muted">
        <p>Showing 1-10 of 47 batches</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-sm text-agri-muted hover:text-agri-text"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${
                currentPage === page
                  ? "bg-accent-purple text-white"
                  : "text-agri-muted hover:text-agri-text"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-sm text-agri-muted hover:text-agri-text"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
