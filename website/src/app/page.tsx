import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CopyButton } from "@/components/CopyButton";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    title: "200,000+ Icons",
    desc: "Instantly search across 50+ curated open-source packs — Lucide, Heroicons, Phosphor, Tabler, Material Design, and more.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
    title: "Strictly-Typed React",
    desc: "One click generates a fully typed `.tsx` component with `React.SVGProps<SVGSVGElement>` — ready to paste directly into your codebase.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    title: "Private Library Support",
    desc: "A unique Reverse-Rendering Engine securely parses your Untitled UI Pro icons directly in memory — no uploads, completely offline.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Zero Config",
    desc: "Run `npx icon-vista init` once to set your save path and provider. After that, a single command opens the full dashboard every time.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    title: "Customization Panel",
    desc: "Fine-tune stroke color, size, and preview against dark/light backgrounds before generating. Export as Arrow or Standard function.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "Infinite Scroll",
    desc: "The UI lazy-loads icons in batches using an IntersectionObserver — browse thousands of results without ever clicking 'next page'.",
  },
];

const steps = [
  { step: "01", cmd: "npx icon-vista init", label: "Run init once to configure your project", color: "from-brand-purple to-violet-500" },
  { step: "02", cmd: "npx icon-vista", label: "Launch the visual dashboard in your browser", color: "from-brand-cyan to-blue-500" },
  { step: "03", cmd: "// click any icon → copy component", label: "Paste a strictly-typed React component into your code", color: "from-pink-500 to-rose-500" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden pt-16">

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-purple/15 blur-[120px] rounded-full" />
          <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] bg-brand-cyan/10 blur-[100px] rounded-full animate-float" />
          <div className="absolute bottom-[5%] right-[0%] w-[500px] h-[500px] bg-pink-500/8 blur-[120px] rounded-full animate-float" style={{ animationDelay: "3s" }} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        {/* ── HERO ── */}
        <section className="relative z-10 text-center px-6 pt-24 pb-32 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-cyan text-xs font-bold tracking-widest uppercase mb-10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            v1.1.2 — Now with Infinite Scroll & Sidebar Filters
          </div>

          <h1 className="text-5xl md:text-[80px] font-black tracking-tight mb-8 leading-[1.05]">
            <span className="text-gradient">Beautiful icons,</span>
            <br />
            <span className="text-white">instantly typed.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
            A local CLI dashboard to search 200,000+ open-source icons and instantly generate strictly-typed React components — all in one command.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {/* Terminal Command */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <code className="relative flex items-center justify-between gap-6 bg-[#0d0f1a] border border-white/10 px-6 py-4 rounded-xl text-slate-200 font-mono text-sm shadow-2xl">
                <span className="flex items-center gap-2.5">
                  <span className="text-brand-purple select-none">$</span>
                  npx icon-vista
                </span>
                <CopyButton text="npx icon-vista" />
              </code>
            </div>

            <Link href="/docs" className="flex items-center gap-2 h-[54px] px-8 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-white font-semibold transition-all backdrop-blur-md text-sm">
              Read the Docs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>

            <a href="https://github.com/nibin-org/icon-vista" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 h-[54px] px-8 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 text-white font-semibold transition-all backdrop-blur-md text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              GitHub
            </a>
          </div>

          <p className="text-xs text-slate-600">No global install required. No signup. Runs entirely on localhost.</p>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="relative z-10 px-6 pb-32 max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-black text-white mb-16 tracking-tight">Up and running in 3 steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
                <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${s.color} bg-clip-text text-transparent uppercase`}>Step {s.step}</span>
                <code className="text-sm font-mono text-slate-200 bg-black/40 border border-white/5 px-4 py-3 rounded-lg">{s.cmd}</code>
                <p className="text-sm text-slate-400 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Everything you need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Built for professional React developers who care about type safety, design quality, and developer experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:border-white/10 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.bg} ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-white text-lg">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "200K+", label: "Icons available" },
              { num: "50+", label: "Icon packs" },
              { num: "100%", label: "TypeSafe output" },
            ].map((s) => (
              <div key={s.label} className="glass-panel rounded-2xl p-8 text-center">
                <div className="text-4xl font-black text-gradient mb-2">{s.num}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative z-10 px-6 pb-40 max-w-3xl mx-auto text-center">
          <div className="glass-panel rounded-3xl p-12 border border-brand-purple/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-cyan/10 pointer-events-none" />
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight relative z-10">
              Try it in 10 seconds.
            </h2>
            <p className="text-slate-400 mb-8 relative z-10">No account. No install. Just run this in any React project directory.</p>
            <div className="relative z-10 group inline-block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500" />
              <code className="relative flex items-center justify-between gap-8 bg-[#0d0f1a] border border-white/10 px-8 py-5 rounded-xl text-slate-200 font-mono text-base shadow-2xl">
                <span className="flex items-center gap-3">
                  <span className="text-brand-purple select-none">$</span>
                  npx icon-vista
                </span>
                <CopyButton text="npx icon-vista" />
              </code>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center text-slate-600 text-sm">
          <p>Built by <a href="https://github.com/nibin-org" className="text-slate-400 hover:text-white transition-colors">Nibin Kurian</a> · MIT License</p>
        </footer>

      </main>
    </>
  );
}
