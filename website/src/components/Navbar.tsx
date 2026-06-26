import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#08090f]/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-black text-white text-lg tracking-tight">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span>icon-vista</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
          <Link href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Docs</Link>
          <Link href="/changelog" className="text-sm text-slate-400 hover:text-white transition-colors">Changelog</Link>
          <a href="https://github.com/nibin-org/icon-vista" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">GitHub</a>
        </div>

        {/* CTA */}
        <a
          href="https://www.npmjs.com/package/icon-vista"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0v24h6.5V6h5v18H24V0z"/></svg>
          npm
        </a>
      </div>
    </nav>
  );
}
