import { VoiceInput } from "../../components/VoiceInput";
import { Toaster } from "sonner";

const Home = () => {
  const processVoiceCommand = (command: string) => {
    console.log("Processed:", command);
  };

  return (
    <section
      className="
        relative min-h-screen w-full overflow-hidden
        bg-[radial-gradient(1200px_600px_at_10%_-10%,#1c2140_0%,transparent_70%),radial-gradient(1000px_500px_at_110%_10%,#0e6fff22_0%,transparent_70%),linear-gradient(180deg,#0a0f1d_0%,#0a1324_100%)]
        text-slate-100
      "
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg,#7e5bef,#4f46e5,#60a5fa,#22d3ee,#7e5bef)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-36 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%,#34d399,transparent 55%), radial-gradient(circle at 70% 60%,#22d3ee,transparent 55%), radial-gradient(circle at 40% 80%,#7e5bef,transparent 55%)",
        }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-5 pt-16 md:pt-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
          AI Voice Inventory
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          রহিমের দোকান — বলুন, শুনবে, সাথে সাথেই হিসাব হবে।
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Hands-free <b>voice-first</b> inventory & transaction tracking. Speak
          in Bangla or English—our AI records sales, updates stock, and computes
          dues instantly.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#mic"
            className="rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-300 px-5 py-3 font-extrabold text-slate-900 shadow-[0_12px_40px_rgba(124,58,237,.35)] transition hover:-translate-y-0.5"
          >
            Try Voice Command
          </a>
          <a
            href="#transactions"
            className="rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-200 hover:bg-white/5"
          >
            See Today’s Sales
          </a>
        </div>

        {/* Voice + Features grid */}
        <div
          id="mic"
          className="mt-8 grid items-stretch gap-6 md:grid-cols-[1.4fr_.9fr]"
        >
          {/* Voice Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(600px_180px_at_20%_0%,rgba(124,58,237,.25),transparent_60%)] before:content-['']">
            {/* Instructions */}
            <div className="mb-3 flex items-start gap-3 rounded-xl border border-white/15 bg-slate-800/50 p-4">
              <svg
                className="h-8 w-8 shrink-0 text-sky-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3v10a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 11a7 7 0 0 0 14 0"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                />
                <path d="M12 18v3" stroke="#a78bfa" strokeWidth="1.5" />
              </svg>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-200">
                <b className="block">ভয়েস কমান্ড ব্যবহারের নিয়ম</b>
                বাটনে ট্যাপ করে স্পষ্টভাবে বলুন। উদাহরণ: “
                <em>রহিম ১০০ টাকা বাকী</em>”, “
                <em>আটা ১ কেজি বিক্রি ৫৫ টাকা</em>”, “<em>ডাল ৫ কেজি স্টক</em>”,
                “<em>করিম ২০০ টাকা দিলো</em>”.
                <span className="ml-1 text-slate-400">
                  Tip: নাম, পণ্য, পরিমাণ/দাম একসাথে বললে ফিল্ডগুলো নিজে ভরে
                  যাবে।
                </span>
              </p>
            </div>

            {/* Mic / VoiceInput */}
            <div className="grid place-items-center py-4">
              {/* Your existing component stays as-is */}
              <div className="w-full max-w-2xl">
                <VoiceInput onCommandProcessed={processVoiceCommand} />
              </div>

              {/* Example chips */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {[
                  "রহিম ১০০ টাকা বাকী",
                  "আটা ১ কেজি বিক্রি ৫৫ টাকা",
                  "ডাল ৫ কেজি স্টক",
                  "করিম ২০০ টাকা দিলো",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Panel */}
          <aside className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <ul className="grid gap-4">
              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#1f2a44]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="text-sky-300"
                  >
                    <path
                      d="M4 7h16M4 12h16M4 17h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Live Stock Sync</h4>
                  <p className="text-sm text-slate-300">
                    Voice updates reflect instantly in your inventory & ledger.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#1f2a44]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="text-emerald-400"
                  >
                    <path
                      d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Zm8-5v5l3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Lightning Fast</h4>
                  <p className="text-sm text-slate-300">
                    Low-latency recognition on any device.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#1f2a44]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="text-pink-300"
                  >
                    <path
                      d="M5 20h14V6l-6-4H5v18Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M9 14h6M9 10h6"
                      stroke="#f9a8d4"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Bangla + English</h4>
                  <p className="text-sm text-slate-300">
                    Natural commands—no rigid templates.
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>

        {/* Recent Transactions */}
        <section id="transactions" className="pt-12">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-xl font-bold">আজকের বিক্রি</h2>
            <span className="rounded-full border border-white/10 bg-[#111827] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-300">
              Recent Transactions
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-white/10 text-slate-300">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">কাস্টমার</th>
                    <th className="px-4 py-3 font-semibold">পণ্যের বিবরণ</th>
                    <th className="px-4 py-3 font-semibold">মোট খরচ</th>
                    <th className="px-4 py-3 font-semibold">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    {
                      id: 1,
                      name: "রহিম",
                      items: "চাল, তেল, ডাল",
                      cost: "৳৫০০",
                      status: "cash",
                    },
                    {
                      id: 2,
                      name: "হাফিজ",
                      items: "ডাল, মুসুর",
                      cost: "৳৩০০",
                      status: "due",
                    },
                    {
                      id: 3,
                      name: "রিমা",
                      items: "তেল, চাল",
                      cost: "৳৭০০",
                      status: "due",
                    },
                    {
                      id: 4,
                      name: "রবিউল",
                      items: "রসুন",
                      cost: "৳৪০০",
                      status: "cash",
                    },
                    {
                      id: 5,
                      name: "হাফিজ",
                      items: "পেঁয়াজ",
                      cost: "৳৩৫০",
                      status: "due",
                    },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-white/5">
                      <td className="px-4 py-3">{row.id}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">{row.items}</td>
                      <td className="px-4 py-3">{row.cost}</td>
                      <td className="px-4 py-3">
                        {row.status === "cash" ? (
                          <span className="inline-flex items-center gap-2 font-semibold text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />{" "}
                            নগদ
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 font-semibold text-amber-400">
                            <span className="h-2 w-2 rounded-full bg-amber-400" />{" "}
                            বাকি
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-slate-400">
          © {new Date().getFullYear()} Dokan Bondhu. Built with ❤️ for small
          businesses.
          <div className="mt-2 flex justify-center gap-5">
            <a className="text-slate-300 hover:text-slate-200" href="#">
              Privacy
            </a>
            <a className="text-slate-300 hover:text-slate-200" href="#">
              Terms
            </a>
            <a className="text-slate-300 hover:text-slate-200" href="#">
              Support
            </a>
          </div>
        </footer>
      </div>

      <Toaster />
    </section>
  );
};

export default Home;
