import { cookies } from "next/headers";
import { AdminLogin } from "@/components/admin/admin-login";
import { adminCookieName, adminSessionValue } from "@/lib/admin-auth";

const metrics = [
  "Total visitors",
  "Official vote CTA clicks",
  "Free vote CTA clicks",
  "Paid vote CTA clicks",
  "Supporter registrations",
  "Referral registrations",
  "Spin attempts",
  "Prizes issued",
];

export default async function AdminPage() {
  const sessionValue = adminSessionValue();
  const cookieStore = await cookies();
  const authenticated =
    sessionValue && cookieStore.get(adminCookieName)?.value === sessionValue;

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-[#fff9ef] sm:px-8">
      <div className="mx-auto max-w-7xl">
        {!authenticated ? (
          <AdminLogin />
        ) : (
          <>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#ffd100]">
              Vote Elle Uganda
            </p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none">
              Campaign admin shell
            </h1>
            <p className="mt-4 max-w-2xl text-white/64">
              Live tables and exports are wired to Supabase. This shell avoids
              fake campaign totals until the database is connected.
            </p>

            <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <article key={metric} className="border border-white/14 bg-white/[0.04] p-5">
                  <p className="text-sm text-white/58">{metric}</p>
                  <p className="mt-4 text-3xl font-black">--</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#ffd100]">
                    Awaiting data
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-8 grid gap-4 lg:grid-cols-3">
              {["Sources", "Supporters", "Referrals", "Prizes", "Claims", "Settings"].map((title) => (
                <article key={title} className="border border-white/14 p-5">
                  <h2 className="text-2xl font-black uppercase">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Connect Supabase views and server-side queries here. Do not
                    expose phone numbers, emails, IP hashes, or service role keys
                    to the browser.
                  </p>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
