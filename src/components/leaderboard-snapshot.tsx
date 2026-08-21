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
    <section id="leaderboard" className="relative overflow-hidden bg-[#090909] px-5 py-20 text-white sm:px-8">
      <div className="ug-stripe absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#ffd100]">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Official leaderboard snapshot
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.86] sm:text-7xl">
            Know the gap. Close it.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/66">
            This graph is a manual snapshot from the official leaderboard. Vote
            counts are not verified by this site, and they should be refreshed
            from 1VOTE before launch posts go out.
          </p>

          <div className="mt-8 border border-white/14 bg-white/[0.04] p-5">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#ffd100]">
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
                <div key={label} className="border border-white/12 bg-black/40 p-3 text-center">
                  <p className="text-3xl font-black tabular-nums text-white sm:text-4xl">
                    {value.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[0.64rem] font-black uppercase tracking-[0.18em] text-white/46">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-white/56">
              {timeLeft.expired
                ? "Voting appears to be closed. Update the campaign state before sending traffic."
                : "Every hour matters while the official leaderboard is moving."}
            </p>
          </div>

          <div className="mt-5">
            <VoteHandoffModal packageOption={votePackage} label="Vote now and cut the gap" variant="primary" />
          </div>
        </div>

        <div className="border border-white/14 bg-[#151210] p-5 shadow-2xl">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c9956b]">
                {campaign.leaderboardSnapshot.label}
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase">Leader to beat</h3>
            </div>
            <p className="text-sm text-white/52">{campaign.leaderboardSnapshot.capturedAt}</p>
          </div>

          <div className="mt-6 grid gap-4">
            {sortedCandidates.map((candidate) => {
              const width = candidate.votes === null ? 8 : Math.max(8, (candidate.votes / maxVotes) * 100);

              return (
                <article
                  key={candidate.country}
                  className={
                    candidate.isElle
                      ? "border border-[#ffd100]/60 bg-[#ffd100]/10 p-4"
                      : "border border-white/10 bg-black/26 p-4"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/46">
                        {candidate.rank ? `Rank ${candidate.rank}` : "Team Elle"}
                      </p>
                      <h4 className="mt-1 text-2xl font-black uppercase">
                        {candidate.country}
                      </h4>
                      <p className="mt-1 text-sm text-white/56">{candidate.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black tabular-nums">
                        {formatVotes(candidate.votes)}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/44">
                        official votes
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden bg-white/10">
                    <div
                      className={candidate.isElle ? "h-full bg-[#ffd100]" : "h-full bg-[#d90000]"}
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  {candidate.isElle ? (
                    <p className="mt-3 text-sm leading-6 text-white/62">
                      {elleGap === null
                        ? "Add NEXT_PUBLIC_ELLE_OFFICIAL_VOTES to show the exact gap to first place."
                        : `${elleGap.toLocaleString("en-US")} more official votes puts Uganda above the current leader.`}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-5 text-white/42">
            {campaign.leaderboardSnapshot.source}. This campaign site tracks
            outbound clicks and self-attestations only.
          </p>
        </div>
      </div>
    </section>
  );
}
