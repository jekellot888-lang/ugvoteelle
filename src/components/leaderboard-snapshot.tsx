"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Clock, Flame, Trophy } from "lucide-react";
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

const initialCountdown: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false,
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

function progressTo(currentVotes: number, targetVotes: number) {
  return Math.min(100, Math.max(0, (currentVotes / targetVotes) * 100));
}

export function LeaderboardSnapshot({ votePackage }: { votePackage: VotingPackage }) {
  const [timeLeft, setTimeLeft] = useState(initialCountdown);
  const candidates = campaign.leaderboardSnapshot.candidates;
  const leader = candidates.find((candidate) => candidate.rank === 1);
  const leaderVotes = leader?.votes ?? 0;
  const elle = candidates.find((candidate) => candidate.isElle);
  const elleVotes = elle?.votes ?? 0;
  const elleRank = elle?.rank ?? 16;
  const elleGap = elle && leaderVotes ? gapToLeader(elle, leaderVotes) : null;
  const maxVotes = Math.max(...candidates.map((candidate) => candidate.votes ?? 0), 1);
  const nextMilestoneVotes = campaign.leaderboardSnapshot.nextMilestoneVotes;
  const nextMilestoneGap = Math.max(0, nextMilestoneVotes - elleVotes);
  const nextMilestoneProgress = progressTo(elleVotes, nextMilestoneVotes);
  const nearestChaser = candidates
    .filter((candidate) => candidate.rank && candidate.rank > elleRank)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))[0];
  const chaserGap =
    nearestChaser?.votes && elleVotes ? Math.max(0, elleVotes - nearestChaser.votes) : null;

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
    const firstFrame = window.requestAnimationFrame(() => {
      setTimeLeft(countdownTo(campaign.votingEndsAt));
    });
    const timer = window.setInterval(() => {
      setTimeLeft(countdownTo(campaign.votingEndsAt));
    }, 1000);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section id="leaderboard" className="relative overflow-hidden bg-[#fff8f5] px-6 py-20 text-[#561020] sm:py-28">
      <div className="uganda-thread absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="flow-reveal">
          <p className="eyebrow inline-flex items-center gap-2 text-[#d90000]">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Rank 16 snapshot
          </p>
          <h2 className="mt-6 font-display text-5xl font-normal leading-tight sm:text-6xl">
            Give Uganda a target people can chase.
          </h2>
          <p className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-[#561020]/72">
            Elle is at rank {elleRank} with {formatVotes(elleVotes)} votes. The next clean push is {nextMilestoneVotes.toLocaleString("en-US")} votes.
          </p>

          <div className="mt-10 overflow-hidden border border-[#561020]/12 bg-[#050505] text-[#fff8f5] shadow-[0_24px_70px_rgba(5,5,5,0.18)]">
            <div className="uganda-thread h-1.5" />
            <div className="p-5">
              <p className="eyebrow inline-flex items-center gap-2 text-[#ffd100]">
                <Flame className="h-4 w-4" aria-hidden="true" />
                Next milestone
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
                <div>
                  <p className="font-display text-7xl font-normal leading-none tabular-nums text-[#ffd100]">
                    #{elleRank}
                  </p>
                  <p className="eyebrow mt-2 text-[#fff8f5]/50">Uganda now</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-normal tabular-nums">
                    {formatVotes(elleVotes)}
                  </p>
                  <p className="mt-2 font-serif text-base font-light text-[#f7d6d0]/62">
                    {nextMilestoneGap.toLocaleString("en-US")} votes to reach {nextMilestoneVotes.toLocaleString("en-US")}.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-[#fff8f5]/52">
                  <span>{formatVotes(elleVotes)} now</span>
                  <span>{nextMilestoneVotes.toLocaleString("en-US")} goal</span>
                </div>
                <div className="milestone-rail mt-3 h-3 overflow-hidden bg-[#fff8f5]/12">
                  <span
                    className="milestone-fill block h-full"
                    style={{ "--progress-scale": nextMilestoneProgress / 100 } as CSSProperties}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-[#f7d6d0]/64 sm:grid-cols-2">
                <p>
                  Lead over rank 17:{" "}
                  <span className="font-semibold text-[#ffd100]">
                    {chaserGap === null ? "refresh needed" : chaserGap.toLocaleString("en-US")}
                  </span>
                </p>
                <p>
                  Gap to first:{" "}
                  <span className="font-semibold text-[#ffd100]">
                    {elleGap === null ? "refresh needed" : elleGap.toLocaleString("en-US")}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border border-[#561020]/12 bg-[#f7d6d0]/42 p-5">
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
            <VoteHandoffModal packageOption={votePackage} label="Vote now toward 6,000" variant="primary" />
          </div>
        </div>

        <div className="flow-reveal border border-[#ffd100]/18 bg-[#050505] p-5 text-[#fff8f5] shadow-[0_24px_70px_rgba(5,5,5,0.22)]" data-delay="1">
          <div className="uganda-thread -mx-5 -mt-5 mb-5 h-1.5" />
          <div className="flex flex-col gap-2 border-b border-[#fff8f5]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#ffd100]">
                {campaign.leaderboardSnapshot.label}
              </p>
              <h3 className="mt-3 font-display text-4xl font-normal">Milestone ladder</h3>
            </div>
            <p className="font-serif text-base font-light text-[#f7d6d0]/56">
              {campaign.leaderboardSnapshot.capturedAt}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {campaign.leaderboardSnapshot.milestones.map((milestone, index) => {
              const reached = elleVotes >= milestone.votes;
              const width = progressTo(elleVotes, milestone.votes);

              return (
                <article
                  key={milestone.label}
                  className="milestone-card flow-reveal border border-[#fff8f5]/10 bg-[#260710]/28 p-4"
                  data-delay={String(index)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={reached ? "eyebrow text-[#ffd100]" : "eyebrow text-[#f7d6d0]/48"}>
                      {milestone.label}
                    </p>
                    <ArrowUpRight
                      className={reached ? "h-4 w-4 text-[#ffd100]" : "h-4 w-4 text-[#f7d6d0]/34"}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 font-display text-3xl font-normal tabular-nums">
                    {milestone.votes.toLocaleString("en-US")}
                  </p>
                  <div className="mt-4 h-1.5 overflow-hidden bg-[#fff8f5]/12">
                    <span
                      className={reached ? "vote-progress-fill reached block h-full" : "vote-progress-fill block h-full"}
                      style={{ "--bar-scale": width / 100 } as CSSProperties}
                    />
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#f7d6d0]/46">{milestone.note}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4">
            {sortedCandidates.map((candidate) => {
              const width = candidate.votes === null ? 8 : Math.max(8, (candidate.votes / maxVotes) * 100);

              return (
                <article
                  key={candidate.country}
                  className={
                    candidate.isElle
                      ? "rank-card rank-card-elle border border-[#ffd100]/70 bg-[#ffd100]/10 p-4"
                      : "rank-card border border-[#fff8f5]/10 bg-[#260710]/28 p-4"
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
                    <span
                      className={candidate.isElle ? "vote-progress-fill elle block h-full" : "vote-progress-fill block h-full"}
                      style={{ "--bar-scale": width / 100 } as CSSProperties}
                    />
                  </div>

                  {candidate.isElle ? (
                    <p className="mt-3 font-serif text-base font-light leading-relaxed text-[#f7d6d0]/68">
                      {elleGap === null
                        ? "Refresh Elle's official vote count before the next campaign push."
                        : `${nextMilestoneGap.toLocaleString("en-US")} votes gets Uganda to the next visible milestone. ${elleGap.toLocaleString("en-US")} votes takes first.`}
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
