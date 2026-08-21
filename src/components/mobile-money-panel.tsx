"use client";

import { useState } from "react";
import { Check, Copy, Smartphone } from "lucide-react";
import { campaign, formatUGX, priceUGX } from "@/lib/campaign";

const paidFeaturedPackages = campaign.votingPackages.filter(
  (item) => item.featured && item.priceUSD > 0,
);

export function MobileMoneyPanel() {
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    await navigator.clipboard.writeText(campaign.mobileMoney.number).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="momo-panel flow-reveal mt-8 overflow-hidden border border-[#ffd100]/22 bg-[#0b0b0b] text-[#fff8f5]" data-delay="2">
      <div className="uganda-thread h-1.5" />
      <div className="grid gap-px bg-[#fff8f5]/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-[#0b0b0b] p-6 sm:p-8">
          <p className="eyebrow inline-flex items-center gap-2 text-[#ffd100]">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            Pay with MTN
          </p>
          <h3 className="mt-5 font-display text-4xl font-normal leading-tight">
            No card? Send Mobile Money.
          </h3>
          <p className="mt-4 font-serif text-lg font-light leading-relaxed text-[#f7d6d0]/70">
            Many of us will not use cards or PayPal for this. Send your vote money to Tracy&apos;s MTN line and Team Elle will buy the priced votes for Elle.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border border-[#fff8f5]/12 bg-[#fff8f5]/5 p-4">
              <p className="eyebrow text-[#f7d6d0]/44">MTN number</p>
              <p className="mt-2 font-display text-3xl font-normal tabular-nums text-[#ffd100]">
                {campaign.mobileMoney.number}
              </p>
            </div>
            <div className="border border-[#fff8f5]/12 bg-[#fff8f5]/5 p-4">
              <p className="eyebrow text-[#f7d6d0]/44">Registered name</p>
              <p className="mt-2 font-display text-3xl font-normal text-[#fff8f5]">
                {campaign.mobileMoney.registeredName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={copyNumber}
            className="pressable mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ffd100] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#050505]"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy number"}
          </button>
        </div>

        <div className="bg-[#111] p-6 sm:p-8">
          <p className="eyebrow text-[#d90000]">Send this amount</p>
          <div className="mt-5 grid gap-3">
            {paidFeaturedPackages.map((item) => (
              <div key={item.votes} className="flex items-center justify-between gap-4 border-b border-[#fff8f5]/10 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-semibold text-[#fff8f5]">
                    {item.votes.toLocaleString("en-US")} votes
                  </p>
                  <p className="text-sm text-[#f7d6d0]/52">{item.name}</p>
                </div>
                <p className="font-display text-2xl font-normal tabular-nums text-[#ffd100]">
                  {formatUGX(priceUGX(item.priceUSD))}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-[#f7d6d0]/46">
            Put your name and vote bundle in the reason if your phone gives you that option.
          </p>
        </div>
      </div>
    </section>
  );
}
