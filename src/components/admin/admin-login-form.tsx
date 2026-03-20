"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createBrowserSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";

export function AdminLoginForm() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!supabase) {
      setError("Supabase environment variables are missing. Add them before using the live admin.");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="admin-auth-card">
      <div>
        <p className="eyebrow">Admin login</p>
        <h1>Manage Anikitty content</h1>
        <p>
          Sign in with your Supabase admin account to manage products, homepage copy, FAQs, and media.
        </p>
      </div>

      {!hasSupabaseEnv ? (
        <div className="notice-card">
          <h2>Supabase setup required</h2>
          <p>
            Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
            `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` to enable the live admin dashboard.
          </p>
        </div>
      ) : null}

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input className="input" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        </label>
        <label>
          Password
          <input className="input" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        <button className="button" disabled={submitting || !hasSupabaseEnv} type="submit">
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
