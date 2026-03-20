import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <section className="section page-offset admin-shell">
      <div className="container">
        <AdminLoginForm />
      </div>
    </section>
  );
}
