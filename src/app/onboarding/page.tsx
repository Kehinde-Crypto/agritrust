"use client";

import { BarChart3, ShieldCheck, Sprout, Truck, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BrandLogo, { BrandName } from "@/components/brand/BrandLogo";
import type { UserRole } from "@/types";

interface RoleCard {
  role: UserRole;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  glow: string;
  selectedGlow: string;
  title: string;
  description: string;
}

const roles: RoleCard[] = [
  {
    role: "FARMER",
    icon: Sprout,
    color: "text-accent-green",
    bg: "bg-accent-green/20",
    border: "border-accent-green",
    glow: "glow-green",
    selectedGlow: "shadow-[0_0_32px_rgba(34,197,94,0.3)]",
    title: "Farmer",
    description: "Register produce batches, log farming practices, and receive biosafety certificates.",
  },
  {
    role: "INSPECTOR",
    icon: ShieldCheck,
    color: "text-accent-blue",
    bg: "bg-accent-blue/20",
    border: "border-accent-blue",
    glow: "glow-blue",
    selectedGlow: "shadow-[0_0_32px_rgba(59,130,246,0.3)]",
    title: "Inspector",
    description: "Verify produce quality, record biosafety compliance, and issue certifications.",
  },
  {
    role: "DISTRIBUTOR",
    icon: Truck,
    color: "text-accent-amber",
    bg: "bg-accent-amber/20",
    border: "border-accent-amber",
    glow: "glow-amber",
    selectedGlow: "shadow-[0_0_32px_rgba(245,158,11,0.3)]",
    title: "Distributor",
    description: "Record handoffs between warehouses, transport legs, and market delivery.",
  },
  {
    role: "REGULATOR",
    icon: BarChart3,
    color: "text-accent-purple",
    bg: "bg-accent-purple/20",
    border: "border-accent-purple",
    glow: "glow-purple",
    selectedGlow: "shadow-[0_0_32px_rgba(108,99,255,0.3)]",
    title: "Regulator",
    description: "Monitor supply chain network health, compliance rates, and flag violations.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-agri-base px-4 py-12">
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <BrandLogo className="relative" size="lg" />

      <h1
        className="mt-4 text-center text-3xl font-bold text-agri-text"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Welcome to <BrandName className="text-3xl" />!
      </h1>
      <h2 className="mt-2 text-center text-xl font-semibold text-accent-blue">Choose your role</h2>
      <p className="mb-8 mt-1 text-center text-sm text-agri-muted">
        Select the workspace that best matches how you use AgriTrust.
      </p>

      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
        {roles.map(({ role, icon: Icon, color, bg, border, glow, selectedGlow, title, description }) => {
          const isSelected = selectedRole === role;

          return (
            <button
              key={role}
              className={`glass w-52 cursor-pointer rounded-2xl border-2 bg-agri-surface p-6 transition-all duration-150 hover:-translate-y-1 hover:scale-[1.02] ${
                isSelected ? `${border} ${selectedGlow}` : "border-agri-border hover:border-agri-border-focus"
              }`}
              type="button"
              onClick={() => setSelectedRole(role)}
            >
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${bg} ${glow}`}>
                <Icon className={`h-10 w-10 ${color}`} />
              </div>
              <h3 className="mt-4 text-center font-bold text-agri-text">{title}</h3>
              <p className="mt-2 text-center text-sm text-agri-muted">{description}</p>
            </button>
          );
        })}
      </div>

      <button
        className={`mt-8 rounded-xl px-8 py-3 font-semibold text-white ${
          selectedRole
            ? "bg-accent-blue hover:bg-accent-blue/90"
            : "cursor-not-allowed bg-accent-blue/50 opacity-50"
        }`}
        type="button"
        disabled={!selectedRole}
        onClick={() => {
          if (selectedRole) {
            router.push("/dashboard");
          }
        }}
      >
        Continue
      </button>

      <p className="mt-4 text-center text-xs text-agri-muted">You can update your role later in settings.</p>

      <footer className="mt-12 border-t border-agri-border pt-6 text-center text-xs text-agri-muted">
        © 2026 AgriTrust · Team Innovaro · Built for STEM Festival 2026
      </footer>
    </main>
  );
}
