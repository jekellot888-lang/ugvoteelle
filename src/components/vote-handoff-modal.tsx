"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { campaign, type VotingPackage } from "@/lib/campaign";
import { trackCampaignEvent } from "@/lib/analytics";

type Props = {
  packageOption: VotingPackage;
  label: string;
  variant: "primary" | "secondary" | "compact" | "compactLight";
};

const buttonStyles = {
  primary:
    "pressable min-h-14 w-full rounded-full bg-[#b76e79] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#561020] shadow-[0_18px_44px_rgba(183,110,121,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  secondary:
    "pressable min-h-14 w-full rounded-full border border-[#fff8f5]/28 bg-[#561020]/44 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#fff8f5] shadow-[inset_0_0_26px_rgba(247,214,208,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  compact:
    "pressable min-h-11 w-full rounded-full border border-[#fff8f5]/18 bg-[#fff8f5]/5 px-4 py-3 text-left text-sm font-medium text-[#fff8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  compactLight:
    "pressable min-h-11 w-full rounded-full border border-[#561020]/14 bg-[#561020] px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.18em] text-[#fff8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b76e79]",
};

function getReferralCode() {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("vote_elle_ref="))
    ?.split("=")[1];
}

export function VoteHandoffModal({ packageOption, label, variant }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function showModal() {
    trackCampaignEvent("vote_handoff_shown", {
      vote_package: packageOption.votes,
      price_usd: packageOption.priceUSD,
    });
    setOpen(true);
  }

  async function continueToVote() {
    setLoading(true);
    const eventName = packageOption.priceUSD === 0 ? "free_vote_clicked" : "paid_vote_clicked";

    trackCampaignEvent(eventName, {
      vote_package: packageOption.votes,
      price_usd: packageOption.priceUSD,
    });
    trackCampaignEvent("official_vote_clicked", {
      vote_package: packageOption.votes,
      price_usd: packageOption.priceUSD,
    });

    await fetch("/api/vote-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votePackage: packageOption.votes,
        priceUsd: packageOption.priceUSD,
        referralCode: getReferralCode(),
        source: new URLSearchParams(window.location.search).get("utm_source"),
      }),
    }).catch(() => undefined);

    window.location.href = campaign.votingUrl;
  }

  return (
    <>
      <button className={buttonStyles[variant]} onClick={showModal} type="button">
        {label}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#260710]/76 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vote-handoff-title"
        >
          <div className="modal-panel w-full max-w-lg border border-[#b76e79]/24 bg-[#561020] p-5 text-[#fff8f5] shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[#b76e79]">
                  Official handoff
                </p>
                <h2 id="vote-handoff-title" className="mt-3 font-display text-4xl font-normal leading-tight">
                  You are heading to the official Miss World voting page.
                </h2>
              </div>
              <button
                type="button"
                className="pressable grid h-10 w-10 place-items-center rounded-full border border-[#fff8f5]/18 hover:border-[#b76e79] hover:text-[#b76e79]"
                onClick={() => setOpen(false)}
                aria-label="Close voting handoff"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 border border-[#fff8f5]/12 bg-[#fff8f5]/6 p-4">
              <p className="eyebrow text-[#b76e79]">Uganda</p>
              <p className="mt-2 font-display text-3xl font-normal">{campaign.candidate.name}</p>
              <p className="mt-4 font-serif text-lg font-light text-[#f7d6d0]/72">
                Complete your vote there, then come back and join Team Elle.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={continueToVote}
                disabled={loading}
                className="pressable inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#b76e79] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#561020] disabled:cursor-wait disabled:opacity-70"
              >
                Continue to 1VOTE <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="pressable min-h-12 rounded-full border border-[#fff8f5]/20 px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#fff8f5] hover:border-[#fff8f5]/40"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
