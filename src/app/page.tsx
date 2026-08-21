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
  MapPin,
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

const votingSteps: Array<{ number: string; title: string; note: string; icon: LucideIcon }> = [
  {
    number: "01",
    title: "Vote Elle",
    note: "Open the official Miss World voting page.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Choose Uganda",
    note: "Confirm Trivia Elle Muhoza before you continue.",
    icon: Flag,
  },
  {
    number: "03",
    title: "Pick your vote",
    note: "Use the free vote or any official paid package.",
    icon: ShoppingCart,
  },
  {
    number: "04",
    title: "Bring someone",
    note: "Come back, join Team Elle, and share your link.",
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

const readinessStats: Array<{ icon: LucideIcon; label: string; value: string; note: string }> = [
  { icon: Users, label: "Team Elle supporters", value: "Live after launch", note: "Supabase source" },
  { icon: Globe2, label: "Countries represented", value: "From signups", note: "No estimate shown" },
  { icon: MapPin, label: "Districts represented", value: "From signups", note: "No estimate shown" },
  { icon: HeartHandshake, label: "Supporters today", value: "Live daily", note: "Valid registrations" },
];

const platformCards: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Globe2,
    title: "For Ugandans anywhere",
    body: "One link for WhatsApp groups, Instagram bios, campus circles, diaspora chats, and QR posters.",
  },
  {
    icon: Trophy,
    title: "The gap is visible",
    body: "The leaderboard snapshot shows who Uganda needs to catch, without pretending this site verifies official votes.",
  },
  {
    icon: ShieldCheck,
    title: "The vote stays official",
    body: "Every voting button hands supporters to 1VOTE/Eventista. Team Elle only tracks return signups and referrals.",
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
      <section className="campaign-hero relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden px-6 py-24 text-[#fff8f5]">
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

        <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="pressable flex items-center gap-3" aria-label="Vote Elle Uganda home">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#ffd100]/45 bg-[#050505]/70 font-display text-lg italic text-[#ffd100]">
              E
            </span>
            <span>
              <span className="eyebrow block text-[#ffd100]">Vote Elle</span>
              <span className="font-serif text-sm font-light tracking-[0.2em] text-[#fff8f5]/68">
                Uganda
              </span>
            </span>
          </Link>

          <Link href="#vote" className="eyebrow pressable rounded-full border border-[#ffd100]/45 px-5 py-3 text-[#ffd100]">
            Vote
          </Link>
        </nav>

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
          <p className="eyebrow text-[#ffd100]">Uganda is invited</p>
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
            Miss Uganda is on the Miss World stage. Cast your official vote, then bring another Ugandan with you.
          </p>

          <div id="vote" className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-2">
            <div className="relative">
              <Heart className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 fill-[#050505] text-[#050505]" />
              <div className="[&_button]:pl-14 [&_button]:text-left">
                <VoteHandoffModal packageOption={primaryPackage} label="Vote Elle free" variant="primary" />
              </div>
            </div>
            <div className="relative">
              <Crown className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#f7d6d0]" />
              <div className="[&_button]:pl-14 [&_button]:text-left">
                <VoteHandoffModal packageOption={powerPackage} label="Power Uganda" variant="secondary" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-2 text-sm text-[#fff8f5]/66 sm:grid-cols-3">
            {[
              "Official voting via 1VOTE / Eventista",
              "Prices show USD and UGX",
              "No made-up supporter totals",
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
            <p className="eyebrow text-[#d90000]">The voting invitation</p>
            <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
              One vote is small. A country voting together is not.
            </h2>
          </div>
          <span className="uganda-thread flow-reveal mx-auto mt-10 block h-1.5 w-32" data-delay="1" />
          <p className="flow-reveal mt-10 font-serif text-xl font-light leading-relaxed text-[#561020]/78 sm:text-2xl" data-delay="2">
            This page has one job: get supporters to the official Miss World vote, then help Team Elle follow up with the people who want to keep pushing.
          </p>
        </div>
      </section>

      <section id="how-to-vote" className="bg-[#f7d6d0] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flow-reveal text-center">
            <p className="eyebrow text-[#d90000]">How to vote</p>
            <h2 className="mt-6 font-display text-4xl font-normal text-[#561020] sm:text-5xl">
              Four taps. Then pass it on.
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
              <p className="eyebrow text-[#ffd100]">Official vote options</p>
              <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
                Choose the push that feels right.
              </h2>
            </div>
            <p className="max-w-md font-serif text-lg font-light leading-relaxed text-[#f7d6d0]/72">
              Every option opens the same official voting page unless package-specific links become available.
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
            <p className="eyebrow text-[#ffd100]">More than a crown</p>
            <h2 className="mt-6 font-display text-4xl font-normal leading-tight text-balance sm:text-6xl">
              A flag. A voice. A reason to rally.
            </h2>
            <span className="uganda-thread mt-8 block h-1.5 w-28" />
            <p className="mt-8 font-serif text-xl font-light leading-relaxed text-[#f7d6d0]/82">
              Elle carries Uganda with grace, but she cannot carry the vote alone. This is where the country comes in.
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
              Come back into the circle.
            </h2>
            <p className="mt-6 font-serif text-xl font-light leading-relaxed text-[#561020]/72">
              Register as a supporter, get your referral link, and invite three people who will actually vote.
            </p>
            <div className="mt-8 grid gap-3">
              {["No voter account required", "Marketing consent is optional", "This form never verifies external votes"].map((item) => (
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
              Team Uganda is growing
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#561020]/10 bg-[#561020]/10 md:grid-cols-4">
            {readinessStats.map(({ icon: Icon, label, value, note }, index) => (
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
