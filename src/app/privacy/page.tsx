export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fff9ef] px-5 py-12 text-[#101010] sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d90000]">
          Vote Elle Uganda
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none">Privacy notice</h1>
        <p className="mt-6 leading-8 text-black/70">
          This campaign collects only the supporter details needed for Team Elle
          registration, referral attribution, consent records, fraud prevention,
          and campaign updates when you opt in.
        </p>
        <p className="mt-4 leading-8 text-black/70">
          Phone numbers and email addresses are private. They must not be shown
          in public dashboards or sent to the browser through admin interfaces.
          Official Miss World voting and payment activity happens on 1VOTE /
          Eventista, not on this website.
        </p>
      </article>
    </main>
  );
}
