"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Invalid admin password or missing admin environment variables.");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-md border border-white/14 bg-white/[0.04] p-5">
      <h1 className="text-3xl font-black uppercase">Admin authentication</h1>
      <p className="mt-3 text-white/62">
        Enter the campaign admin password. In production, replace this shell
        with Supabase Auth or SSO before exposing operational data.
      </p>
      <label className="mt-6 grid gap-2 text-sm font-bold">
        Admin password
        <input
          name="password"
          type="password"
          required
          className="min-h-12 border border-white/18 bg-black px-3 text-white"
        />
      </label>
      {error ? <p className="mt-4 text-sm font-bold text-[#ffd100]">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 min-h-12 w-full bg-[#ffd100] px-5 text-sm font-black uppercase text-black disabled:opacity-70"
      >
        {loading ? "Checking..." : "Enter admin"}
      </button>
    </form>
  );
}
