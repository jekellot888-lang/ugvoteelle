import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleCheck,
  Crown,
  ExternalLink,
  Flag,
  Globe2,
  Heart,
  HeartHandshake,
  Menu,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { campaign, formatVotingPrice } from "@/lib/campaign";
import { LeaderboardSnapshot } from "@/components/leaderboard-snapshot";
import { MobileMoneyPanel } from "@/components/mobile-money-panel";
import { SupporterForm } from "@/components/supporter-form";
import { VoteHandoffModal } from "@/components/vote-handoff-modal";

const featuredPackages = campaign.votingPackages.filter((item) => item.featured);
const otherPackages = campaign.votingPackages.filter((item) => !item.featured);
const primaryPackage = campaign.votingPackages[0];
const powerPackage = campaign.votingPackages[3];
const elleSnapshot = campaign.leaderboardSnapshot.candidates.find((candidate) => candidate.isElle);
const elleRank = elleSnapshot?.rank ?? 16;
const elleVotes = elleSnapshot?.votes ?? 5153;
const nextMilestoneVotes = campaign.leaderboardSnapshot.nextMilestoneVotes;
const nextMilestoneGap = Math.max(0, nextMilestoneVotes - elleVotes);

const votingSteps: Array<{ number: string; title: string; note: string; icon: LucideIcon }> = [
  {
    number: "01",
    title: "Vote Elle",
    note: "Tap the official voting link and choose Uganda.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Use your free vote",
    note: "Every supporter gets a free vote. Use it first.",
    icon: Flag,
  },
  {
    number: "03",
    title: "Add paid votes",
    note: "Pay by card on 1VOTE, or send MTN Mobile Money locally.",
    icon: ShoppingCart,
  },
  {
    number: "04",
    title: "Send the link",
    note: "Share it in your WhatsApp groups and ask three people to vote.",
    icon: CircleCheck,
  },
];

const galleryPhotos = [
  {
    src: "/images/elle/elle-cover-smile.jpg",
    alt: "Trivia Elle Muhoza smiling in a Ugandan-inspired gown",
    objectPosition: "38% 48%",
  },
  {
    src: "/images/elle/elle-cover-center.jpg",
    alt: "Trivia Elle Muhoza standing in a Ugandan-inspired gown",
    objectPosition: "40% 48%",
  },
  {
    src: "/images/elle/elle-cover-hands.jpg",
    alt: "Trivia Elle Muhoza smiling with hands posed near her necklace",
    objectPosition: "39% 48%",
  },
  {
    src: "/images/elle/elle-national-close.jpeg",
    alt: "Trivia Elle Muhoza in a red, black, and gold national dress",
    objectPosition: "50% 32%",
  },
];

const rallyStats: Array<{ icon: LucideIcon; label: string; value: string; note: string }> = [
  { icon: Users, label: "Votes now", value: elleVotes.toLocaleString("en-US"), note: `Uganda is rank ${elleRank}` },
  { icon: Trophy, label: "Next target", value: nextMilestoneGap.toLocaleString("en-US"), note: `votes to ${nextMilestoneVotes.toLocaleString("en-US")}` },
  { icon: Smartphone, label: "MTN line", value: campaign.mobileMoney.number, note: campaign.mobileMoney.registeredName },
  { icon: HeartHandshake, label: "Ask today", value: "3 people", note: "One vote can become four" },
];

const platformCards: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Globe2,
    title: "For every Ugandan with a phone",
    body: "Send the link to your WhatsApp group, class group, office group, church group, or diaspora circle.",
  },
  {
    icon: Trophy,
    title: "We know the next target",
    body: `Elle is rank ${elleRank}. ${nextMilestoneGap.toLocaleString("en-US")} more votes takes Uganda to ${nextMilestoneVotes.toLocaleString("en-US")}.`,
  },
  {
    icon: ShieldCheck,
    title: "No card, no problem",
    body: `Paid votes can go through 1VOTE, or by MTN Mobile Money to ${campaign.mobileMoney.number}, registered as ${campaign.mobileMoney.registeredName}.`,
  },
];

