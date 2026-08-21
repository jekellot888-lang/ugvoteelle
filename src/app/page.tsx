import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleCheck,
  Crown,
  ExternalLink,
  Flag,
  Globe2,
  Heart,
  HeartHandshake,
  MapPin,
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
import { SupporterForm } from "@/components/supporter-form";
import { VoteHandoffModal } from "@/components/vote-handoff-modal";

const featuredPackages = campaign.votingPackages.filter((item) => item.featured);
const otherPackages = campaign.votingPackages.filter((item) => !item.featured);
const primaryPackage = campaign.votingPackages[0];
const powerPackage = campaign.votingPackages[3];

const votingSteps: Array<{ number: string; title: string; icon: LucideIcon }> = [
  { number: "01", title: "Tap Vote Elle", icon: Smartphone },
  { number: "02", title: "Confirm Uganda + Trivia Elle Muhoza", icon: Flag },
  { number: "03", title: "Choose your voting option", icon: ShoppingCart },
  { number: "04", title: "Complete your vote on 1VOTE", icon: CircleCheck },
];

const readinessStats: Array<{ icon: LucideIcon; label: string; value: string; note: string }> = [
  { icon: Users, label: "Team Elle supporters", value: "Live after launch", note: "Supabase source" },
  { icon: Globe2, label: "Countries represented", value: "From signups", note: "No estimate shown" },
  { icon: MapPin, label: "Districts represented", value: "From signups", note: "No estimate shown" },
  { icon: HeartHandshake, label: "Supporters today", value: "Live daily", note: "Valid registrations" },
];

