import React, { useState } from "react";
import { EVENT_DETAILS, PARTICIPATING_COUNTRIES, PARTNER_UNIVERSITIES, FAQS } from "../config/constants";
import { 
  Trophy, Flame, BookOpen, Globe, Bot, Calendar, 
  MapPin, ShieldCheck, ChevronDown, ChevronUp, ExternalLink, 
  Award, GraduationCap, FileText, ArrowRight
} from "lucide-react";

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const handleRegisterClick = () => {
    window.open(EVENT_DETAILS.registrationGoogleFormUrl, "_blank");
  };

  const marqueeCountries = [...PARTICIPATING_COUNTRIES, ...PARTICIPATING_COUNTRIES];

  return (
    <div id="home" className="space-y-24 pb-20 animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (2-Column Grid)                                   */}
      {/* ========================================================================= */}
      <section className="relative pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Background Ambient Glowing Orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-72 bg-gradient-to-r from-red-700/35 via-rose-600/25 to-amber-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pulsing Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
              <Trophy className="w-4 h-4 text-red-500 animate-bounce" />
              <span>FIRSO BANGLADESH 2026 • NATIONAL SELECTION ROUND</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Empowering Youth in <br />
              <span className="gradient-text">Robotics, Science & STEM</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Representing <span className="text-white font-bold">Rongpur Division</span> at the Bangladesh National Selection Round at <span className="text-red-400 font-bold">UIU Dhaka ({EVENT_DETAILS.date})</span> & Global Final Round in <span className="text-amber-400 font-bold">Rome, Italy ({EVENT_DETAILS.romeDates})</span>!
            </p>

            {/* CTA Buttons: Register Now & Download Official Rulebook */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleOpenLink(EVENT_DETAILS.rulebooksUrl)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-red-500/30 transition-all"
              >
                <BookOpen className="w-4 h-4 text-red-400" />
                <span>Download Official Rulebook 📖</span>
              </button>
            </div>

            {/* Quick Venue & Date Footer Note */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-400" />
                <span>Selection: {EVENT_DETAILS.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>UIU, Dhaka</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Vector Robot Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-8 rounded-3xl border-2 border-red-500/40 shadow-2xl shadow-red-950/50 relative overflow-hidden bg-gradient-to-b from-[#18090C] via-[#0A0A0F] to-[#120508] text-center space-y-6">
              
              {/* Central Vector Graphic */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-red-500/30 border-t-red-500 animate-spin" />
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 border-2 border-red-400">
                  <Bot className="w-16 h-16 animate-pulse" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">FIRSO 2026 Global Pipeline</h3>
                <p className="text-xs text-slate-400">Rongpur Division Selection Campaign</p>
              </div>

              {/* Floating Stat Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="glass-card p-3.5 rounded-2xl border border-red-500/30 text-left">
                  <div className="text-[10px] uppercase font-bold text-amber-400">Global Final</div>
                  <div className="text-sm font-black text-white">Rome, Italy 🇮🇹</div>
                </div>

                <div className="glass-card p-3.5 rounded-2xl border border-red-500/30 text-left">
                  <div className="text-[10px] uppercase font-bold text-red-400">Host Venue</div>
                  <div className="text-sm font-black text-white">UIU, Dhaka 🏛️</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE METRICS & STATS BAR (4-Column Grid)                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-red-500">100+</div>
            <div className="text-xs font-bold text-slate-300">🌍 Participating Countries</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">7+</div>
            <div className="text-xs font-bold text-slate-300">🤖 STEM Categories</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">UIU</div>
            <div className="text-xs font-bold text-slate-300">🏛️ Host Venue (Dhaka)</div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-rose-400">Rome</div>
            <div className="text-xs font-bold text-slate-300">🇮🇹 Global Final</div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PARTICIPATING COUNTRIES SLIDER                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-red-400">Global Network</h3>
          <h2 className="text-xl sm:text-2xl font-black text-white">Participating Nations & Partner Institutions</h2>
        </div>

        {/* Right-To-Left Infinite Smooth Marquee Slider */}
        <div className="glass-panel p-4 rounded-3xl border border-red-500/30 overflow-hidden relative">
          <div className="animate-marquee-rtl py-2">
            {marqueeCountries.map((c, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0 glass-card px-5 py-2.5 rounded-2xl border border-red-500/20 text-xs font-extrabold text-slate-200 mr-4">
                <span className="text-2xl">{c.flag}</span>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* University Ticker */}
        <div className="flex items-center justify-center flex-wrap gap-3 text-xs font-semibold text-slate-400">
          <span className="text-red-400 font-bold">Academic Host & Partners:</span>
          {PARTNER_UNIVERSITIES.map((u, i) => (
            <span key={i} className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              {u}
            </span>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: ABOUT & VENUE SELECTION BANNER                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-red-500/35 relative overflow-hidden bg-gradient-to-r from-red-950/60 via-slate-950 to-rose-950/60">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                HOST VENUE: UNITED INTERNATIONAL UNIVERSITY (UIU)
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Rongpur Division Selection Campaign 2026
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                The Fibonacci International Robot & STEM Olympiad (FIRSO) brings together the sharpest young minds in Bangladesh. Participants competing from Rongpur Division will battle for national recognition at UIU Dhaka on <span className="text-white font-bold">4 September 2026</span>, paving the path to Rome, Italy!
              </p>
            </div>

            <div className="md:col-span-4 text-center md:text-right">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Register Your Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: COMPETITION SEGMENT CARDS                                      */}
      {/* ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase">
            <Flame className="w-3.5 h-3.5" />
            7 COMPETITION CATEGORIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Choose Your <span className="gradient-text">Challenge Arena</span>
          </h2>
          <p className="text-slate-300 text-sm">
            Detailed breakdown of age groups, registration fees, perks, and official syllabus & rulebook portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Olympiads (FEATURED RED GLOW CARD) */}
          <div className="lg:col-span-3 glass-panel rounded-3xl p-8 border-2 border-red-500 shadow-2xl shadow-red-600/30 bg-gradient-to-b from-red-950/70 via-slate-950 to-red-950/40 relative overflow-hidden space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/40">
                  <BrainIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider mb-1">
                    FEATURED FEATURE • SOLO ONLY
                  </div>
                  <h3 className="text-2xl font-black text-white">Mathematics & Science Olympiads</h3>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-medium">Single: <span className="text-white font-bold">500 BDT</span></div>
                <div className="text-lg font-black text-amber-400">Both Combo: 800 BDT <span className="text-xs text-emerald-400 font-bold">(Save 200 BDT)</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Syllabi & Learnect Portal Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">Official Syllabus & Mock Test Portals:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenLink(EVENT_DETAILS.syllabusDriveUrl)}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-500/30 text-xs font-bold flex items-center justify-between"
                  >
                    <span>📁 Download Drive Syllabus</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenLink(EVENT_DETAILS.mathMockTestUrl)}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 text-xs font-bold flex items-center justify-between"
                  >
                    <span>📐 Math Mock Test</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenLink(EVENT_DETAILS.scienceMockTestUrl)}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-purple-500/30 text-xs font-bold flex items-center justify-between col-span-1 sm:col-span-2"
                  >
                    <span>🔬 Science Mock Test Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Included Perks Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400">Included Participant Perks:</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-white/10">🍱 Food / Lunch</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-white/10">👕 Official T-Shirt</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-white/10">🎴 Event Badge</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-white/10">📜 Certificate</span>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-white/10">🎒 Event Kit</span>
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">📖 Olympiad Prep Book</span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>Register for Olympiads</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards 2 to 7: Remaining Competition Categories */}
          {[
            {
              title: "Entrepreneurship & Projects",
              badge: "Solo / Team (Max 5)",
              fee: "500 BDT Leader + 500 BDT/member",
              age: "Class 1-12 & University",
              desc: "Junior Startup, Blue, Green, HealthTech, RoboTech, and SoftTech challenges."
            },
            {
              title: "Line Follower Robots",
              badge: "Solo / Team (Max 5)",
              fee: "800 BDT Leader + 400 BDT/member",
              age: "Class 1-12 & University",
              desc: "Autonomous line tracking robotics challenge.",
              hasRulebook: true
            },
            {
              title: "Sumo Robots",
              badge: "Solo / Team (Max 5)",
              fee: "800 BDT Leader + 400 BDT/member",
              age: "Class 1-12 & University",
              desc: "Heavyweight autonomous bot pushing ring tournament.",
              hasRulebook: true
            },
            {
              title: "Maze Solving Robot",
              badge: "Solo / Team (Max 5)",
              fee: "800 BDT Leader + 400 BDT/member",
              age: "Class 1-12 & University",
              desc: "Micro-mouse & maze navigation algorithm competition.",
              hasRulebook: true
            },
            {
              title: "Drone Rally Racing",
              badge: "Solo / Team (Max 5)",
              fee: "800 BDT Leader + 400 BDT/member",
              age: "Class 1-12 & University",
              desc: "High-speed aerial obstacle course racing."
            },
            {
              title: "Robo Soccer / FootBot",
              badge: "Solo / Team (Max 5)",
              fee: "800 BDT Leader + 400 BDT/member",
              age: "Class 1-12 & University",
              desc: "2v2 remote controlled soccer bot showdown.",
              hasRulebook: true
            }
          ].map((cat, idx) => (
            <div key={idx} className="glass-panel rounded-3xl p-6 border border-red-500/25 flex flex-col justify-between space-y-4 hover:border-red-500/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600/15 text-red-300 border border-red-500/30">
                    {cat.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{cat.age}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{cat.desc}</p>
                <div className="text-xs font-bold text-red-400">{cat.fee}</div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                {cat.hasRulebook && (
                  <button
                    type="button"
                    onClick={() => handleOpenLink(EVENT_DETAILS.rulebooksUrl)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    <span>Download PDF Rulebook</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <span>Register Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PARTICIPANT BENEFITS                                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-black text-white">Why Participate in <span className="gradient-text">FIRSO 2026?</span></h2>
          <p className="text-slate-300 text-sm">Empowering students with global credentials and STEM portfolio opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Rome Global Final", icon: Globe, desc: "Top national champions qualify for international finals in Rome, Italy." },
            { title: "National Selection Honor", icon: Trophy, desc: "Compete at United International University (UIU), Dhaka against top teams." },
            { title: "Academic Credentials", icon: GraduationCap, desc: "Official international certificates boost university application portfolios." },
            { title: "National Recognition", icon: Award, desc: "Trophies, gold medals, and press coverage for winning teams." },
            { title: "Olympiad Prep Book", icon: BookOpen, desc: "Complimentary STEM & Olympiad study guide provided to participants." },
            { title: "Mentorship & Network", icon: ShieldCheck, desc: "Connect with university professors, robotics engineers, and industry leaders." }
          ].map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-red-500/25 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: EVENT TIMELINE & ROADMAP                                       */}
      {/* ========================================================================= */}
      <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Event Timeline & <span className="gradient-text">Roadmap</span></h2>
          <p className="text-slate-300 text-sm">Key dates leading to the Global Final Round.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: "01", date: "Campaign Phase", title: "Rongpur Division", desc: "Regional Campaign." },
            { step: "02", date: "4 Sept 2026", title: "National Selection", desc: "UIU, Dhaka Event." },
            { step: "03", date: "Sept 2026", title: "Winners Announced", desc: "Delegates awarded." },
            { step: "04", date: "Nov 2026", title: "Rome Global Final", desc: "Rome, Italy Showdown." }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-red-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md shadow-red-600/30">
                {item.step}
              </div>
              <div className="text-[10px] uppercase font-bold text-red-400">{item.date}</div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (Accordion)                         */}
      {/* ========================================================================= */}
      <section id="faq" className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="text-slate-300 text-sm">Everything you need to know about FIRSO 2026.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="glass-panel rounded-2xl border border-red-500/25 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-red-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-red-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: REVENUE & SELECTION OPPORTUNITIES                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-red-500/35 text-center space-y-6 bg-gradient-to-b from-red-950/60 to-slate-950">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to Represent <span className="gradient-text">Rongpur Division?</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            Join hundreds of STEM participants at United International University (UIU), Dhaka on 4 September 2026.
          </p>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-base shadow-xl shadow-red-600/40 transform hover:-translate-y-0.5 transition-all"
          >
            <span>Start Registration Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: FOOTER                                                        */}
      {/* ========================================================================= */}
      <footer className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-10 text-xs text-slate-400 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-white">FIRSO 2026 • Rongpur Division Campaign</div>
          <div className="flex items-center gap-4">
            <span>Official Info Contact: <a href={`https://wa.me/${EVENT_DETAILS.paymentNumber}`} target="_blank" rel="noreferrer" className="text-red-400 font-bold">{EVENT_DETAILS.paymentNumber}</a></span>
          </div>
        </div>
        <div className="text-center text-[11px] text-slate-500">
          © 2026 Fibonacci International Robot & STEM Olympiad (FIRSO). All rights reserved.
        </div>
      </footer>

    </div>
  );
}

function BrainIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a9 9 0 019 9c0 3.14-1.6 5.9-4 7.48V20a2 2 0 01-2 2h-6a2 2 0 01-2-2v-1.52C4.6 16.9 3 14.14 3 11a9 9 0 019-9z" />
    </svg>
  );
}
