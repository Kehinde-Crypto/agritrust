"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  MapPin,
  Package,
  QrCode,
  Route,
  Upload,
} from "lucide-react";
import Link from "next/link";

import { MiniTimeline } from "@/components/ui/MiniTimeline";

interface TraceBatch {
  batchId: string;
  cropType: string;
  quantityKg: number;
  region: string;
  date: string;
  status: "CERTIFIED" | "IN TRANSIT" | "AWAITING INSPECTION" | "FLAGGED";
  stages: Array<"complete" | "current" | "pending">;
}

const MOCK_BATCHES: TraceBatch[] = [
  {
    batchId: "AGT-0042",
    cropType: "Grade A Cocoa",
    quantityKg: 500,
    region: "Rivers State",
    date: "Jun 14, 2026",
    status: "CERTIFIED",
    stages: ["complete", "complete", "complete", "complete", "complete"],
  },
  {
    batchId: "AGT-0043",
    cropType: "Dried Hibiscus",
    quantityKg: 250,
    region: "Kano State",
    date: "Jun 13, 2026",
    status: "IN TRANSIT",
    stages: ["complete", "complete", "complete", "current", "pending"],
  },
  {
    batchId: "AGT-0044",
    cropType: "Sesame Seeds",
    quantityKg: 1000,
    region: "Kaduna State",
    date: "Jun 12, 2026",
    status: "CERTIFIED",
    stages: ["complete", "complete", "complete", "complete", "complete"],
  },
  {
    batchId: "AGT-0045",
    cropType: "Maize (White)",
    quantityKg: 750,
    region: "Oyo State",
    date: "Jun 12, 2026",
    status: "AWAITING INSPECTION",
    stages: ["complete", "complete", "current", "pending", "pending"],
  },
  {
    batchId: "AGT-0046",
    cropType: "Palm Kernel",
    quantityKg: 600,
    region: "Edo State",
    date: "Jun 11, 2026",
    status: "FLAGGED",
    stages: ["complete", "current", "pending", "pending", "pending"],
  },
  {
    batchId: "AGT-0047",
    cropType: "Ginger",
    quantityKg: 300,
    region: "Nasarawa State",
    date: "Jun 11, 2026",
    status: "CERTIFIED",
    stages: ["complete", "complete", "complete", "complete", "complete"],
  },
  {
    batchId: "AGT-0048",
    cropType: "Cowpea",
    quantityKg: 400,
    region: "Borno State",
    date: "Jun 10, 2026",
    status: "IN TRANSIT",
    stages: ["complete", "complete", "complete", "current", "pending"],
  },
  {
    batchId: "AGT-0049",
    cropType: "Cassava Chips",
    quantityKg: 850,
    region: "Delta State",
    date: "Jun 10, 2026",
    status: "FLAGGED",
    stages: ["complete", "pending", "pending", "pending", "pending"],
  },
];

const statusClassName: Record<TraceBatch["status"], string> = {
  CERTIFIED: "bg-accent-green/20 text-accent-green",
  "IN TRANSIT": "bg-accent-amber/20 text-accent-amber",
  "AWAITING INSPECTION": "border border-accent-amber bg-transparent text-accent-amber",
  FLAGGED: "bg-accent-red/20 text-accent-red",
};

const statusHoverGlow: Record<TraceBatch["status"], string> = {
  CERTIFIED: "hover:shadow-[0_0_12px_rgba(34,197,94,0.35)]",
  "IN TRANSIT": "hover:shadow-[0_0_12px_rgba(245,158,11,0.35)]",
  "AWAITING INSPECTION": "hover:shadow-[0_0_12px_rgba(245,158,11,0.35)]",
  FLAGGED: "hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]",
};

const selectClassName =
  "rounded-lg border border-agri-border bg-agri-raised px-3 py-2 text-sm text-agri-text transition-colors focus:border-agri-border-focus focus:outline-none";

export default function TracePage() {
  return (
    <div className="pb-8">
      <header className="mb-6 px-8 pt-8">
        <div className="mb-2 flex items-center gap-2">
          <Route className="h-3.5 w-3.5 text-accent-green" />
          <span className="text-xs font-bold tracking-widest text-accent-green">
            SUPPLY CHAIN LEDGER
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Trace Batches
        </h1>
        <p className="mt-1 text-agri-muted">
          Search verified produce batches and inspect each custody handoff.
        </p>
      </header>

      <section className="mb-6 flex flex-wrap items-center gap-3 px-8">
        <select className={selectClassName} defaultValue="All Crops">
          <option>All Crops</option>
        </select>
        <select className={selectClassName} defaultValue="All Statuses">
          <option>All Statuses</option>
        </select>
        <select className={selectClassName} defaultValue="All Regions">
          <option>All Regions</option>
        </select>
        <select className={selectClassName} defaultValue="All Time">
          <option>All Time</option>
        </select>

        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-agri-border px-3 py-2 text-sm text-agri-muted hover:text-agri-text" type="button">
            <Upload className="h-4 w-4" />
            Export
          </button>
          <button className="rounded-lg bg-agri-raised px-3 py-2 text-agri-text" type="button" aria-label="List view">
            <LayoutList className="h-4 w-4" />
          </button>
          <button className="rounded-lg px-3 py-2 text-agri-muted" type="button" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="mx-8 overflow-hidden rounded-xl border border-agri-border bg-agri-surface divide-y divide-agri-border">
        {MOCK_BATCHES.map((batch) => (
          <article
            key={batch.batchId}
            className="flex items-center gap-6 px-6 py-4 transition-colors hover:bg-agri-raised/80"
          >
            <span
              className={`w-36 flex-shrink-0 rounded-full px-3 py-1.5 text-center text-xs font-bold transition-all duration-300 ${statusClassName[batch.status]} ${statusHoverGlow[batch.status]}`}
            >
              {batch.status}
            </span>

            <div className="w-48 flex-shrink-0">
              <p className="text-sm font-medium text-agri-text">{batch.cropType}</p>
              <p className="font-mono text-sm font-bold text-agri-text">{batch.batchId}</p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-agri-muted">
                  <Package className="h-3 w-3" />
                  {batch.quantityKg} kg
                </span>
                <span className="flex items-center gap-1 text-xs text-agri-muted">
                  <MapPin className="h-3 w-3" />
                  {batch.region}
                </span>
                <span className="flex items-center gap-1 text-xs text-agri-muted">
                  <Calendar className="h-3 w-3" />
                  {batch.date}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <MiniTimeline stages={batch.stages} />
            </div>

            <div className="flex flex-shrink-0 items-center gap-4">
              <QrCode className="h-[18px] w-[18px] cursor-pointer text-agri-muted hover:text-accent-green" />
              <Link
                className="text-sm text-accent-blue hover:text-accent-blue/80"
                href={`/dashboard/trace/${batch.batchId}`}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-2 flex items-center justify-between px-8 py-4">
        <p className="text-sm text-agri-muted">Showing 1-8 of 47 batches</p>
        <div className="flex gap-1">
          <button className="rounded-lg px-3 py-1.5 text-sm text-agri-muted hover:text-agri-text" type="button" aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-lg bg-accent-purple px-3 py-1.5 text-sm text-white" type="button">
            1
          </button>
          {["2", "3", "...", "6"].map((page) => (
            <button key={page} className="rounded-lg px-3 py-1.5 text-sm text-agri-muted hover:text-agri-text" type="button">
              {page}
            </button>
          ))}
          <button className="rounded-lg px-3 py-1.5 text-sm text-agri-muted hover:text-agri-text" type="button" aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}