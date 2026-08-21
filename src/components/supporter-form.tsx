"use client";

import { FormEvent, useMemo, useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { shareMessage } from "@/lib/campaign";
import { trackCampaignEvent } from "@/lib/analytics";

type RegistrationResult = {
  supporterId: string;
  referralCode: string;
  referralUrl: string;
};

function readReferralCookie() {
  if (typeof document === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("vote_elle_ref="))
      ?.split("=")[1] ?? ""
  );
}

export function SupporterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegistrationResult | null>(null);

  const whatsappUrl = useMemo(() => {
    if (!result) return "";
    return `https://wa.me/?text=${encodeURIComponent(shareMessage(result.referralUrl))}`;
  }, [result]);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");
    trackCampaignEvent("supporter_form_started");

    const form = new FormData(event.currentTarget);
    const payload = {
      firstName: form.get("firstName"),
      phone: form.get("phone"),
      country: form.get("country"),
      email: form.get("email"),
      district: form.get("district"),
      ageRange: form.get("ageRange"),
      termsConsent: form.get("termsConsent") === "on",
      marketingConsent: form.get("marketingConsent") === "on",
      referralCode: readReferralCookie(),
      source: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
    };

    const response = await fetch("/api/supporters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setError(data.error ?? "Registration failed. Please check the form and try again.");
      return;
    }

    setResult(data);
    setStatus("done");
    trackCampaignEvent("supporter_registered", {
      country: payload.country?.toString(),
      referral_code: payload.referralCode?.toString(),
    });
  }

  if (result) {
    return (
      <section className="reveal-in relative overflow-hidden border border-[#561020]/12 bg-[#fff8f5] p-6 shadow-[0_24px_70px_rgba(86,16,32,0.12)] sm:p-8">
        <div className="uganda-thread absolute inset-x-6 top-0 h-1.5" />
        <p className="eyebrow mt-3 text-[#d90000]">
          Welcome to Team Elle
        </p>
        <h3 className="mt-4 max-w-xl font-display text-4xl font-normal leading-tight sm:text-5xl">
          You are in. Bring three Ugandans with you.
        </h3>
        <p className="mt-5 max-w-2xl font-serif text-lg font-light leading-relaxed text-[#561020]/68">
          Your referral link is ready. Share it where people will actually tap.
        </p>
        <div className="mt-6 break-all border border-[#561020]/12 bg-[#f7d6d0]/40 p-4 font-mono text-sm text-[#561020]/72 shadow-inner">
          {result.referralUrl}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCampaignEvent("whatsapp_share_clicked", { referral_code: result.referralCode })}
            className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#128c7e] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Share on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(result.referralUrl);
              trackCampaignEvent("copy_link_clicked", { referral_code: result.referralCode });
            }}
            className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#561020]/18 px-4 text-sm font-semibold uppercase tracking-[0.14em] hover:border-[#d90000] hover:text-[#d90000]"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copy link
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      className="relative overflow-hidden border border-[#561020]/12 bg-[#fff8f5] p-6 shadow-[0_24px_70px_rgba(86,16,32,0.12)] sm:p-8"
    >
      <div className="uganda-thread absolute inset-x-6 top-0 h-1.5" />
      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-[#d90000]">
            Join Team Elle
          </p>
          <h3 className="mt-3 font-display text-4xl font-normal leading-tight">
            Your campaign pass
          </h3>
        </div>
        <p className="eyebrow max-w-xs text-[#561020]/42">
          Private supporter details
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          First name
          <input
            name="firstName"
            required
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Phone / WhatsApp
          <input
            name="phone"
            required
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Country
          <input
            name="country"
            required
            defaultValue="Uganda"
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email optional
          <input
            name="email"
            type="email"
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          District / City optional
          <input
            name="district"
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Age range optional
          <select
            name="ageRange"
            className="min-h-12 border border-[#561020]/16 bg-[#f7d6d0]/34 px-3 font-normal outline-none transition-[border-color,box-shadow] focus:border-[#d90000] focus:shadow-[0_0_0_3px_rgba(217,0,0,0.12)]"
          >
            <option value="">Prefer not to say</option>
            <option>Under 18</option>
            <option>18-24</option>
            <option>25-34</option>
            <option>35-44</option>
            <option>45+</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 border border-[#561020]/10 bg-[#f7d6d0]/34 p-4 text-sm leading-6 text-[#561020]/72">
        <label className="flex gap-3">
          <input name="termsConsent" type="checkbox" required className="mt-1 h-4 w-4" />
          <span>
            I agree to the Campaign Terms and Privacy Notice. No purchase
            necessary to enter the Team Elle supporter promotion.
          </span>
        </label>
        <label className="flex gap-3">
          <input name="marketingConsent" type="checkbox" className="mt-1 h-4 w-4" />
          <span>Send me Elle&apos;s Miss World and Miss Uganda updates.</span>
        </label>
      </div>

      {error ? <p className="mt-4 text-sm font-semibold text-[#7a1f3d]">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="pressable mt-6 min-h-12 w-full rounded-full bg-[#050505] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd100] hover:bg-[#d90000] hover:text-[#fff8f5] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? "Joining Team Elle..." : "Join Team Elle"}
      </button>

      <p className="mt-4 text-xs leading-5 text-[#561020]/52">
        Official voting remains on 1VOTE / Eventista. This form does not verify
        or guarantee an external vote.
      </p>
    </form>
  );
}