function Marquee() {
  const items = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-[#ffd100]/35 bg-[#050505] py-4">
      <div className="marquee-track flex w-max">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={`${set}-${item}`} className="flex items-center whitespace-nowrap">
                <span className="eyebrow text-[#fff8f5]">Miss World 2026</span>
                <span className="mx-6 text-[#ffd100] sm:mx-8">*</span>
                <span className="eyebrow text-[#d90000]">Uganda</span>
                <span className="mx-6 text-[#ffd100] sm:mx-8">*</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="editorial-shell min-h-screen overflow-x-clip bg-[#fff8f5] pb-24 text-[#561020] lg:pb-0">
      <section className="campaign-hero relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-24 pt-52 text-[#fff8f5] sm:px-6 sm:pt-56">
        <div className="uganda-thread absolute inset-x-0 top-0 z-20 h-1.5" />
        <Image
          src="/images/elle/elle-cover-center.jpg"
          alt=""
          width={1170}
          height={1403}
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[48%_18%] opacity-[0.54]"
        />
        <div className="soft-vignette absolute inset-0 -z-10" />
        <div className="fine-noise absolute inset-0 -z-10" />
        <div className="absolute inset-4 border border-[#ffd100]/18 sm:inset-8" />

        <nav className="absolute inset-x-0 top-0 z-30 px-3 pt-2 sm:px-6 sm:pt-5">
          <div className="campaign-nav mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-4 sm:px-8 sm:py-5">
            <Link href="/" className="pressable justify-self-start" aria-label="Vote Elle Uganda home">
              <span className="vote-logo block">
                <span className="vote-logo-kicker">Vote</span>
                <span className="vote-logo-word">Elle</span>
                <span className="vote-logo-country">
                  <span aria-hidden="true" />
                  Uganda
                  <span aria-hidden="true" />
                </span>
              </span>
            </Link>

            <Link href="#vote" className="flag-badge pressable" aria-label="Jump to vote options">
              <span className="ug-flag h-8 w-14 rounded-sm border border-[#fff8f5]/18 sm:h-9 sm:w-16" />
              <span className="flag-disc" aria-hidden="true" />
            </Link>

            <Link href="#vote" className="menu-mark pressable justify-self-end" aria-label="Jump to vote options">
              <Menu className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </div>

          <div className="campaign-title-strip mx-auto mt-0 flex w-full max-w-7xl items-center gap-2 overflow-hidden px-5 py-4 sm:px-8">
            <span className="font-display text-base text-[#ffd100] sm:text-2xl">Miss World 2026</span>
            <span className="text-[#ffd100]/72">•</span>
            <span className="eyebrow text-[#fff8f5]">Uganda</span>
            <span className="ug-flag h-3 w-6 border border-[#fff8f5]/18" aria-hidden="true" />
          </div>
        </nav>

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
          <p className="eyebrow text-[#ffd100]">Uganda, it is time</p>
          <div className="ug-flag mt-5 h-4 w-20 border border-[#fff8f5]/22" />
          <div className="mt-7 flex w-full max-w-sm items-center gap-4">
            <span className="rule-gold flex-1" />
            <span className="font-serif text-sm font-light uppercase tracking-[0.2em] text-[#f7d6d0]/82">
              to lift
            </span>
            <span className="rule-gold flex-1" />
          </div>

          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.02] text-balance sm:text-7xl lg:text-8xl">
            Trivia Elle Muhoza
          </h1>
          <p className="script gold-text mt-3 text-6xl leading-[1.1] sm:text-7xl lg:text-8xl">
            to the top
          </p>

          <p className="mt-8 max-w-2xl font-serif text-xl font-light leading-relaxed text-[#f7d6d0]/86 sm:text-2xl">
            Elle is carrying our flag at Miss World. Vote now, add a paid-vote push if you can, then send this to three people who will actually tap.
          </p>

          <div id="vote" className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-2">
            <div className="relative">
              <Heart className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 fill-[#050505] text-[#050505]" />
              <div className="[&_a]:justify-start [&_a]:pl-14 [&_a]:text-left">
                <VoteHandoffModal packageOption={primaryPackage} label="Vote Elle free" variant="primary" />
              </div>
            </div>
            <div className="relative">
              <Crown className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#f7d6d0]" />
              <div className="[&_a]:justify-start [&_a]:pl-14 [&_a]:text-left">
                <VoteHandoffModal packageOption={powerPackage} label="Power Uganda" variant="secondary" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-2 text-sm text-[#fff8f5]/66 sm:grid-cols-3">
            {[
              `Rank ${elleRank} now: ${elleVotes.toLocaleString("en-US")} votes`,
              `${nextMilestoneGap.toLocaleString("en-US")} votes to ${nextMilestoneVotes.toLocaleString("en-US")}`,
              `MTN: ${campaign.mobileMoney.number}`,
            ].map((item) => (
              <p key={item} className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#ffd100]" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="eyebrow text-[0.6rem] text-[#fff8f5]/45">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-[#fff8f5]/16">
            <span className="guide-pulse absolute inset-x-0 top-0 h-1/2 bg-[#ffd100]" />
          </span>
        </div>
      </section>

      <Marquee />

      <section className="bg-[#fff8f5] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flow-reveal">
            <p className="eyebrow text-[#d90000]">Uganda, let&apos;s move</p>
            <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
              {nextMilestoneGap.toLocaleString("en-US")} votes gets Elle to {nextMilestoneVotes.toLocaleString("en-US")}. Let&apos;s make it happen.
            </h2>
          </div>
          <span className="uganda-thread flow-reveal mx-auto mt-10 block h-1.5 w-32" data-delay="1" />
          <p className="flow-reveal mt-10 font-serif text-xl font-light leading-relaxed text-[#561020]/78 sm:text-2xl" data-delay="2">
            Start with the free vote. If you can buy votes, use 1VOTE or send MTN Mobile Money to Tracy&apos;s line and Team Elle will push the bundle through.
          </p>
        </div>
      </section>

      <section id="how-to-vote" className="bg-[#f7d6d0] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flow-reveal text-center">
            <p className="eyebrow text-[#d90000]">How we push Elle</p>
            <h2 className="mt-6 font-display text-4xl font-normal text-[#561020] sm:text-5xl">
              Vote. Pay local if needed. Share.
            </h2>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden border border-[#561020]/10 bg-[#561020]/10 sm:grid-cols-2 lg:grid-cols-4">
            {votingSteps.map(({ number, title, note, icon: Icon }, index) => (
              <li
                key={number}
                className="flow-reveal group bg-[#f7d6d0] p-8 transition-colors duration-500 hover:bg-[#fff8f5] sm:p-10"
                data-delay={String(index)}
              >
                <div className="flex items-center justify-between gap-5">
                  <p className="eyebrow text-[#d90000]">{number}</p>
                  <Icon className="h-6 w-6 text-[#050505]" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-normal leading-snug text-[#561020]">
                  {title}
                </h3>
                <p className="mt-4 font-serif text-lg font-light leading-relaxed text-[#561020]/62">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-[#050505] px-6 py-20 text-[#fff8f5] sm:py-28">
        <div className="uganda-thread absolute inset-x-0 top-0 h-1.5" />
        <div className="mx-auto max-w-6xl">
          <div className="flow-reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-[#ffd100]">Vote options</p>
              <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
                Choose your push.
              </h2>
            </div>
            <p className="max-w-md font-serif text-lg font-light leading-relaxed text-[#f7d6d0]/72">
              Tap a bundle to vote on 1VOTE. If cards or PayPal are a problem, send the UGX amount by MTN below.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#fff8f5]/12 bg-[#fff8f5]/12 md:grid-cols-4">
            {featuredPackages.map((item, index) => (
              <article
                key={item.votes}
                className="flow-reveal bg-[#111] p-7 text-center transition-colors duration-500 hover:bg-[#1a0f0f]"
                data-delay={String(index)}
              >
                <p className="eyebrow text-[#ffd100]">
                  {item.votes.toLocaleString()} vote{item.votes === 1 ? "" : "s"}
                </p>
                <p className="mt-5 font-display text-3xl font-normal text-[#fff8f5]">
                  {formatVotingPrice(item.priceUSD)}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#fff8f5]/56">
                  <span className={item.priceUSD === 0 ? "text-[#ffd100]" : "text-[#d90000]"}>
                    {item.name}
                  </span>
                </p>
              </article>
            ))}
          </div>

          <MobileMoneyPanel />

          <details className="flow-reveal mt-8 text-center" data-delay="1">
            <summary className="eyebrow pressable inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#ffd100]/35 px-6 py-4 text-[#ffd100]">
              More vote bundles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </summary>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {otherPackages.map((item) => (
                <VoteHandoffModal
                  key={item.votes}
                  packageOption={item}
                  label={`${item.votes.toLocaleString()} votes - ${formatVotingPrice(item.priceUSD)}`}
                  variant="compact"
                />
              ))}
            </div>
          </details>
        </div>
      </section>

      <LeaderboardSnapshot votePackage={primaryPackage} />

      <section className="bg-[#fff8f5] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flow-reveal text-center">
            <p className="eyebrow text-[#d90000]">The gallery</p>
            <h2 className="mt-6 font-display text-4xl font-normal text-[#561020] sm:text-5xl">
              Elle, in full color.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className="flow-reveal photo-frame group aspect-[4/5] overflow-hidden border border-[#b76e79]/20 bg-[#f7d6d0]"
                data-delay={String(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1170}
                  height={1406}
                  className="photo-crop-safe h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.11]"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#7a1f3d] px-6 py-20 text-[#fff8f5] sm:py-28">
        <div className="uganda-thread absolute inset-x-0 top-0 h-1.5" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="flow-reveal">
            <p className="eyebrow text-[#ffd100]">For the flag</p>
            <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
              This is bigger than one stage.
            </h2>
            <span className="uganda-thread mt-8 block h-1.5 w-28" />
            <p className="mt-8 font-serif text-xl font-light leading-relaxed text-[#f7d6d0]/82">
              Elle has the crown, the story, and the flag. What she needs now is votes from home.
            </p>
            <Link
              href="#join"
              className="eyebrow pressable mt-10 inline-flex items-center gap-3 rounded-full border border-[#ffd100]/38 px-8 py-4 text-[#ffd100]"
            >
              Join Team Elle <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="flow-reveal photo-frame relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden" data-delay="1">
            <Image
              src="/images/elle/elle-full-seated.jpeg"
              alt="Trivia Elle Muhoza seated in a Ugandan-inspired pageant gown"
              width={948}
              height={1280}
              className="h-full w-full object-cover object-[50%_38%]"
            />
            <div className="absolute inset-4 border border-[#b76e79]/25" />
            <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-8 text-center">
              <p className="eyebrow text-[#ffd100]">Miss Uganda</p>
              <p className="script mt-4 text-4xl text-[#f7d6d0] sm:text-5xl">
                Trivia Elle Muhoza
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="bg-[#fff8f5] px-6 py-20 text-[#561020] sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="flow-reveal lg:sticky lg:top-8 lg:self-start">
            <p className="eyebrow inline-flex items-center gap-2 text-[#d90000]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              After you vote
            </p>
            <h2 className="mt-6 font-display text-5xl font-normal leading-tight sm:text-6xl">
              Bring your people in.
            </h2>
            <p className="mt-6 font-serif text-xl font-light leading-relaxed text-[#561020]/72">
              Leave your details, get your share link, and help us keep the pressure on until voting closes.
            </p>
            <div className="mt-8 grid gap-3">
              {["Use your free vote first", "MTN is there for paid votes", "Share the link on WhatsApp"].map((item) => (
                <p key={item} className="flex items-center gap-3 font-medium">
                  <Check className="h-5 w-5 text-[#d90000]" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flow-reveal" data-delay="1">
            <SupporterForm />
          </div>
        </div>
      </section>

      <section className="bg-[#f7d6d0] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flow-reveal text-center">
            <Crown className="mx-auto h-5 w-5 text-[#d90000]" aria-hidden="true" />
            <h2 className="mt-3 font-display text-4xl font-normal text-[#561020]">
              Today&apos;s push
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#561020]/10 bg-[#561020]/10 md:grid-cols-4">
            {rallyStats.map(({ icon: Icon, label, value, note }, index) => (
              <article key={label} className="flow-reveal bg-[#f7d6d0] p-8 text-center" data-delay={String(index)}>
                <Icon className="mx-auto h-7 w-7 text-[#b76e79]" aria-hidden="true" />
                <p className="mt-5 font-display text-3xl font-normal text-[#561020]">{value}</p>
                <p className="eyebrow mt-3 text-[#561020]/68">{label}</p>
                <p className="mt-2 font-serif text-base font-light text-[#561020]/52">{note}</p>
              </article>
            ))}
          </div>

          <p className="script mt-12 text-center text-4xl text-[#d90000] sm:text-5xl">
            One Woman. One Flag. One Uganda.
          </p>
          <div className="uganda-thread mx-auto mt-8 h-1.5 w-32" />
        </div>
      </section>

      <section className="relative bg-[#050505] px-6 py-20 text-[#fff8f5] sm:py-24">
        <div className="uganda-thread absolute inset-x-0 top-0 h-1.5" />
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
          {platformCards.map(({ icon: Icon, title, body }, index) => (
            <article
              key={title}
              className="flow-reveal border border-[#fff8f5]/12 p-7 transition-colors duration-500 hover:bg-[#64152a]"
              data-delay={String(index)}
            >
              <Icon className="h-6 w-6 text-[#ffd100]" aria-hidden="true" />
              <h3 className="mt-6 font-display text-3xl font-normal">{title}</h3>
              <p className="mt-4 font-serif text-lg font-light leading-relaxed text-[#f7d6d0]/68">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#fff8f5] px-6 py-12 text-center text-[#561020]">
        <p className="script text-4xl text-[#d90000]">One Woman. One Flag. One Uganda.</p>
        <span className="uganda-thread mx-auto mt-10 block h-1.5 w-32" />
        <p className="eyebrow mt-10 text-[#561020]/52">Team Elle Uganda</p>
        <div className="mt-5 flex justify-center gap-5 text-sm">
          <Link href="/privacy" className="inline-flex items-center gap-1 text-[#561020]/68 hover:text-[#b76e79]">
            Privacy <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
          <Link href="/terms" className="inline-flex items-center gap-1 text-[#561020]/68 hover:text-[#b76e79]">
            Terms <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ffd100]/24 bg-[#050505]/92 p-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <VoteHandoffModal packageOption={primaryPackage} label="Vote Elle free" variant="primary" />
          <Link
            href="#join"
            className="eyebrow pressable grid min-h-12 place-items-center rounded-full border border-[#fff8f5]/18 px-4 text-[#fff8f5]"
          >
            Join
          </Link>
        </div>
      </div>
    </main>
  );
}
