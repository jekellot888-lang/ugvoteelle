export type VotingPackage = {
  name: string;
  votes: number;
  priceUSD: number;
  cta: string;
  featured?: boolean;
};

export type LeaderboardCandidate = {
  country: string;
  name: string;
  votes: number | null;
  rank: number | null;
  isElle?: boolean;
};

export type VoteMilestone = {
  label: string;
  votes: number;
  note: string;
};

export const UGX_PER_USD = 3850;

export function priceUGX(priceUSD: number) {
  return priceUSD * UGX_PER_USD;
}

export function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString("en-US")}`;
}

export function formatVotingPrice(priceUSD: number) {
  if (priceUSD === 0) return "Free";

  return `US$${priceUSD} / ${formatUGX(priceUGX(priceUSD))}`;
}

export const campaign = {
  name: "Vote Elle Uganda",
  domain: "voteelle.ug",
  candidate: {
    name: "Trivia Elle Muhoza",
    country: "Uganda",
    title: "Miss Uganda",
    event: "Miss World",
  },
  votingUrl:
    process.env.NEXT_PUBLIC_OFFICIAL_VOTING_URL ??
    "https://missworld.1voting.com/en/candidate/EVENT_dNWcJ/uganda-iLd8",
  votingEndsAt:
    process.env.NEXT_PUBLIC_VOTING_ENDS_AT ?? "2026-09-04T18:00:00+03:00",
  leaderboardSnapshot: {
    label: "Beauty With a Purpose leaderboard",
    source: "Manual snapshot from the official Miss World voting leaderboard",
    capturedAt: "2026-08-21 09:14 EAT",
    nextMilestoneVotes: 6000,
    milestones: [
      { label: "Next push", votes: 6000, note: "Get Uganda clear of the rank-16 cluster" },
      { label: "Top 10 chase", votes: 10000, note: "Make Uganda hard to ignore" },
      { label: "Top 3 line", votes: 47143, note: "Move beyond the current third-place count" },
      { label: "Take the lead", votes: 130699, note: "Beat the current leader by one vote" },
    ] satisfies VoteMilestone[],
    candidates: [
      {
        country: "Uganda",
        name: "Trivia Elle Muhoza",
        votes: process.env.NEXT_PUBLIC_ELLE_OFFICIAL_VOTES
          ? Number(process.env.NEXT_PUBLIC_ELLE_OFFICIAL_VOTES)
          : 5153,
        rank: process.env.NEXT_PUBLIC_ELLE_OFFICIAL_RANK
          ? Number(process.env.NEXT_PUBLIC_ELLE_OFFICIAL_RANK)
          : 16,
        isElle: true,
      },
      { country: "Eritrea", name: "Snit Habteab Tewoldemedhin", votes: 130698, rank: 1 },
      { country: "Botswana", name: "Ruth Ngoni Thomas", votes: 70065, rank: 2 },
      { country: "Malawi", name: "Ireen Navicha", votes: 47142, rank: 3 },
      { country: "Kenya", name: "Trizah Muhenge Akala", votes: 3661, rank: 17 },
      { country: "Tanzania", name: "Latriecia Ian Sawe", votes: 3422, rank: 18 },
      { country: "Zambia", name: "Adah Toonga Mushibi", votes: 2972, rank: 19 },
    ] satisfies LeaderboardCandidate[],
  },
  consentVersion: "2026-08-20-v1",
  votingPackages: [
    { name: "Just vote", votes: 1, priceUSD: 0, cta: "Cast my free vote", featured: true },
    { name: "Back Elle", votes: 40, priceUSD: 4, cta: "Give Elle 40 votes", featured: true },
    { name: "Push Uganda", votes: 110, priceUSD: 10, cta: "Give Elle 110 votes", featured: true },
    { name: "Team Uganda", votes: 500, priceUSD: 40, cta: "Give Elle 500 votes", featured: true },
    { name: "Lift Elle", votes: 85, priceUSD: 8, cta: "Give Elle 85 votes" },
    { name: "Raise the flag", votes: 230, priceUSD: 20, cta: "Give Elle 230 votes" },
    { name: "Diaspora push", votes: 1500, priceUSD: 120, cta: "Give Elle 1,500 votes" },
    { name: "National wave", votes: 2500, priceUSD: 200, cta: "Give Elle 2,500 votes" },
    { name: "Crown push", votes: 6500, priceUSD: 500, cta: "Give Elle 6,500 votes" },
  ] satisfies VotingPackage[],
};

export const shareMessage = (url: string) =>
  `Uganda is at Miss World! I just backed Trivia Elle Muhoza. Join me and help push Uganda forward: ${url}`;
