"use client";

import Link from "next/link";
import { Camera, Sprout } from "lucide-react";

import type { UserRole } from "@/types";

const MOCK_ROLE: UserRole = "FARMER";

const farmCards = [
  { name: "Okafor Family Farm", region: "Rivers", compliance: "99.1%" },
  { name: "Sunrise Agro Ltd", region: "Oyo", compliance: "87.0%" },
  { name: "GreenFields Farms", region: "Kaduna", compliance: "78.4%" },
  { name: "Ife Agri Cooperative", region: "Edo", compliance: "91.2%" },
  { name: "Niger Delta Rice Farms", region: "Rivers", compliance: "94.5%" },
  { name: "Northern Grains Co-op", region: "Kano", compliance: "96.8%" },
];

export default function FarmsPage() {
  const isRegulatorOrInspector =
    MOCK_ROLE === "REGULATOR" || MOCK_ROLE === "INSPECTOR";

  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Farms
        </h1>
        <p className="mt-1 text-agri-muted">
          {isRegulatorOrInspector
            ? "All registered farms in the network"
            : "Your registered farm"}
        </p>
      </header>

      {isRegulatorOrInspector ? (
        <div className="mx-8 grid grid-cols-3 gap-4">
          {farmCards.map((farm) => {
            const isAmber = farm.compliance === "78.4%";

            return (
              <div
                key={farm.name}
                className="rounded-xl border border-agri-border bg-agri-surface p-5"
              >
                <div className="relative mb-4 h-24 overflow-hidden rounded-xl border border-agri-border bg-gradient-to-br from-accent-green/20 to-agri-raised">
                  <div className="flex h-full items-center justify-center">
                    <Sprout className="h-10 w-10 text-accent-green/40" />
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-agri-base/80 px-3 py-1.5 backdrop-blur-sm">
                    <Camera className="h-3.5 w-3.5 text-agri-muted" />
                    <p className="text-xs text-agri-muted">Add farm photo</p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-green/20">
                    <Sprout className="h-5 w-5 text-accent-green" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      isAmber
                        ? "bg-accent-amber/20 text-accent-amber"
                        : "bg-accent-green/20 text-accent-green"
                    }`}
                  >
                    {farm.compliance}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-agri-text">
                  {farm.name}
                </h2>
                <p className="mt-1 text-sm text-agri-muted">{farm.region}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-8 rounded-xl border border-agri-border bg-agri-surface p-6">
          <div className="relative mb-5 h-40 overflow-hidden rounded-xl border border-agri-border bg-gradient-to-br from-accent-green/20 to-agri-raised">
            <div className="flex h-full items-center justify-center">
              <Sprout className="h-12 w-12 text-accent-green/40" />
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-agri-base/80 px-3 py-1.5 backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5 text-agri-muted" />
              <p className="text-xs text-agri-muted">Add farm photo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent-green/20">
              <Sprout className="h-8 w-8 text-accent-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-agri-text">
                Okafor Family Farm
              </h2>
              <p className="text-sm text-agri-muted">
                Rivers State, Nigeria · NASC-NG-04821
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="rounded-lg border border-agri-border bg-agri-raised px-4 py-3">
              <p className="text-lg font-bold text-agri-text">14</p>
              <p className="text-sm text-agri-muted">
                Total batches registered
              </p>
            </div>
            <div className="rounded-lg border border-agri-border bg-agri-raised px-4 py-3">
              <p className="text-lg font-bold text-agri-text">92.8%</p>
              <p className="text-sm text-agri-muted">Compliance rate</p>
            </div>
            <div className="rounded-lg border border-agri-border bg-agri-raised px-4 py-3">
              <p className="text-lg font-bold text-agri-text">6,240 kg</p>
              <p className="text-sm text-agri-muted">Total produce traced</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-agri-muted">Primary crops</p>
            <div className="flex gap-2">
              <span className="rounded-full bg-accent-green/20 px-3 py-1 text-xs text-accent-green">
                Cocoa
              </span>
              <span className="rounded-full bg-accent-green/20 px-3 py-1 text-xs text-accent-green">
                Cassava
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/settings"
            className="mt-6 block text-sm text-accent-blue"
          >
            Manage Farm Profile →
          </Link>
        </div>
      )}
    </div>
  );
}
