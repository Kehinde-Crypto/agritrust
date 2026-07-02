"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-agri-base">
      <div className="fixed inset-0 -z-10 bg-agri-base">
        <div className="absolute top-0 left-[260px] right-0 h-[500px] hero-gradient opacity-60 pointer-events-none" />
      </div>
      <Sidebar isMobileOpen={isMobileOpen} />
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close mobile navigation"
          className="fixed bottom-0 left-0 right-0 top-16 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="min-h-screen lg:ml-14">
        <TopBar onMenuClick={() => setIsMobileOpen((current) => !current)} />
        <main className="min-h-screen pt-16">{children}</main>
      </div>
    </div>
  );
}
