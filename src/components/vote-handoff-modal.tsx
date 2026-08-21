"use client";

import { type MouseEvent, useRef, useState } from "react";
import { campaign, type VotingPackage } from "@/lib/campaign";
import { trackCampaignEvent } from "@/lib/analytics";

type Props = {
  packageOption: VotingPackage;
  label: string;
  variant: "primary" | "secondary" | "compact" | "compactLight";
};

const buttonStyles = {
  primary:
    "pressable inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#ffd100] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#050505] shadow-[0_18px_44px_rgba(255,209,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  secondary:
    "pressable inline-flex min-h-14 w-full items-center justify-center rounded-full border border-[#ffd100]/35 bg-[#d90000]/82 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#fff8f5] shadow-[inset_0_0_26px_rgba(255,209,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  compact:
    "pressable inline-flex min-h-11 w-full items-center justify-start rounded-full border border-[#ffd100]/22 bg-[#fff8f5]/5 px-4 py-3 text-left text-sm font-medium text-[#fff8f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff8f5]",
  compactLight:
    "pressable inline-flex min-h-11 w-full items-center justify-start rounded-full border border-[#561020]/14 bg-[#050505] px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d90000]",
};

function getReferralCode() {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("vote_elle_ref="))
    ?.split("=")[1];
}

export function VoteHandoffModal({ packageOption, label, variant }: Props) {
  const [celebrating, setCelebrating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  function trackVoteClick() {
    const eventName = packageOption.priceUSD === 0 ? "free_vote_clicked" : "paid_vote_clicked";

    trackCampaignEvent(eventName, {
      vote_package: packageOption.votes,
      price_usd: packageOption.priceUSD,
    });
    trackCampaignEvent("official_vote_clicked", {
      vote_package: packageOption.votes,
      price_usd: packageOption.priceUSD,
    });

    fetch("/api/vote-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        votePackage: packageOption.votes,
        priceUsd: packageOption.priceUSD,
        referralCode: getReferralCode(),
        source: new URLSearchParams(window.location.search).get("utm_source"),
      }),
    }).catch(() => undefined);
  }

  function goToVote(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    trackVoteClick();
    setCelebrating(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      window.location.assign(campaign.votingUrl);
    }, 950);
  }

  function goNow(event: MouseEvent<HTMLAnchorElement>) {
    event.stopPropagation();
    trackVoteClick();
  }

  return (
    <>
      <a className={buttonStyles[variant]} href={campaign.votingUrl} onClick={goToVote}>
        {label}
      </a>

      {celebrating ? (
        <div className="vote-celebration pointer-events-none fixed inset-0 z-50 grid place-items-center px-6" aria-live="polite">
          <div className="vote-thanks pointer-events-auto text-center text-[#fff8f5]">
            <p className="eyebrow text-[#ffd100]">Thank you, Team Uganda</p>
            <p className="mt-3 font-display text-4xl font-normal leading-tight">
              Sending you to vote for Elle
            </p>
            <a
              href={campaign.votingUrl}
              onClick={goNow}
              className="pressable mt-5 inline-flex rounded-full border border-[#ffd100]/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd100]"
            >
              Open vote link now
            </a>
          </div>
          <span className="ug-balloon ug-balloon-black left-[12%]" aria-hidden="true" />
          <span className="ug-balloon ug-balloon-yellow left-[28%]" aria-hidden="true" />
          <span className="ug-balloon ug-balloon-red left-[44%]" aria-hidden="true" />
          <span className="ug-balloon ug-balloon-black left-[61%]" aria-hidden="true" />
          <span className="ug-balloon ug-balloon-yellow left-[76%]" aria-hidden="true" />
          <span className="ug-balloon ug-balloon-red left-[88%]" aria-hidden="true" />
        </div>
      ) : null}
    </>
  );
}
