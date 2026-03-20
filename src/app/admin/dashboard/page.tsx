import type { Metadata } from "next";

import { DashboardApp } from "@/components/admin/dashboard-app";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return (
    <section className="section page-offset admin-shell">
      <div className="container">
        <DashboardApp />
      </div>
    </section>
  );
}
