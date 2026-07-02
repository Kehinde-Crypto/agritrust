"use client";

import { Eye, EyeOff, Lock, Mail, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BrandLogo from "@/components/brand/BrandLogo";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function updateField(field: keyof RegisterForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-agri-base px-4 py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-green/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent-blue/8 blur-3xl" />

      <section className="glass relative z-10 w-full max-w-md rounded-2xl border border-agri-border border-t border-t-accent-green/20 bg-agri-surface p-8 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
        <div className="mb-6 flex justify-center">
          <BrandLogo size="lg" />
        </div>

        <h2
          className="text-center text-2xl font-bold text-agri-text"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Create your account
        </h2>
        <p className="mb-6 mt-1 text-center text-sm text-agri-muted">
          Join AgriTrust to verify and trace trusted produce.
        </p>

        <form className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1 block text-sm text-agri-muted">Full name</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
              <input
                className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pl-9 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                placeholder="Amara Okafor"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-agri-muted">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
              <input
                className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pl-9 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                placeholder="amara@farmco.ng"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-agri-muted">Phone</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-agri-muted">
                🇳🇬 +234
              </span>
              <input
                className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pl-20 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                placeholder="801 234 5678"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-agri-muted">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
              <input
                className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pl-9 pr-10 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-agri-muted hover:text-agri-text"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-agri-muted">Confirm password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-muted" />
              <input
                className="w-full rounded-lg border border-agri-border bg-agri-raised px-4 py-2.5 pl-9 pr-10 text-sm text-agri-text placeholder:text-agri-muted transition-colors focus:border-agri-border-focus focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-agri-muted hover:text-agri-text"
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button
            className="mt-2 w-full rounded-lg bg-accent-blue py-2.5 font-medium text-white transition-shadow hover:bg-accent-blue/90 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)]"
            type="button"
            onClick={() => router.push("/onboarding")}
          >
            Create Account
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-agri-border" />
          <span className="text-xs text-agri-muted">OR</span>
          <div className="h-px flex-1 bg-agri-border" />
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-agri-border py-2.5 text-sm font-medium text-agri-text hover:bg-agri-raised"
          type="button"
          onClick={() => router.push("/onboarding")}
        >
          <Wallet className="h-4 w-4" />
          Connect Web3 Wallet
        </button>

        <p className="mt-4 text-center text-sm text-agri-muted">
          Already have an account?{" "}
          <Link className="text-accent-green" href="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
