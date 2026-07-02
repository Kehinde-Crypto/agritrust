export type UserRole =
  | "FARMER"
  | "INSPECTOR"
  | "DISTRIBUTOR"
  | "REGULATOR"
  | "CONSUMER";

export type BatchStatus =
  | "REGISTERED"
  | "INSPECTED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "FLAGGED";

export type GMOStatus = "NON_GMO" | "GMO_DETECTED" | "PENDING";

export type CertStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "REVOKED";

export interface Batch {
  batchId: string;
  farmId: string;
  cropType: string;
  quantityKg: number;
  seedVariety: string;
  isGMOFree: boolean;
  registeredAt: string;
  status: BatchStatus;
  farmOrigin: string;
  farmName: string;
  region: string;
}

export interface ChainStage {
  stage: "FARM" | "WAREHOUSE" | "INSPECTION" | "DISTRIBUTION" | "MARKET";
  status: "COMPLETE" | "CURRENT" | "PENDING";
  date?: string;
  details: Record<string, string>;
}
