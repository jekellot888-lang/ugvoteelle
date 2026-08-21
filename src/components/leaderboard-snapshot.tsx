"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Trophy } from "lucide-react";
import {
  campaign,
  type LeaderboardCandidate,
  type VotingPackage,
} from "@/lib/campaign";
import { VoteHandoffModal } from "@/components/vote-handoff-modal";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function formatVotes(votes: number | null) {
  if (votes === null) return "Add Elle's latest count";
  return votes.toLocaleString("en-US");
}

function countdownTo(target: string): CountdownParts {
  const diff = new Date(target).getTime() - Date.now();
  const safeDiff = Math.max(0, diff);

  return {
    days: Math.floor(safeDiff / 86_400_000),
    hours: Math.floor((safeDiff / 3_600_000) % 24),
    minutes: Math.floor((safeDiff / 60_000) % 60),
    seconds: Math.floor((safeDiff / 1000) % 60),
    expired: diff <= 0,
  };
}

function gapToLeader(candidate: LeaderboardCandidate, leaderVotes: number) {
  if (candidate.votes === null) return null;
  return Math.max(0, leaderVotes - candidate.votes + 1);
}

export function LeaderboardSnapshot({ votePackage }: { votePackage: VotingPackage }) {
  const [timeLeft, setTimeLeft] = useState(() => countdownTo(campaign.votingEndsAt));
  const candidates = campaign.leaderboardSnapshot.candidates;
  const leader = candidates.find((candidate) => candidate.rank === 1);
  const leaderVotes = leader?.votes ?? 0;
  const elle = candidates.find((candidate) => candidate.isElle);
  const elleGap = elle && leaderVotes ? gapToLeader(elle, leaderVotes) : null;
  const maxVotes = Math.max(...candidates.map((candidate) => candidate.votes ?? 0), 1);

  const sortedCandidates = useMemo(
    () =>
      [...candidates].sort((a, b) => {
        if (a.isElle) return -1;
        if (b.isElle) return 1;
        return (a.rank ?? 99) - (b.rank ?? 99);
      }),
    [candidates],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(countdownTo(campaign.votingEndsAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="leaderboard" className="relative overflow-hidden bg-[#fff8f5] px-6 py-20 text-[#561020] sm:py-28">
      <div className="uganda-thread absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flow-reveal">
          <p className="eyebrow inline-flex items-center gap-2 text-[#d90000]">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Leaderboard snapshot
          </p>
          <h2 className="mt-6 font-display text-5xl font-normal leading-tight sm:text-6xl">
            Know the gap. Close it.
          </h2>
          <p className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-[#561020]/72">
            A manual snapshot from the official leaderboard. Refresh it before launch posts go out.
          </p>

          <div className="mt-10 border border-[#561020]/12 bg-[#f7d6d0]/42 p-5">
            <p className="eyebrow inline-flex items-center gap-2 text-[#d90000]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Voting closes in
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                ["Days", timeLeft.days],
                ["Hours", timeLeft.hours],
                ["Min", timeLeft.minutes],
                ["Sec", timeLeft.seconds],
              ].map(([label, value]) => (
                <div key={label} className="border border-[#561020]/10 bg-[#fff8f5] p-3 text-center">
                  <p className="font-display text-3xl font-normal tabular-nums text-[#561020] sm:text-4xl">
                    {value.toString().padStart(2, "0")}
                  </p>
                  <p className="eyebrow mt-1 text-[0.6rem] text-[#561020]/48">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-serif text-base font-light leading-relaxed text-[#561020]/62">
              {timeLeft.expired
                ? "Voting appears to be closed. Update the campaign state before sending traffic."
                : "Every hour matters while the official leaderboard is moving."}
            </p>
          </div>

          <div className="mt-5">
            <VoteHandoffModal packageOption={votePackage} label="Vote now and cut the gap" variant="primary" />
          </div>
        </div>

        <div className="flow-reveal border border-[#ffd100]/18 bg-[#050505] p-5 text-[#fff8f5] shadow-[0_24px_70px_rgba(5,5,5,0.22)]" data-delay="1">
          <div className="uganda-thread -mx-5 -mt-5 mb-5 h-1.5" />
          <div className="flex flex-col gap-2 border-b border-[#fff8f5]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#ffd100]">
                {campaign.leaderboardSnapshot.label}
              </p>
              <h3 className="mt-3 font-display text-4xl font-normal">Leader to beat</h3>
            </div>
            <p className="font-serif text-base font-light text-[#f7d6d0]/56">
              {campaign.leaderboardSnapshot.capturedAt}
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {sortedCandidates.map((candidate) => {
              const width = candidate.votes === null ? 8 : Math.max(8, (candidate.votes / maxVotes) * 100);

              return (
                <article
                  key={candidate.country}
                  className={
                    candidate.isElle
                      ? "border border-[#ffd100]/70 bg-[#ffd100]/10 p-4"
                      : "border border-[#fff8f5]/10 bg-[#260710]/28 p-4"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-[#f7d6d0]/46">
                        {candidate.rank ? `Rank ${candidate.rank}` : "Team Elle"}
                      </p>
                      <h4 className="mt-2 font-display text-3xl font-normal">
                        {candidate.country}
                      </h4>
                      <p className="mt-1 font-serif text-base font-light text-[#f7d6d0]/60">{candidate.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-normal tabular-nums">
                        {formatVotes(candidate.votes)}
                      </p>
                      <p className="eyebrow text-[0.58rem] text-[#f7d6d0]/44">
                        official votes
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden bg-[#fff8f5]/12">
                    <div
                      className={candidate.isElle ? "h-full bg-[#ffd100]" : "h-full bg-[#d90000]"}
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  {candidate.isElle ? (
                    <p className="mt-3 font-serif text-base font-light leading-relaxed text-[#f7d6d0]/68">
                      {elleGap === null
                        ? "Add NEXT_PUBLIC_ELLE_OFFICIAL_VOTES to show the exact gap to first place."
                        : `${elleGap.toLocaleString("en-US")} more official votes puts Uganda above the current leader.`}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-5 text-[#f7d6d0]/42">
            {campaign.leaderboardSnapshot.source}. This campaign site tracks
            outbound clicks and self-attestations only.
          </p>
        </div>
      </div>
    </section>
  );
}
