"use client";

import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  Leaf,
  Link as LinkIcon,
  MapPin,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  Sprout,
  TestTube,
  Truck,
} from "lucide-react";
import { useState } from "react";

import { PRIMARY_BATCH, TX_HASHES } from "@/lib/mockData";
import type { UserRole } from "@/types";

type ActiveTab = "new" | "verify" | "handoff";
type GMOResult = "NON_GMO" | "GMO_PRESENT";
type HandoffType =
  | "Warehouse to Distributor"
  | "Distributor to Distributor"
  | "Distributor to Market";

interface NewBatchForm {
  cropType: string;
  grade: string;
  quantityKg: string;
  seedVariety: string;
  isGMOFree: boolean;
  practices: string;
  farmName: string;
  farmLocation: string;
  gpsCoordinates: string;
  registrationDate: string;
}

const fieldClassName =
  "w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none";

const roleTabs: Record<UserRole, ActiveTab[]> = {
  FARMER: ["new"],
  INSPECTOR: ["verify"],
  DISTRIBUTOR: ["handoff"],
  REGULATOR: [],
  CONSUMER: [],
};

function PageHeading() {
  return (
    <header className="mb-6 px-8 pt-8">
      <h1
        className="text-3xl font-bold text-agri-text"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Register
      </h1>
      <p className="mt-1 text-agri-muted">
        Register produce, verify biosafety, and record trusted custody handoffs.
      </p>
    </header>
  );
}

function SectionIntro({
  icon: Icon,
  eyebrow,
  title,
  copy,
  color,
}: {
  icon: typeof Sprout;
  eyebrow: string;
  title: string;
  copy: string;
  color: string;
}) {
  return (
    <section className="mb-4 px-8">
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className={`text-xs font-bold tracking-widest ${color}`}>
          {eyebrow}
        </span>
      </div>
      <h2
        className="text-2xl font-bold text-agri-text"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h2>
      <p className="mb-6 mt-1 text-sm text-agri-muted">{copy}</p>
    </section>
  );
}

