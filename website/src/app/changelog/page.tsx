import { Navbar } from "@/components/Navbar";

const releases = [
  {
    version: "1.2.0",
    date: "June 26, 2026",
    latest: true,
    added: [
      {
        title: "AST-based SVG Parsing",
        desc: "Replaced the fragile regex generator with @svgr/core, ensuring 100% syntactically correct React JSX output directly from SVG abstract syntax trees.",
      },
      {
        title: "CLI Arguments",
        desc: "Introduced --headless mode for CI/CD and --port <number> flag for custom port binding to avoid EADDRINUSE collisions.",
      },
      {
        title: "Persisted Preferences",
        desc: "The dashboard now remembers your preferred Language (TypeScript/JavaScript) and Component Style (Arrow/Function) across sessions.",
      },
    ],
    changed: [
      {
        title: "Modularized Architecture",
        desc: "Split the monolithic 2,300-line index.html into a clean app.js and styles.css structure for improved maintainability.",
      },
    ],
    fixed: [],
  },
  {
    version: "1.1.5",
    date: "June 26, 2026",
    latest: false,
    added: [],
    changed: [],
    fixed: [
      {
        title: "NPM Markdown Compatibility",
        desc: "Replaced the <video> tag in the README with a clean text link pointing to the Next.js site, as the NPM registry strictly strips out HTML video elements, leaving a broken layout. Removed leftover placeholder text.",
      },
      {
        title: "Cropped Video",
        desc: "Updated the demo video to a tightly cropped, high-resolution version.",
      },
    ],
  },
  {
    version: "1.1.4",
    date: "June 26, 2026",
    latest: false,
    added: [
      {
        title: "Interactive Demo",
        desc: "Added a looping video demonstration of the CLI to the README and website.",
      },
      {
        title: "Documentation Links",
        desc: "Added direct links to the new Next.js documentation website within the CLI terminal output and the local UI.",
      },
    ],
    changed: [],
    fixed: [],
  },
  {
    version: "1.1.3",
    date: "June 26, 2026",
    latest: false,
    added: [
      {
        title: "Unit Testing Suite",
        desc: "Implemented a comprehensive Vitest testing suite covering the React component generator to ensure strictly typed, 100% valid React output.",
      },
      {
        title: "Automated CI/CD Tests",
        desc: "The GitHub Actions release pipeline now strictly enforces npm test before any tag or npm publish occurs.",
      },
      {
        title: "Website Link",
        desc: "Added a direct link to the full documentation website in the README.md.",
      },
    ],
    changed: [],
    fixed: [
      {
        title: "Regex Edge Case",
        desc: "Fixed a critical generator bug where width and height attributes were being globally stripped from all inner SVG tags (e.g. <rect width=\"24\">), which was distorting certain icons. The generator now strictly targets only the outer <svg> wrapper.",
      },
    ],
  },
  {
    version: "1.1.2",
    date: "June 26, 2026",
    latest: false,
    added: [
      {
        title: "Infinite Scrolling",
        desc: "Implemented a highly optimised IntersectionObserver to seamlessly lazy-load icons as you scroll, completely replacing the static 100-icon limit. The backend API now supports start and limit pagination.",
      },
      {
        title: "Sidebar Filtering Engine",
        desc: "Built a dynamic sidebar filter panel. The app fetches available packs and styles from /api/filters on load, letting you narrow down searches across 200,000+ icons instantly.",
      },
      {
        title: "Premium Skeleton Loaders",
        desc: "Introduced shimmering skeleton states for both the icon grid and the sidebar filters, hardcoded directly into the initial DOM to prevent layout shifts during API fetches.",
      },
      {
        title: "Retina-Ready Favicon",
        desc: "Extracted the star logo into a standalone SVG favicon with matching violet-to-cyan gradients — scales perfectly on all displays.",
      },
    ],
    changed: [
      {
        title: "UI Architecture Refactoring",
        desc: "Replaced the landing-page hero section with a native app-like layout. The search bar is now prominently centred in the header, bringing the icon grid and filters into immediate view on load.",
      },
      {
        title: "Typography & Aesthetics",
        desc: "Migrated to the Outfit Google Font using a strict fonts-loaded pattern to completely eliminate Flash of Invisible Text (FOIT) without adding local .woff2 files to the package.",
      },
      {
        title: "Layout Shift Fixes",
        desc: "Added a global custom scrollbar with overflow-y: scroll to lock layout width. Implemented scrollRestoration = manual and instant top-scrolling on filter changes to prevent browser scroll snaps.",
      },
    ],
    fixed: [],
  },
  {
    version: "1.1.0",
    date: "June 25, 2026",
    latest: false,
    added: [
      {
        title: "Modern Color Picker",
        desc: "Integrated the Pickr library for a smoother, cross-browser consistent color selection experience.",
      },
      {
        title: "Recent Colors",
        desc: "Saved and displayed the 5 most recently used colors — persisted across sessions using localStorage.",
      },
      {
        title: "Hex Input Enhancements",
        desc: "The hex input now auto-formats and expands 3-digit hex codes (e.g. #abc expands to #aabbcc).",
      },
    ],
    changed: [
      {
        title: "Inherit Mode",
        desc: "Replaced the previous currentColor button with a new Inherit switch for improved UI clarity.",
      },
      {
        title: "Startup Behaviour",
        desc: "The application now loads a random icon theme on initialisation instead of a static search.",
      },
      {
        title: "Dynamic Swatches",
        desc: "Refactored the color swatches section to dynamically render recent colors alongside standard presets.",
      },
      {
        title: "Slider UI",
        desc: "Improved the size slider with dynamic fill tracking as the value changes.",
      },
    ],
    fixed: [],
  },
  {
    version: "1.0.1",
    date: "June 24, 2026",
    latest: false,
    added: [],
    changed: [],
    fixed: [
      {
        title: "Duplicate color attribute (TS17001)",
        desc: "Fixed a strict TypeScript compilation error where generated SVG components rendered duplicate color attributes when parsing premium SVGs that natively hardcoded color=currentColor.",
      },
      {
        title: "Modal DOM null exception",
        desc: "Resolved a critical JavaScript DOM selector exception (Cannot set properties of null) that was completely preventing the customization modal from opening.",
      },
      {
        title: "Windows bin resolution",
        desc: "Corrected the package.json executable path to prevent bin resolution issues on Windows operating systems.",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "June 24, 2026",
    latest: false,
    added: [
      {
        title: "Initial Release",
        desc: "First public release of icon-vista.",
      },
      {
        title: "Visual Search Engine",
        desc: "Launched the beautiful localhost UI to search over 200,000+ open-source icons from Iconify.",
      },
      {
        title: "Provider Architecture",
        desc: "Implemented a highly scalable, decoupled backend engine supporting multiple icon providers.",
      },
      {
        title: "Untitled UI Pro Integration",
        desc: "Engineered the Reverse-Rendering backend to securely parse, compile, and serve premium private icon repositories locally without exposing authentication tokens.",
      },
      {
        title: "Code Generator",
        desc: "Added one-click SVG React component code generation supporting both JavaScript and strict TypeScript outputs.",
      },
    ],
    changed: [],
    fixed: [],
  },
];

const tagStyles: Record<string, string> = {
  Added: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Changed: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
  Fixed: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

type Entry = { title: string; desc: string };

function ChangeGroup({ label, entries }: { label: string; entries: Entry[] }) {
  if (!entries.length) return null;
  return (
    <div className="mb-6">
      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md border mb-4 uppercase tracking-widest ${tagStyles[label]}`}>
        {label}
      </span>
      <ul className="space-y-4">
        {entries.map((e) => (
          <li key={e.title} className="flex gap-3">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 shrink-0" />
            <div>
              <span className="font-semibold text-white text-sm">{e.title} — </span>
              <span className="text-sm text-slate-400">{e.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#08090f] pt-16">

        {/* Header */}
        <div className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-purple/10 blur-[80px] rounded-full" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-8 py-20">
            <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-4">Changelog</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Release History</h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Every feature, fix, and improvement — documented per release. icon-vista follows{" "}
              <a href="https://semver.org" target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">Semantic Versioning</a>.
            </p>
          </div>
        </div>

        {/* Releases */}
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-brand-purple/40 via-white/5 to-transparent hidden md:block" />

            <div className="space-y-16">
              {releases.map((release) => (
                <div key={release.version} className="md:flex gap-10">
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-6 pt-1">
                    <div className={`w-[10px] h-[10px] rounded-full border-2 shrink-0 ${release.latest ? "bg-brand-purple border-brand-purple shadow-lg shadow-brand-purple/50" : "bg-[#08090f] border-white/20"}`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-panel rounded-2xl p-8 border border-white/5">
                    {/* Version Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <a
                        href={`https://github.com/nibin-org/icon-vista/releases/tag/v${release.version}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl font-black text-white hover:text-brand-cyan transition-colors tracking-tight"
                      >
                        v{release.version}
                      </a>
                      {release.latest && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 uppercase tracking-widest">
                          Latest
                        </span>
                      )}
                      <span className="text-xs text-slate-600 ml-auto font-mono">{release.date}</span>
                    </div>

                    <ChangeGroup label="Added" entries={release.added} />
                    <ChangeGroup label="Changed" entries={release.changed} />
                    <ChangeGroup label="Fixed" entries={release.fixed} />

                    {/* GitHub Link */}
                    <a
                      href={`https://github.com/nibin-org/icon-vista/releases/tag/v${release.version}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 mt-4 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      View on GitHub Releases
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 px-6 text-center text-slate-600 text-sm">
          <p>Built by <a href="https://github.com/nibin-org" className="text-slate-400 hover:text-white transition-colors">Nibin Kurian</a> · MIT License</p>
        </footer>
      </main>
    </>
  );
}
