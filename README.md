# Vote Elle Uganda

Production scaffold for the Team Elle Miss World voting campaign layer.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Supabase PostgreSQL with RLS
- PostHog client analytics
- Vercel-ready environment config

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app works in demo mode without Supabase. Registration returns a generated
referral link, but no data is persisted until Supabase environment variables are
set.

## Supabase

Apply the migration in `supabase/migrations/202608200001_vote_elle_campaign.sql`.
All public tables have RLS enabled. Server API routes use
`SUPABASE_SERVICE_ROLE_KEY`; never expose that key to browser code.

## Launch notes

- Replace `public/images/elle-official-portrait-placeholder.svg` with approved
  official photography of Trivia Elle Muhoza.
- Keep official voting and payments on 1VOTE / Eventista.
- Do not label self-attestation as verified voting.
- Update `NEXT_PUBLIC_ELLE_OFFICIAL_VOTES`, `NEXT_PUBLIC_ELLE_OFFICIAL_RANK`,
  and `NEXT_PUBLIC_VOTING_ENDS_AT` before publishing leaderboard posts.
- Final promotional terms need legal review before rewards go live.
