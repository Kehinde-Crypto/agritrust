"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Crosshair,
  Home,
  Loader2,
  MapPin,
  QrCode,
  Save,
  Settings2,
  Shield,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

import { PRIMARY_USER } from "@/lib/mockData";

type SectionKey =
  | "profile"
  | "notifications"
  | "verification"
  | "wallet"
  | "qr"
  | "danger";

interface NavItem {
  key: SectionKey;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { key: "profile", icon: Home, label: "Farm Profile" },
  { key: "notifications", icon: Bell, label: "Notifications" },
  { key: "verification", icon: Shield, label: "Verification" },
  { key: "wallet", icon: Wallet, label: "Connected Wallet" },
  { key: "qr", icon: QrCode, label: "QR Codes" },
  { key: "danger", icon: AlertTriangle, label: "Danger Zone" },
];

const availableCrops = [
  "Cocoa",
  "Cassava",
  "Yam",
  "Maize",
  "Cashew",
  "Palm Oil",
  "Ginger",
  "Sesame Seeds",
  "Hibiscus",
  "Groundnut",
];

function SectionPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-agri-border bg-agri-surface p-12 text-center">
      <Settings2 className="mx-auto mb-4 h-12 w-12 text-agri-muted" />
      <p className="text-agri-muted">{title} settings coming soon.</p>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [crops, setCrops] = useState<string[]>(["Cocoa", "Cassava"]);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const removeCrop = (crop: string) => {
    setCrops((current) => current.filter((item) => item !== crop));
  };

  const addCrop = (crop: string) => {
    setCrops((current) => (current.includes(crop) ? current : [...current, crop]));
    setIsCropDropdownOpen(false);
  };

  const saveChanges = () => {
    setSaveStatus("saving");
    window.setTimeout(() => {
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1500);
  };

  return (
    <div className="pb-10">
      <header className="mb-6 px-8 pt-8">
        <h1
          className="text-3xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Settings
        </h1>
        <p className="mt-1 text-agri-muted">
          Manage your farm profile, wallet access, and verification preferences.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-[240px_1fr] gap-8 px-8">
        <aside className="sticky top-24 h-fit rounded-xl border border-agri-border bg-agri-surface p-2">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ key, icon: Icon, label }) => {
              const isActive = activeSection === key;
              const isDanger = key === "danger";

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? isDanger
                        ? "bg-accent-red/10 font-medium text-accent-red"
                        : "bg-accent-green/10 font-medium text-accent-green"
                      : "text-agri-muted hover:bg-agri-raised hover:text-agri-text"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isDanger ? "text-red-400" : ""}`}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div>
          {activeSection === "profile" && (
            <>
              <h2 className="mb-6 text-xl font-bold text-agri-text">
                Farm Profile
              </h2>

              <div className="rounded-xl border border-agri-border bg-agri-surface p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-24 w-24">
                    <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-accent-green bg-accent-green/20 text-2xl font-bold text-accent-green">
                      {PRIMARY_USER.initials}
                    </div>
                    <div className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-agri-border bg-agri-surface hover:bg-agri-raised">
                      <Camera className="h-3.5 w-3.5 text-agri-text" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-agri-text">
                      Primary farm profile
                    </p>
                    <p className="mt-1 text-sm text-agri-muted">
                      Update your farm details for compliance and traceability.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      Farm name
                    </label>
                    <input
                      className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 text-sm text-agri-text focus:border-agri-border-focus focus:outline-none"
                      defaultValue="Okafor Family Farm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      Owner name
                    </label>
                    <input
                      className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 text-sm text-agri-text focus:border-agri-border-focus focus:outline-none"
                      defaultValue="Amara Okafor"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      Farm location
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pr-12 text-sm text-agri-text focus:border-agri-border-focus focus:outline-none"
                        defaultValue="Rivers State, Nigeria"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center border-l border-agri-border bg-agri-raised px-3 hover:bg-agri-overlay"
                      >
                        <MapPin className="h-4 w-4 text-agri-muted" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      GPS coordinates
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-agri-border bg-agri-base px-4 py-2.5 pr-12 font-mono text-sm text-agri-muted"
                        value="4.8156° N, 7.0498° E"
                        readOnly
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center border-l border-agri-border bg-agri-raised px-3 hover:bg-agri-overlay"
                      >
                        <Crosshair className="h-4 w-4 text-agri-muted" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      Primary crops
                    </label>
                    <div className="relative">
                      <div className="flex min-h-[44px] items-center gap-2 rounded-lg border border-agri-border bg-agri-raised p-2.5">
                        {crops.map((crop) => (
                          <span
                            key={crop}
                            className="flex items-center gap-1 rounded-full bg-accent-green/20 px-2.5 py-1 text-xs text-accent-green"
                          >
                            {crop}
                            <button
                              type="button"
                              onClick={() => removeCrop(crop)}
                            >
                              <X className="h-3 w-3 cursor-pointer" />
                            </button>
                          </span>
                        ))}
                        <button
                          type="button"
                          className="ml-auto"
                          onClick={() =>
                            setIsCropDropdownOpen((current) => !current)
                          }
                          aria-label="Toggle crop options"
                        >
                          <ChevronDown className="h-4 w-4 cursor-pointer text-agri-muted" />
                        </button>
                      </div>
                      {isCropDropdownOpen ? (
                        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-agri-border bg-agri-surface">
                          {availableCrops.map((crop) => {
                            const isSelected = crops.includes(crop);

                            return (
                              <button
                                key={crop}
                                type="button"
                                className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-sm text-agri-muted hover:bg-agri-raised hover:text-agri-text disabled:cursor-default"
                                onClick={() => addCrop(crop)}
                                disabled={isSelected}
                              >
                                <span>{crop}</span>
                                {isSelected ? (
                                  <Check className="h-3.5 w-3.5 text-accent-green" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      NASC Registration
                    </label>
                    <input
                      className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 text-sm text-agri-text focus:border-agri-border-focus focus:outline-none"
                      defaultValue="NASC-NG-04821"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs text-agri-muted">
                      Farm ID on-chain
                    </label>
                    <div className="flex items-center justify-between rounded-lg border border-agri-border bg-agri-base px-4 py-2.5">
                      <div>
                        <p className="text-xs text-agri-muted">
                          Farm ID on-chain
                        </p>
                        <p className="font-mono text-sm text-accent-cyan">
                          0x4F3a...E29c
                        </p>
                      </div>
                      <Copy className="h-4 w-4 cursor-pointer text-agri-muted hover:text-agri-text" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors ${
                      saveStatus === "saved"
                        ? "bg-accent-green"
                        : saveStatus === "saving"
                          ? "bg-accent-blue/70"
                          : "bg-accent-blue hover:bg-accent-blue/90"
                    }`}
                    onClick={saveChanges}
                    disabled={saveStatus !== "idle"}
                  >
                    {saveStatus === "saving" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveStatus === "saved" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 rounded-xl border border-agri-border bg-agri-surface p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/20">
                    <Wallet className="h-5 w-5 text-accent-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-sm text-agri-text">
                      0x8b7C...aF91
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                      <p className="text-xs text-accent-green">Connected</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto text-sm text-agri-muted transition-colors hover:text-accent-red"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection === "notifications" && (
            <SectionPlaceholder title="Notifications" />
          )}
          {activeSection === "verification" && (
            <SectionPlaceholder title="Verification" />
          )}
          {activeSection === "wallet" && <SectionPlaceholder title="Wallet" />}
          {activeSection === "qr" && <SectionPlaceholder title="QR Codes" />}
          {activeSection === "danger" && (
            <SectionPlaceholder title="Danger Zone" />
          )}
        </div>
      </div>
    </div>
  );
}