const platformCards: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Globe2,
    title: "Diaspora-ready",
    body: "Campaign links fit WhatsApp, Instagram, X, TikTok, QR codes, and partner pushes.",
  },
  {
    icon: Trophy,
    title: "Leaderboard pressure",
    body: "The page shows Elle's position against the current category leaders without inventing totals.",
  },
  {
    icon: Flag,
    title: "Ugandan first",
    body: "The palette, messaging, and voting flow keep the flag and Elle's official campaign in front.",
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

export default function Home() {
  return (
    <main className="editorial-shell min-h-screen bg-[#050303] pb-24 text-[#fff9ef] lg:pb-0">
      <section className="campaign-hero relative isolate min-h-screen overflow-hidden">
        <div className="flag-wave absolute inset-y-16 right-0 -z-10 hidden w-[62%] opacity-80 blur-[0.2px] lg:block" />
        <div className="soft-vignette absolute inset-0 -z-10" />
        <div className="fine-noise absolute inset-0 -z-10" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:py-7">
          <Link href="/" aria-label="Vote Elle Uganda home" className="pressable block">
            <span className="block text-center text-[0.66rem] font-bold uppercase tracking-[0.48em] text-[#f8d68a]">
              Vote
            </span>
            <span className="font-display gold-text block text-5xl font-bold uppercase leading-[0.74] tracking-[0.03em] sm:text-6xl">
              Elle
            </span>
            <span className="block border-t border-[#f8b44c] pt-1 text-center text-[0.66rem] font-bold uppercase tracking-[0.42em] text-white">
              Uganda
            </span>
          </Link>

          <div className="ug-flag relative h-9 w-16 overflow-hidden border border-white/18 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/92" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="pressable hidden rounded-md border border-white/14 px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/72 sm:block"
            >
              Admin
            </Link>
            <Link
              href="#join"
              aria-label="Open Team Elle section"
              className="pressable grid h-12 w-12 place-items-center rounded-md border border-white/14 text-white/82"
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-2 sm:px-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div className="reveal-in relative z-10 max-w-3xl pb-4 lg:pb-16">
            <div className="mb-8 flex flex-wrap items-center gap-2 border-y border-white/10 py-4 text-sm font-black uppercase tracking-[0.18em] sm:text-base">
              <span className="text-[#f8c66f]">Miss World 2026</span>
              <span className="text-white/54">-</span>
              <span>Uganda</span>
              <span className="ug-flag h-4 w-7 border border-white/20" aria-hidden="true" />
            </div>

            <p className="max-w-xs text-lg uppercase leading-7 tracking-[0.16em] text-white/86">
              One woman.
              <br />
              One flag.
              <br />
              Millions behind her.
            </p>
            <div className="mt-6 h-1 w-28 bg-[linear-gradient(90deg,#ffd100_0_45%,#d90000_45%_72%,#050505_72%)]" />

            <h1 className="font-display rose-text mt-6 max-w-[760px] text-[4.35rem] font-bold uppercase leading-[0.82] tracking-[0.01em] sm:text-[6.5rem] lg:text-[7.8rem]">
              Uganda,
              <span className="block">let&apos;s take</span>
              <span className="gold-text block text-[1.18em]">Elle</span>
              <span className="block">to the top.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-7 text-white/78 sm:text-xl">
              Trivia Elle Muhoza is representing Uganda at Miss World 2026. Every vote moves our flag closer to the crown.
            </p>

            <div className="mt-8 grid max-w-xl gap-3">
              <div className="relative">
                <Heart className="pointer-events-none absolute left-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 fill-[#d90000] text-[#d90000]" />
                <div className="[&_button]:pl-16 [&_button]:text-left">
                  <VoteHandoffModal packageOption={primaryPackage} label="Vote Elle free - 1 vote" variant="primary" />
                </div>
                <ChevronRight className="pointer-events-none absolute right-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-black" />
              </div>

              <div className="relative">
                <Heart className="pointer-events-none absolute left-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 fill-[#e24646] text-[#e24646]" />
                <div className="[&_button]:pl-16 [&_button]:text-left">
                  <VoteHandoffModal packageOption={powerPackage} label="Power Uganda - more votes" variant="secondary" />
                </div>
                <ChevronRight className="pointer-events-none absolute right-5 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-[#f5a0a8]" />
              </div>
            </div>

            <div className="mt-5 grid gap-2 text-sm text-white/72">
              {[
                "Official voting via 1VOTE / Eventista",
                "UGX shown at a fixed 3,850 rate",
                "Real supporter counts only after launch data connects",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#f5c66f]" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal-in stagger-1 relative mx-auto w-full max-w-[650px] self-stretch lg:mx-0 lg:ml-auto">
            <div className="absolute right-8 top-6 h-28 w-28 rounded-full border border-[#ffd100]/16" />
            <div className="absolute bottom-24 right-0 h-64 w-32 rounded-l-full border border-white/10" />
            <div className="absolute inset-x-8 top-10 h-24 bg-[#ffd100]/20 blur-3xl" />

            <div className="hero-photo-in photo-frame relative flex h-full min-h-[520px] items-end justify-center overflow-hidden rounded-t-[18rem] border border-white/12 bg-[#120707]">
              <div className="absolute bottom-0 left-6 hidden h-[62%] w-28 bg-[linear-gradient(180deg,rgba(255,209,0,0.34),rgba(255,209,0,0.02))] opacity-70 lg:block" />
              <div className="absolute bottom-0 right-4 h-[82%] w-[78%] rounded-t-full bg-[radial-gradient(circle_at_48%_18%,rgba(255,236,172,0.28),transparent_20%),linear-gradient(180deg,rgba(116,18,20,0.34),rgba(0,0,0,0.08))]" />
              <Image
                src="/images/elle/elle-national-full.jpeg"
                alt="Trivia Elle Muhoza in a red, black, and gold Ugandan national dress"
                width={970}
                height={1280}
                priority
                className="relative z-10 max-h-[74vh] w-[88%] max-w-[520px] object-contain drop-shadow-[0_34px_58px_rgba(0,0,0,0.55)]"
              />

              <div className="portrait-float photo-frame absolute bottom-10 right-0 z-20 hidden aspect-[2/3] w-36 overflow-hidden rounded-md border border-[#f8c66f]/40 bg-black shadow-[0_24px_54px_rgba(0,0,0,0.48)] sm:block lg:right-[-1.5rem] lg:w-44">
                <Image
                  src="/images/elle/elle-cover-smile.jpg"
                  alt="Close portrait of Trivia Elle Muhoza smiling"
                  width={1130}
                  height={1253}
                  className="photo-crop-safe h-full w-full object-cover object-[35%_45%]"
                />
              </div>

              <div className="absolute inset-x-8 bottom-0 z-20 bg-gradient-to-t from-[#050303] via-[#050303]/64 to-transparent px-5 pb-5 pt-24">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f8c66f]">
                  Trivia Elle Muhoza
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/66">
                  Miss Uganda carrying the Pearl of Africa to Miss World 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-to-vote" className="relative bg-[#050303] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-[#7c2730]/72 bg-black/58 px-5 py-7 shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:px-8 lg:-mt-8">
          <div className="flow-reveal text-center">
            <h2 className="font-display gold-text text-4xl font-bold uppercase leading-none sm:text-5xl">
              How to vote
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/74">
              Voting takes less than a minute.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {votingSteps.map(({ number, title, icon: Icon }, index) => (
              <article
                key={number}
                className="flow-reveal relative grid gap-3 border-white/12 text-center lg:border-r lg:px-5 last:lg:border-r-0"
                data-delay={String(index)}
              >
                <span className="guide-pulse mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#f5a0a8] text-sm font-black text-[#170607]">
                  {number}
                </span>
                <Icon className="mx-auto h-8 w-8 text-[#f6c66f]" aria-hidden="true" />
                <h3 className="mx-auto max-w-40 text-sm font-bold leading-5 text-white">{title}</h3>
                {index < votingSteps.length - 1 ? (
                  <ChevronRight className="absolute right-[-0.9rem] top-16 hidden h-5 w-5 text-[#f6c66f] lg:block" aria-hidden="true" />
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {featuredPackages.map((item) => (
              <article
                key={item.votes}
                className="card-lift flow-reveal min-h-28 rounded-md border border-[#7c2730] bg-white/[0.025] p-4 text-center first:border-[#f6c66f] first:bg-[#f6c66f]/12"
              >
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/88">
                  {item.votes.toLocaleString()} vote{item.votes === 1 ? "" : "s"}
                </p>
                <p className="font-display mt-1 text-3xl font-bold uppercase text-[#f5a0a8]">
                  {formatVotingPrice(item.priceUSD)}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-white">
                  {item.name}
                </p>
              </article>
            ))}
          </div>

          <details className="mt-5 text-center">
            <summary className="pressable inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[#f6c66f]">
              View all official voting options <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#2c0610_0%,#641422_54%,#0a0404_100%)] px-5 py-16 sm:px-8 lg:py-20">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[0.55fr_0.45fr]">
          <div className="flow-reveal relative min-h-[360px] overflow-hidden">
            <div className="absolute inset-x-8 bottom-0 h-[86%] rounded-t-full bg-[radial-gradient(circle_at_50%_18%,rgba(255,209,0,0.28),transparent_22%),linear-gradient(180deg,rgba(255,209,0,0.16),rgba(0,0,0,0.2))]" />
            <Image
              src="/images/elle/elle-full-seated.jpeg"
              alt="Trivia Elle Muhoza seated in a Ugandan-inspired pageant gown"
              width={948}
              height={1280}
              className="relative mx-auto h-[420px] w-auto object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.5)]"
            />
          </div>

          <div className="flow-reveal relative z-10 pb-4" data-delay="1">
            <p className="font-display text-5xl italic leading-[0.95] text-[#f8c66f] sm:text-6xl">
              More than a crown.
              <br />
              A purpose.
            </p>
            <p className="mt-6 max-w-md text-lg leading-7 text-white/78">
              Elle is a voice for change, a champion for young people, and a proud daughter of Uganda.
            </p>
            <Link
              href="#join"
              className="pressable mt-8 inline-flex min-h-12 items-center gap-3 rounded-md border border-[#f6c66f]/70 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#f8c66f]"
            >
              Join Team Elle <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050303] px-5 py-16 sm:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#f6c66f,transparent)]" />
        <div className="mx-auto max-w-7xl">
          <div className="flow-reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f5a0a8]">
                Campaign gallery
              </p>
              <h2 className="font-display gold-text mt-3 text-5xl font-bold uppercase leading-none sm:text-6xl">
                Elle in full color.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/62">
              Official visuals are framed as campaign photography, with screenshot interface marks kept outside the visible crop.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className="flow-reveal photo-frame card-lift aspect-[2/3] overflow-hidden rounded-md border border-white/12 bg-[#130909]"
                data-delay={String(index)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1170}
                  height={1406}
                  className="photo-crop-safe h-full w-full object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="bg-[#fff9ef] px-5 py-20 text-[#101010] sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flow-reveal lg:sticky lg:top-8 lg:self-start">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#d90000]">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Return flow
            </p>
            <h2 className="font-display mt-4 text-6xl font-bold uppercase leading-[0.86] sm:text-7xl">
              Thank you, Uganda.
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/68">
              After voting on the official page, join Team Elle and receive a personal referral link.
              Supporter registration is separate from paid voting and no purchase is necessary.
            </p>
            <div className="mt-8 grid gap-3">
              {["No voter account required", "Marketing consent is optional", "Phone and email stay private"].map((item) => (
                <p key={item} className="flex items-center gap-3 font-semibold">
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

      <section className="relative overflow-hidden bg-[#060606] px-5 py-16 sm:px-8">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,209,0,0.1),transparent_28%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flow-reveal text-center">
            <Crown className="mx-auto h-5 w-5 text-[#f6c66f]" aria-hidden="true" />
            <h2 className="mt-2 text-lg font-black uppercase tracking-[0.18em] text-[#f6c66f]">
              Team Uganda is growing
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {readinessStats.map(({ icon: Icon, label, value, note }, index) => (
              <article
                key={label}
                className="flow-reveal border-white/12 text-center md:border-r md:last:border-r-0"
                data-delay={String(index)}
              >
                <Icon className="mx-auto h-7 w-7 text-[#f5a0a8]" aria-hidden="true" />
                <p className="mt-4 text-2xl font-black text-white">{value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/82">{label}</p>
                <p className="mt-1 text-xs text-white/48">{note}</p>
              </article>
            ))}
          </div>

          <p className="font-display mt-10 text-center text-4xl italic text-[#f8c66f]">
            One Woman. One Flag. One Uganda.
          </p>
          <div className="ug-stripe mx-auto mt-6 h-2 w-32" />
        </div>
      </section>

      <section className="bg-[#090909] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {platformCards.map(({ icon: Icon, title, body }, index) => (
            <article
              key={title}
              className="card-lift flow-reveal rounded-md border border-white/12 bg-white/[0.035] p-5"
              data-delay={String(index)}
            >
              <Icon className="h-6 w-6 text-[#ffd100]" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-black uppercase">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#fff9ef] px-5 py-10 text-[#101010] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold">Team Elle - Vote. Rally. Share. Carry Uganda with her.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="inline-flex items-center gap-1 hover:text-[#d90000]">
              Privacy <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
            <Link href="/terms" className="inline-flex items-center gap-1 hover:text-[#d90000]">
              Terms <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-black/88 p-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <VoteHandoffModal packageOption={primaryPackage} label="Vote Elle free" variant="primary" />
          <Link
            href="#join"
            className="pressable grid min-h-12 place-items-center rounded-[1.25rem] border border-white/18 px-4 text-sm font-black uppercase text-white"
          >
            Join
          </Link>
        </div>
      </div>
    </main>
  );
}
