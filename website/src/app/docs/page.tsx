import Link from "next/link";
import { Navbar } from "@/components/Navbar";

const navItems = [
  { label: "Getting Started", href: "#getting-started" },
  { label: "Running the Dashboard", href: "#running" },
  { label: "Iconify Provider", href: "#iconify" },
  { label: "Untitled UI Pro", href: "#untitled-ui" },
  { label: "Generated Component", href: "#generated-component" },
  { label: "Configuration File", href: "#config" },
  { label: "API Reference", href: "#api" },
];

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const colorMap: Record<string, string> = {
    bash: "text-brand-cyan",
    tsx: "text-violet-300",
    json: "text-amber-300",
  };
  return (
    <pre className={`bg-[#0a0b12] border border-white/8 p-5 rounded-xl text-sm font-mono leading-relaxed overflow-x-auto ${colorMap[lang] || "text-slate-300"} shadow-inner`}>
      <code>{code}</code>
    </pre>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pb-16 border-b border-white/5 last:border-0">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-5 text-slate-400 leading-relaxed">{children}</div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-4 text-sm text-brand-cyan">
      <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      <span>{children}</span>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-400">
      <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
      <span>{children}</span>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#08090f] pt-16 flex">

        {/* ── Sticky Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-64px)] border-r border-white/5 overflow-y-auto py-10 px-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">On this page</p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-400 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="https://github.com/nibin-org/icon-vista/issues"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              Report an issue
            </a>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 max-w-3xl px-8 md:px-12 py-14 mx-auto lg:mx-0">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple uppercase tracking-widest mb-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              Documentation
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">icon-vista</h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              A zero-config local CLI tool that opens a beautiful search dashboard for 200,000+ open-source icons — with one-click strictly-typed React component generation.
            </p>
          </div>

          <div className="space-y-16">
            <Section id="getting-started" title="Getting Started">
              <p>
                <strong className="text-white">icon-vista</strong> requires Node.js 18+ and an existing React or Next.js project. You do not need to install it globally — `npx` handles everything.
              </p>
              <p>Start by running the one-time initialization command inside your project root:</p>
              <CodeBlock code="npx icon-vista init" lang="bash" />
              <p>The CLI will ask you two questions interactively:</p>
              <div className="glass-panel rounded-xl p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-brand-purple font-mono text-sm shrink-0 mt-0.5">?</span>
                  <div>
                    <p className="text-white text-sm font-semibold">Where would you like to save your icons?</p>
                    <p className="text-xs text-slate-500 mt-1">Default: <code className="text-slate-300">./src/components/icons</code></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-purple font-mono text-sm shrink-0 mt-0.5">?</span>
                  <div>
                    <p className="text-white text-sm font-semibold">Which icon provider do you want to use?</p>
                    <p className="text-xs text-slate-500 mt-1">Options: <code className="text-slate-300">iconify</code> (default) or <code className="text-slate-300">untitled-ui</code></p>
                  </div>
                </div>
              </div>
              <p>This creates an <code className="text-slate-200 bg-white/5 px-1.5 py-0.5 rounded text-sm">icon-vista.json</code> file in your project root. You only need to run init once per project.</p>
            </Section>

            <Section id="running" title="Running the Dashboard">
              <p>After initialization, launch the visual search dashboard with:</p>
              <CodeBlock code="npx icon-vista" lang="bash" />
              <p>This starts a local Express server (defaulting to port 3000, auto-incrementing if busy) and automatically opens the UI in your default browser. The terminal will confirm:</p>
              <CodeBlock code={`🚀 icon-vista is running at http://localhost:3000\nSaving icons to: ./src/components/icons`} lang="bash" />
              <Note>The dashboard is fully local. Nothing you do is sent to any external server (unless you are using the Iconify provider, which fetches SVGs from the public Iconify CDN on demand).</Note>

              <h3 className="text-white font-bold text-lg mt-8 mb-3">Dashboard Features</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><span className="text-brand-cyan shrink-0">→</span><span><strong className="text-white">Search:</strong> Debounced real-time search across all icons in the active provider.</span></li>
                <li className="flex gap-3"><span className="text-brand-cyan shrink-0">→</span><span><strong className="text-white">Sidebar Filters:</strong> Filter by icon pack (e.g. `lucide`, `heroicons`) and style (e.g. `line`, `solid`).</span></li>
                <li className="flex gap-3"><span className="text-brand-cyan shrink-0">→</span><span><strong className="text-white">Infinite Scroll:</strong> Icons load in batches using IntersectionObserver — no pagination.</span></li>
                <li className="flex gap-3"><span className="text-brand-cyan shrink-0">→</span><span><strong className="text-white">Customization Panel:</strong> Click any icon to configure color, size, language (TS/JS), and export style (Arrow / Standard function).</span></li>
                <li className="flex gap-3"><span className="text-brand-cyan shrink-0">→</span><span><strong className="text-white">One-click Save:</strong> Downloads the generated `.tsx` or `.jsx` component directly into your configured `savePath`.</span></li>
              </ul>
            </Section>

            <Section id="iconify" title="Provider: Iconify (Open Source)">
              <p>
                The <strong className="text-white">Iconify provider</strong> is the default. It connects to the public Iconify API to search and stream SVGs on demand. No local file installation or extra dependencies are required.
              </p>
              <p>It provides access to a curated whitelist of the most popular and highest-quality icon packs:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Material Design Icons (mdi)", "Phosphor Icons (ph)", "Lucide (lucide)", "Heroicons (heroicons)", "Bootstrap Icons (bi)", "Tabler Icons (tabler)", "Radix UI Icons", "Feather Icons", "Remix Icons (ri)", "Carbon Icons", "Ionicons (ion)"].map(p => (
                  <div key={p} className="bg-white/3 border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300">{p}</div>
                ))}
              </div>
              <Note>Style filtering (line / solid / duotone) is supported for Iconify by appending the style as a keyword to the Iconify search query.</Note>
            </Section>

            <Section id="untitled-ui" title="Provider: Untitled UI Pro (Premium)">
              <p>
                icon-vista includes a unique <strong className="text-white">Reverse-Rendering Engine</strong> built for teams using <a href="https://untitledui.com" target="_blank" rel="noreferrer" className="text-brand-purple hover:underline">Untitled UI Pro</a>. Instead of reading SVG files from disk, it dynamically renders the React components from the npm package into raw SVG strings in memory, then serves them to the dashboard — completely offline.
              </p>

              <Warning>This provider requires that you have separately purchased a license for Untitled UI Pro and have access to their private npm registry.</Warning>

              <h3 className="text-white font-bold text-lg mt-8 mb-4">Setup</h3>
              <div className="space-y-5">
                <div className="glass-panel rounded-xl p-5">
                  <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Step 1 — Install the package</p>
                  <CodeBlock code="npm install @untitledui-pro/icons" lang="bash" />
                  <p className="text-xs text-slate-500 mt-3">You must be authenticated with the Untitled UI private npm registry first.</p>
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Step 2 — Initialize with untitled-ui</p>
                  <CodeBlock code={`npx icon-vista init\n# → Select: untitled-ui`} lang="bash" />
                </div>
                <div className="glass-panel rounded-xl p-5">
                  <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-3">Step 3 — Launch</p>
                  <CodeBlock code="npx icon-vista" lang="bash" />
                  <p className="text-sm mt-3 text-slate-400">The CLI will automatically discover all available style categories (`line`, `solid`, `duotone`, `duocolor`) and index your entire library. You will see a confirmation like:</p>
                  <CodeBlock code="✅ Successfully indexed 3,240 premium Untitled UI icons." lang="bash" />
                </div>
              </div>
            </Section>

            <Section id="generated-component" title="Generated Component">
              <p>
                When you save an icon, icon-vista generates a clean, production-ready React component. Here is an example of the TypeScript output for a Lucide arrow icon:
              </p>
              <CodeBlock code={`import * as React from "react";

export function ArrowRightIcon({
  width = 24,
  height = 24,
  color = "currentColor",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      width={width} height={height} {...props}>
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  );
}`} lang="tsx" />
              <p>The generator automatically:</p>
              <ul className="space-y-2 text-sm list-disc list-inside">
                <li>Converts all SVG attributes to camelCase JSX props (`stroke-width` → `strokeWidth`)</li>
                <li>Strips hardcoded `width` and `height` from the SVG source, replacing them with dynamic props</li>
                <li>Removes any existing `color` attributes to avoid conflicts with the React `color` prop</li>
                <li>Injects <code className="text-slate-200 bg-white/5 px-1 rounded text-xs">{"{"}"...props{"}"}</code> spread for full composability</li>
              </ul>
            </Section>

            <Section id="config" title="Configuration File">
              <p>The <code className="text-slate-200 bg-white/5 px-1.5 py-0.5 rounded text-sm">icon-vista.json</code> file created at your project root controls all behavior:</p>
              <CodeBlock code={`{\n  "savePath": "./src/components/icons",\n  "provider": "iconify"\n}`} lang="json" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-6 text-white font-semibold">Key</th>
                      <th className="text-left py-3 pr-6 text-white font-semibold">Type</th>
                      <th className="text-left py-3 text-white font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 pr-6 font-mono text-brand-cyan">savePath</td>
                      <td className="py-3 pr-6 text-slate-500">string</td>
                      <td className="py-3 text-slate-400">Relative path from your project root where generated components are saved.</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-mono text-brand-cyan">provider</td>
                      <td className="py-3 pr-6 text-slate-500">`iconify` | `untitled-ui`</td>
                      <td className="py-3 text-slate-400">The icon backend to use. Determines which search engine and SVG source is used.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="api" title="API Reference">
              <p>icon-vista runs a local Express server. These are the internal API endpoints it exposes to the dashboard UI:</p>
              <div className="space-y-4">
                {[
                  { method: "GET", path: "/api/search", desc: "Search icons. Accepts `query`, `limit`, `start`, `packs`, `styles` query params. Returns `{ icons: string[] }`." },
                  { method: "GET", path: "/api/svg", desc: "Fetch a raw SVG string for a given icon ID. Accepts `id` and optional `color` query params." },
                  { method: "GET", path: "/api/filters", desc: "Returns available `packs` and `styles` for the active provider." },
                  { method: "GET", path: "/api/config", desc: "Returns the active provider name: `{ provider: string }`." },
                  { method: "POST", path: "/api/download", desc: "Generates and writes a React component file to disk. Body: `{ icon_id, customizations }`." },
                  { method: "POST", path: "/api/generate-snippet", desc: "Generates and returns a React component as a string without saving. Body: `{ icon_id, customizations }`." },
                ].map((ep) => (
                  <div key={ep.path} className="glass-panel rounded-xl p-5 flex flex-col sm:flex-row gap-3 sm:items-start">
                    <span className={`shrink-0 font-mono text-xs font-black px-2.5 py-1 rounded-md ${ep.method === "GET" ? "bg-brand-cyan/15 text-brand-cyan" : "bg-brand-purple/15 text-brand-purple"}`}>
                      {ep.method}
                    </span>
                    <div>
                      <code className="text-white text-sm font-mono">{ep.path}</code>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </main>
      </div>
    </>
  );
}