function SearchRow({ buttonColor }: { buttonColor: string }) {
  return (
    <div className="mb-6 flex gap-3 px-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
        <input
          className={`${fieldClassName} pl-9`}
          placeholder="Enter batch ID or scan QR code..."
        />
      </div>
      <button
        className="rounded-lg border border-agri-border px-3 text-agri-muted hover:text-accent-green"
        type="button"
      >
        <QrCode className="h-4 w-4" />
      </button>
      <button
        className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white ${buttonColor}`}
        type="button"
      >
        Load Batch
      </button>
    </div>
  );
}

function LoadedBatchCard({
  status,
}: {
  status: "AWAITING INSPECTION" | "CERTIFIED";
}) {
  return (
    <div className="mx-8 mb-6 flex items-center gap-4 rounded-xl border border-agri-border bg-agri-raised p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green/20">
        <Leaf className="h-5 w-5 text-accent-green" />
      </div>
      <div className="flex-1">
        <p className="font-mono font-bold text-agri-text">
          {PRIMARY_BATCH.batchId}
        </p>
        <p className="text-sm text-agri-muted">
          {PRIMARY_BATCH.cropType} · {PRIMARY_BATCH.quantityKg} kg
        </p>
        <p className="mt-0.5 text-xs text-agri-muted">
          Farm: {PRIMARY_BATCH.farmName}, {PRIMARY_BATCH.region}
        </p>
        <p className="text-xs text-agri-muted">
          Registered: {PRIMARY_BATCH.registeredAt}
        </p>
      </div>
      <span
        className={`ml-auto flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
          status === "CERTIFIED"
            ? "bg-accent-green/20 text-accent-green"
            : "bg-accent-amber/20 text-accent-amber"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function NewBatchTab() {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<NewBatchForm>({
    cropType: "",
    grade: "",
    quantityKg: "",
    seedVariety: "",
    isGMOFree: true,
    practices: "",
    farmName: "",
    farmLocation: "",
    gpsCoordinates: "6.5244, 3.3792",
    registrationDate: today,
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  function updateField<K extends keyof NewBatchForm>(
    field: K,
    value: NewBatchForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const previewRows = [
    ["Crop Type", form.cropType],
    ["Grade", form.grade],
    ["Quantity", form.quantityKg ? `${form.quantityKg} kg` : ""],
    ["Seed Variety", form.seedVariety],
    ["GMO Status", form.isGMOFree ? "GMO-free" : "GMO present"],
    ["Farm Name", form.farmName],
    ["Farm Location", form.farmLocation],
    ["GPS Coordinates", form.gpsCoordinates],
    ["Registration Date", form.registrationDate],
  ];

  return (
    <>
      <SectionIntro
        icon={Sprout}
        eyebrow="BATCH REGISTRATION"
        title="Register New Produce Batch"
        copy="Capture crop identity and farm declarations before minting a traceable batch record."
        color="text-accent-green"
      />

      <section className="grid grid-cols-1 gap-6 px-8 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl glass p-6">
          <div className="mb-8 flex items-center gap-0">
            {["Batch Info", "Farm Details", "Confirmation"].map(
              (label, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isComplete = currentStep > stepNumber;

                return (
                  <div
                    key={label}
                    className="flex flex-1 items-center last:flex-none"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          isActive || isComplete
                            ? "bg-accent-green text-white"
                            : "border border-agri-border bg-agri-raised text-agri-muted"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`mt-1 text-xs ${isActive || isComplete ? "text-accent-green" : "text-agri-muted"}`}
                      >
                        {label}
                      </span>
                    </div>
                    {index < 2 ? (
                      <div className="mx-3 h-px flex-1 bg-agri-border" />
                    ) : null}
                  </div>
                );
              },
            )}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {currentStep === 1 ? (
              <>
                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Crop type
                  </span>
                  <select
                    className={fieldClassName}
                    value={form.cropType}
                    onChange={(event) =>
                      updateField("cropType", event.target.value)
                    }
                  >
                    <option value="">Select crop</option>
                    {[
                      "Cocoa",
                      "Cassava",
                      "Cashew",
                      "Yam",
                      "Maize",
                      "Palm Oil",
                      "Other",
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Grade/Quality
                  </span>
                  <input
                    className={fieldClassName}
                    placeholder="e.g. Grade A"
                    value={form.grade}
                    onChange={(event) =>
                      updateField("grade", event.target.value)
                    }
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Quantity kg
                  </span>
                  <input
                    className={fieldClassName}
                    type="number"
                    value={form.quantityKg}
                    onChange={(event) =>
                      updateField("quantityKg", event.target.value)
                    }
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Seed variety
                  </span>
                  <select
                    className={fieldClassName}
                    value={form.seedVariety}
                    onChange={(event) =>
                      updateField("seedVariety", event.target.value)
                    }
                  >
                    <option value="">Select seed variety</option>
                    <option>NASC OC-7</option>
                    <option>NASC OC-4</option>
                    <option>Other Certified</option>
                    <option>Other</option>
                  </select>
                </label>

                <button
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-agri-border bg-agri-raised p-3"
                  type="button"
                  onClick={() => updateField("isGMOFree", !form.isGMOFree)}
                >
                  <span className="flex items-center gap-2 text-sm text-agri-text">
                    <TestTube className="h-4 w-4 text-agri-muted" />
                    GMO-free declaration
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${form.isGMOFree ? "bg-accent-green/20 text-accent-green" : "bg-accent-red/20 text-accent-red"}`}
                  >
                    {form.isGMOFree ? "✓ GMO-FREE" : "GMO PRESENT"}
                  </span>
                </button>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Farming practices
                  </span>
                  <textarea
                    className={fieldClassName}
                    rows={4}
                    placeholder="Describe pesticide use, irrigation method, harvesting approach..."
                    value={form.practices}
                    onChange={(event) =>
                      updateField("practices", event.target.value)
                    }
                  />
                </label>

                <button
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-green py-2.5 font-medium text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-shadow duration-300"
                  type="button"
                  onClick={() => setCurrentStep(2)}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : null}

            {currentStep === 2 ? (
              <>
                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Farm name
                  </span>
                  <input
                    className={fieldClassName}
                    placeholder="e.g. Green Valley Farm"
                    value={form.farmName}
                    onChange={(event) =>
                      updateField("farmName", event.target.value)
                    }
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Farm location
                  </span>
                  <input
                    className={fieldClassName}
                    placeholder="e.g. Ibadan, Oyo State"
                    value={form.farmLocation}
                    onChange={(event) =>
                      updateField("farmLocation", event.target.value)
                    }
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    GPS coordinates
                  </span>
                  <input
                    className={fieldClassName}
                    value={form.gpsCoordinates}
                    onChange={(event) =>
                      updateField("gpsCoordinates", event.target.value)
                    }
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-agri-muted">
                    Registration date
                  </span>
                  <input
                    className={fieldClassName}
                    type="date"
                    value={form.registrationDate}
                    onChange={(event) =>
                      updateField("registrationDate", event.target.value)
                    }
                  />
                </label>

                <div className="mt-2 flex gap-3">
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-agri-border bg-agri-raised py-2.5 font-medium text-agri-text"
                    type="button"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeftRight className="h-4 w-4 rotate-180" />
                    Back
                  </button>
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-green py-2.5 font-medium text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-shadow duration-300"
                    type="button"
                    onClick={() => setCurrentStep(3)}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : null}

            {currentStep === 3 ? (
              <>
                <div className="rounded-lg border border-agri-border bg-agri-raised p-4">
                  <h3 className="text-sm font-semibold text-agri-text">
                    Confirmation summary
                  </h3>
                  <div className="mt-3 space-y-2">
                    {[
                      ["Crop Type", form.cropType],
                      ["Grade/Quality", form.grade],
                      [
                        "Quantity",
                        form.quantityKg ? `${form.quantityKg} kg` : "",
                      ],
                      ["Seed Variety", form.seedVariety],
                      [
                        "GMO Status",
                        form.isGMOFree ? "GMO-free" : "GMO present",
                      ],
                      ["Farming Practices", form.practices],
                      ["Farm Name", form.farmName],
                      ["Farm Location", form.farmLocation],
                      ["GPS Coordinates", form.gpsCoordinates],
                      ["Registration Date", form.registrationDate],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between gap-4 border-b border-agri-border py-2 last:border-0"
                      >
                        <span className="text-xs text-agri-muted">{label}</span>
                        <span className="text-right text-xs font-medium text-agri-text">
                          {value || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {submissionMessage ? (
                  <div className="rounded-lg border border-accent-green/30 bg-accent-green/10 p-3 text-sm text-accent-green">
                    {submissionMessage}
                  </div>
                ) : null}

                <div className="mt-2 flex gap-3">
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-agri-border bg-agri-raised py-2.5 font-medium text-agri-text"
                    type="button"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeftRight className="h-4 w-4 rotate-180" />
                    Back
                  </button>
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-green py-2.5 font-medium text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-shadow duration-300"
                    type="button"
                    onClick={() =>
                      setSubmissionMessage(
                        "Batch registration submitted successfully.",
                      )
                    }
                  >
                    Submit Registration
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <aside className="sticky top-24 self-start rounded-xl glass p-5">
          <h3 className="mb-4 text-sm font-semibold text-agri-text">
            Registration preview
          </h3>
          {previewRows.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-b border-agri-border py-2 last:border-0"
            >
              <span className="text-xs text-agri-muted">{label}</span>
              <span className="text-xs font-medium text-agri-text">
                {value || "—"}
              </span>
            </div>
          ))}

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent-purple/30 bg-accent-purple/10 p-4">
            <LinkIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-purple" />
            <p className="text-xs text-agri-muted">
              Once submitted, this batch will be assigned an on-chain ID and a
              QR code will be generated automatically.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

function VerifyBatchTab() {
  const [gmoResult, setGmoResult] = useState<GMOResult>("NON_GMO");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  function handleSubmitInspection() {
    setSubmissionStatus("submitting");

    window.setTimeout(() => {
      setSubmissionStatus("success");
    }, 1500);
  }

  return (
    <>
      <SectionIntro
        icon={ShieldCheck}
        eyebrow="BIOSAFETY INSPECTION"
        title="Verify & Inspect Batch"
        copy="Load a registered batch and issue an immutable biosafety inspection record."
        color="text-accent-blue"
      />
      <SearchRow buttonColor="bg-accent-blue" />
      <LoadedBatchCard status="AWAITING INSPECTION" />

      <section className="grid grid-cols-1 gap-6 px-8 xl:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4 rounded-xl glass p-6">
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Physical weight (kg)
            </span>
            <input
              className={fieldClassName}
              type="number"
              defaultValue="498.5"
            />
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Quality assessment
            </span>
            <select className={fieldClassName} defaultValue="Grade A - Premium">
              <option>Grade A - Premium</option>
              <option>Grade A</option>
              <option>Grade B</option>
              <option>Grade C</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Storage condition
            </span>
            <select className={fieldClassName} defaultValue="Optimal">
              <option>Optimal</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </label>

          <div>
            <span className="mb-2 block text-sm text-agri-muted">
              GMO test result
            </span>
            <div className="flex gap-3">
              <button
                className={`flex-1 rounded-xl border-2 p-3 text-center text-sm font-semibold transition-all ${
                  gmoResult === "NON_GMO"
                    ? "border-accent-green bg-accent-green/20 text-accent-green"
                    : "border-agri-border text-agri-muted"
                }`}
                type="button"
                onClick={() => setGmoResult("NON_GMO")}
              >
                NON-GMO CONFIRMED
              </button>
              <button
                className={`flex-1 rounded-xl border-2 p-3 text-center text-sm font-semibold transition-all ${
                  gmoResult === "GMO_PRESENT"
                    ? "border-accent-red bg-accent-red/20 text-accent-red"
                    : "border-agri-border text-agri-muted"
                }`}
                type="button"
                onClick={() => setGmoResult("GMO_PRESENT")}
              >
                GMO PRESENT
              </button>
            </div>
          </div>

          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Biosafety grade
            </span>
            <select className={fieldClassName} defaultValue="A+">
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>C</option>
              <option>Fail</option>
            </select>
          </label>

          <label className="flex items-center gap-3 text-sm text-agri-text">
            <input
              className="h-4 w-4 accent-accent-blue"
              type="checkbox"
              defaultChecked
            />
            Meets NAFDAC standards
          </label>

          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Inspector notes
            </span>
            <textarea
              className={fieldClassName}
              rows={3}
              placeholder="Add inspection notes..."
            />
          </label>

          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Inspector ID
            </span>
            <input
              className={`${fieldClassName} font-mono`}
              defaultValue="NAFDAC-0042"
            />
          </label>

          {submissionStatus === "success" ? (
            <div className="rounded-lg border border-accent-green/30 bg-accent-green/10 p-3 text-sm font-medium text-accent-green">
              ✓ Inspection submitted successfully
            </div>
          ) : null}
          <button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-blue py-3 font-semibold text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-shadow duration-300"
            type="button"
            onClick={handleSubmitInspection}
            disabled={submissionStatus === "submitting"}
          >
            <LinkIcon className="h-4 w-4" />
            {submissionStatus === "submitting"
              ? "Submitting..."
              : "Submit Inspection to Blockchain"}
          </button>
          <div className="mt-3 flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-accent-amber" />
            <p className="text-xs text-agri-muted">
              This action is permanent and cannot be reversed.
            </p>
          </div>
        </div>

        <aside className="rounded-xl glass p-5">
          <h3 className="mb-4 text-sm font-semibold text-agri-text">
            What happens next
          </h3>
          <div className="flex flex-col gap-0">
            {[
              "Your inspection is recorded as an immutable blockchain transaction.",
              "A biosafety certificate is generated and linked to this batch.",
              "The farmer is notified and the batch status updates to CERTIFIED.",
              "A QR code is activated for consumer verification.",
            ].map((step, index, steps) => (
              <div
                key={step}
                className="relative flex items-start gap-3 pb-6 last:pb-0"
              >
                {index < steps.length - 1 ? (
                  <div className="absolute bottom-0 left-3.5 top-8 border-l-2 border-dashed border-agri-border" />
                ) : null}
                <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-bold text-accent-blue">
                  {index + 1}
                </span>
                <p className="text-xs text-agri-text">{step}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}

function HandoffTab() {
  const [handoffType, setHandoffType] = useState<HandoffType>(
    "Warehouse to Distributor",
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  function handleRecordHandoff() {
    setSubmissionStatus("submitting");

    window.setTimeout(() => {
      setSubmissionStatus("success");
    }, 1500);
  }

  return (
    <>
      <SectionIntro
        icon={Truck}
        eyebrow="HANDOFF RECORDING"
        title="Record Supply Chain Handoff"
        copy="Log custody movement so downstream buyers can verify every step."
        color="text-accent-amber"
      />
      <SearchRow buttonColor="bg-accent-amber" />
      <LoadedBatchCard status="CERTIFIED" />

      <section className="grid grid-cols-1 gap-6 px-8 xl:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4 rounded-xl glass p-6">
          <div>
            <span className="mb-2 block text-sm text-agri-muted">
              Handoff type
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Warehouse to Distributor",
                "Distributor to Distributor",
                "Distributor to Market",
              ].map((type) => (
                <button
                  key={type}
                  className={`cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    handoffType === type
                      ? "border-accent-amber bg-accent-amber/20 text-accent-amber"
                      : "border-agri-border text-agri-muted hover:border-accent-amber/50"
                  }`}
                  type="button"
                  onClick={() => setHandoffType(type as HandoffType)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Receiving party name
            </span>
            <input
              className={fieldClassName}
              placeholder="e.g. PH Agri Logistics Ltd"
            />
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Receiving party ID
            </span>
            <input
              className={`${fieldClassName} font-mono`}
              placeholder="e.g. DIST-0091"
            />
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Handoff location
            </span>
            <div className="relative">
              <input
                className={`${fieldClassName} pr-10`}
                placeholder="e.g. Port Harcourt Wharf"
              />
              <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
            </div>
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Quantity transferred
            </span>
            <input
              className={fieldClassName}
              type="number"
              defaultValue="498.5"
            />
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Condition on handoff
            </span>
            <select className={fieldClassName} defaultValue="Good condition">
              <option>Excellent</option>
              <option>Good condition</option>
              <option>Acceptable</option>
              <option>Damaged</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Transport method
            </span>
            <select
              className={fieldClassName}
              defaultValue="Refrigerated truck"
            >
              <option>Refrigerated truck</option>
              <option>Standard truck</option>
              <option>Rail</option>
              <option>Air freight</option>
              <option>Boat</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm text-agri-muted">
              Expected delivery date
            </span>
            <input className={fieldClassName} type="date" />
          </label>

          {submissionStatus === "success" ? (
            <div className="rounded-lg border border-accent-green/30 bg-accent-green/10 p-3 text-sm font-medium text-accent-green">
              ✓ Handoff recorded successfully
            </div>
          ) : null}
          <button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-amber py-3 font-semibold text-white hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-shadow duration-300"
            type="button"
            onClick={handleRecordHandoff}
            disabled={submissionStatus === "submitting"}
          >
            <LinkIcon className="h-4 w-4" />
            {submissionStatus === "submitting"
              ? "Submitting..."
              : "Record Handoff on Blockchain"}
          </button>
        </div>

        <aside className="rounded-xl glass p-5">
          <h3 className="mb-3 text-sm font-semibold text-agri-text">
            Why this matters
          </h3>
          <p className="mb-3 text-xs text-agri-muted">
            Every handoff creates an immutable record of who had custody, where
            the batch moved, and what condition it was in.
          </p>
          <p className="mb-4 text-xs text-agri-muted">
            The consumer QR verify page auto-updates as each supply chain
            milestone is confirmed.
          </p>

          <div className="mt-4 rounded-xl border-2 border-accent-amber/30 bg-accent-amber/5 p-3">
            <div className="rounded-lg border border-accent-amber/20 bg-accent-amber/5 p-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-3 w-3 text-accent-amber" />
                <p className="font-mono text-[10px] text-accent-amber/70">
                  {TX_HASHES.inspection.slice(0, 7)}...7c3e
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export default function RegisterPage() {
  const MOCK_ROLE: UserRole = "FARMER";
  const allowedTabIds = roleTabs[MOCK_ROLE];
  const [activeTab, setActiveTab] = useState<ActiveTab | null>(
    allowedTabIds[0] ?? null,
  );

  const tabs = [
    {
      id: "new" as const,
      icon: Plus,
      label: "New Batch",
      activeClass: "bg-accent-green text-white",
    },
    {
      id: "verify" as const,
      icon: ShieldCheck,
      label: "Verify Batch",
      activeClass: "bg-accent-blue text-white",
    },
    {
      id: "handoff" as const,
      icon: ArrowLeftRight,
      label: "Record Handoff",
      activeClass: "bg-accent-amber text-white",
    },
  ];
  const visibleTabs = tabs.filter((tab) => allowedTabIds.includes(tab.id));

  return (
    <div className="pb-8">
      <PageHeading />

      {allowedTabIds.length === 0 ? (
        <div className="px-8 py-12 text-center">
          <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-agri-muted" />
          <p className="text-agri-muted">
            Regulators do not register batches or record handoffs. Use
            Analytics and Compliance for oversight.
          </p>
        </div>
      ) : null}

      {visibleTabs.length > 1 ? (
        <div className="mb-8 flex gap-2 px-8">
          {visibleTabs.map(({ id, icon: Icon, label, activeClass }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? activeClass
                    : "border border-agri-border text-agri-muted hover:bg-agri-raised hover:text-agri-text"
                }`}
                type="button"
                onClick={() => setActiveTab(id)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      {activeTab === "new" ? <NewBatchTab /> : null}
      {activeTab === "verify" ? <VerifyBatchTab /> : null}
      {activeTab === "handoff" ? <HandoffTab /> : null}
    </div>
  );
}
