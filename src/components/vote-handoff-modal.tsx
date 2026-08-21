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
    "pressable min-h-14 w-full rounded-[1.55rem] bg-[linear-gradient(135deg,#fff3b0_0%,#f6bf59_52%,#d79530_100%)] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_16px_42px_rgba(255,188,58,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd100]",
  secondary:
    "pressable min-h-14 w-full rounded-[1.55rem] border border-[#f5a0a8]/42 bg-[#370914]/72 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[inset_0_0_30px_rgba(255,209,0,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd100]",
  compact:
    "pressable min-h-11 w-full rounded-md border border-white/18 bg-white/[0.025] px-4 py-3 text-left text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd100]",
  compactLight:
    "pressable min-h-11 w-full rounded-md border border-black/14 bg-[#101010] px-4 py-3 text-left text-sm font-black uppercase tracking-[0.08em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d90000]",
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
          className="fixed inset-0 z-50 grid place-items-center bg-black/76 px-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vote-handoff-title"
        >
          <div className="modal-panel w-full max-w-lg border border-white/16 bg-[#101010] p-5 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ffd100]">
                  Official handoff
                </p>
                <h2 id="vote-handoff-title" className="mt-3 text-3xl font-black uppercase leading-none">
                  You&apos;re heading to the official Miss World voting page.
                </h2>
              </div>
              <button
                type="button"
                className="pressable grid h-10 w-10 place-items-center border border-white/18 hover:border-[#ffd100] hover:text-[#ffd100]"
                onClick={() => setOpen(false)}
                aria-label="Close voting handoff"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 border border-white/12 bg-white/[0.04] p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/58">Uganda</p>
              <p className="mt-1 text-2xl font-black">{campaign.candidate.name}</p>
              <p className="mt-4 text-white/68">
                Complete your vote there, then come back and join Team Elle.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={continueToVote}
                disabled={loading}
                className="pressable inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#ffd100] px-5 text-sm font-black uppercase text-black disabled:cursor-wait disabled:opacity-70"
              >
                Continue to 1VOTE <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="pressable min-h-12 border border-white/20 px-5 text-sm font-black uppercase text-white hover:border-white/40"
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
