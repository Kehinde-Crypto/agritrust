import type { Batch, ChainStage, UserRole } from "@/types";

export const PRIMARY_BATCH: Batch = {
  batchId: "AGT-0042",
  farmId: "FARM-001",
  cropType: "Grade A Cocoa",
  quantityKg: 500,
  seedVariety: "NASC OC-7",
  isGMOFree: true,
  registeredAt: "June 14, 2026",
  status: "IN_TRANSIT",
  farmOrigin: "Rivers State",
  farmName: "Okafor Family Farm",
  region: "Rivers State",
};

export const PRIMARY_USER = {
  name: "Amara Okafor",
  role: "FARMER" as UserRole,
  initials: "AO",
  email: "amara@farmco.ng",
};

export const PRIMARY_INSPECTOR = {
  name: "Chidera Eze",
  id: "NAFDAC-0042",
  role: "INSPECTOR" as UserRole,
};

export const PRIMARY_DISTRIBUTOR = {
  name: "Taiwo Adeyemi",
  role: "DISTRIBUTOR" as UserRole,
};

export const PRIMARY_REGULATOR = {
  name: "Dr. Emeka Nwosu",
  role: "REGULATOR" as UserRole,
};

export const CHAIN_STAGES: ChainStage[] = [
  {
    stage: "FARM",
    status: "COMPLETE",
    date: "Jun 14, 2026",
    details: {
      farm: "Okafor Family Farm",
      location: "Rivers State",
      gps: "4.8156° N, 7.0498° E",
      seed: "NASC OC-7 (Non-GMO certified)",
    },
  },
  {
    stage: "WAREHOUSE",
    status: "COMPLETE",
    date: "Jun 16, 2026",
    details: {
      warehouse: "Port Harcourt Central Agro-Warehouse",
      weight: "498.5 kg verified",
      condition: "Optimal",
    },
  },
  {
    stage: "INSPECTION",
    status: "COMPLETE",
    date: "Jun 17, 2026",
    details: {
      inspector: "NAFDAC Agent ID 0042",
      gmo: "NON-GMO CONFIRMED",
      grade: "A+",
    },
  },
  {
    stage: "DISTRIBUTION",
    status: "CURRENT",
    date: "Since Jun 19, 2026",
    details: {
      distributor: "PH Agri Logistics Ltd",
      destination: "Lagos Central Market",
      eta: "Jun 22, 2026",
    },
  },
  {
    stage: "MARKET",
    status: "PENDING",
    date: "Pending",
    details: {
      destination: "Lagos Central Market",
    },
  },
];

export const TX_HASHES = {
  registration:
    "0x8f2c4a7e1b9d3f6c2a8e5b7d4c9f1e3a7b2d6f4c8a1e5b9d3f7c2a6e8b4d1f9c",
  inspection:
    "0x4d9a2c8f6b1e3a7c5d9f2b6e4a8c1d5f9b3e7a2c6d4f8b1e5a9c3d7f2b6e4a8c",
  certificate:
    "0x2e7b9a3d6c1f4b8e2a7c5d9f3b6e1a4c8d2f6b9e3a7c1d5f4b8e2a6c9d3f7b1e",
};
