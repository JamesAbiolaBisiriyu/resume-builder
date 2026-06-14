// File Purpose: Home and resume-builder UI section component: Hero.
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Play, CheckCircle, Sparkles, Download, Share2 } from "lucide-react";

// ── Animated mock resume card ────────────────────────────────────────────────
const MockResumeCard = () => (
  <div className="relative w-full max-w-[340px] mx-auto select-none">
    {/* Glow */}
    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-green-300/30 via-emerald-200/20 to-teal-300/20 blur-2xl pointer-events-none" />

    {/* Card */}
    <div className="relative bg-white rounded-2xl shadow-2xl shadow-green-100/60 border border-slate-100 overflow-hidden">
      {/* Accent top bar */}
      <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400" />

      {/* Card header */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          JA
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-800 text-sm truncate">James Abiola</div>
          <div className="text-[11px] text-slate-400 truncate">Software Engineer · Lagos, NG</div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-200">
          <Sparkles size={9} /> AI-enhanced
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 space-y-4">
        {/* Summary */}
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5 font-medium">Summary</p>
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-slate-100 w-full" />
            <div className="h-2 rounded-full bg-slate-100 w-5/6" />
            <div className="h-2 rounded-full bg-slate-100 w-3/4" />
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5 font-medium">Experience</p>
          <div className="space-y-3">
            {[
              { widths: ["w-full", "w-4/5", "w-3/5"] },
              { widths: ["w-5/6", "w-2/3"] },
            ].map((job, i) => (
              <div key={i} className="pl-2 border-l-2 border-green-200 space-y-1">
                <div className="h-2.5 rounded-full bg-slate-200 w-28" />
                {job.widths.map((w, j) => (
                  <div key={j} className={`h-1.5 rounded-full bg-slate-100 ${w}`} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5 font-medium">Skills</p>
          <div className="flex flex-wrap gap-1">
            {["React", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map((s) => (
              <span key={s} className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium border border-green-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-5 pb-4 flex gap-2">
        <div className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-semibold py-2 rounded-lg">
          <Download size={10} /> Export PDF
        </div>
        <div className="flex items-center justify-center gap-1 border border-slate-200 text-slate-500 text-[10px] px-3 py-2 rounded-lg">
          <Share2 size={10} /> Share
        </div>
      </div>
    </div>

    {/* Floating badges */}
    <div className="absolute -right-3 top-14 bg-white shadow-lg shadow-slate-100 rounded-xl px-3 py-2 flex items-center gap-2 border border-slate-100 text-xs whitespace-nowrap">
      <Sparkles size={12} className="text-green-500 shrink-0" />
      <span className="font-medium text-slate-700">AI writing suggestions</span>
    </div>
    <div className="absolute -left-3 bottom-16 bg-white shadow-lg shadow-slate-100 rounded-xl px-3 py-2 flex items-center gap-2 border border-slate-100 text-xs whitespace-nowrap">
      <CheckCircle size={12} className="text-emerald-500 shrink-0" />
      <span className="font-medium text-slate-700">ATS-ready format</span>
    </div>
  </div>
);

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const companiesLogo = [
    { logo: "/logos/company1.svg" },
    { logo: "/logos/company2.svg" },
    { logo: "/logos/company3.svg" },
    { logo: "/logos/company4.svg" },
    { logo: "/logos/company5.svg" },
  ];

  return (
    <>
      <div className="min-h-screen pb-16">
        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Resume Builder logo" className="h-11 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-slate-700">
            <a href="#" className="hover:text-green-600 transition">Home</a>
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
            <a href="#cta" className="hover:text-green-600 transition">Get started</a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex gap-2 items-center">
            {user ? (
              <Link to="/app" className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full text-white font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/app?state=login" className="px-5 py-2 border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all rounded-full text-slate-700">
                  Log in
                </Link>
                <Link to="/app?state=register" className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full text-white font-medium">
                  Get started free
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* ── Mobile menu ────────────────────────────────────────────────── */}
        <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-lg gap-7 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {[
            { label: "Home", href: "#" },
            { label: "Features", href: "#features" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Get started", href: "#cta" },
          ].map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-white font-medium hover:text-green-400 transition">
              {label}
            </a>
          ))}
          <Link to="/app?state=register" onClick={() => setMenuOpen(false)} className="mt-2 px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition">
            Get started free
          </Link>
          <button onClick={() => setMenuOpen(false)} className="mt-1 size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition text-sm">
            ✕
          </button>
        </div>

        {/* ── Hero content ───────────────────────────────────────────────── */}
        <div className="relative px-6 md:px-16 lg:px-24 xl:px-40 pt-10 pb-6">
          {/* Background glow blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] bg-green-200/40 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div className="text-center lg:text-left">
              {/* Social proof pill */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="flex -space-x-2.5">
                  {[
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
                    "https://randomuser.me/api/portraits/men/75.jpg",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="user" className="size-8 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Trusted by 10,000+ job seekers</p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-semibold max-w-xl mx-auto lg:mx-0 leading-[1.12] tracking-tight text-slate-900 mb-5">
                Land your dream job with{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  AI-powered
                </span>{" "}
                resumes.
              </h1>

              <p className="text-base text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
                Build, customize, and export a professional, ATS-ready resume in minutes — no design experience needed.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8">
                <Link
                  to={user ? "/app" : "/app?state=register"}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full px-8 h-12 ring-1 ring-offset-2 ring-green-400 active:scale-95 transition-all"
                >
                  {user ? "Go to Dashboard" : "Build my resume free"}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to={user ? `/view/${user?.resumeId || ""}` : "/app?state=register"}
                  className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full px-7 h-12 active:scale-95 transition-all"
                >
                  <Play size={14} className="fill-slate-600 stroke-slate-600" />
                  <span>See example resume</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                {["Free forever", "No credit card required", "Instant PDF download"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-green-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: mock resume */}
            <div className="flex justify-center lg:justify-end">
              <MockResumeCard />
            </div>
          </div>

          {/* Trusted by strip */}
          <div className="max-w-6xl mx-auto mt-16 lg:mt-20">
            <p className="text-center text-sm text-slate-400 mb-5">Used by candidates hired at</p>
            <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
              {companiesLogo.map((company, index) => (
                <img key={index} src={company.logo} alt={`Company logo ${index + 1}`} className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
