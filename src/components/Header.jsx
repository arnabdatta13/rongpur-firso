import React from "react";
import { EVENT_DETAILS } from "../config/constants";
import { Calendar, MapPin, Sparkles, Flame, Trophy, Users, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-20 w-full mb-8">
      {/* Top Live Announcement Ticker */}
      <div className="w-full bg-gradient-to-r from-red-950 via-red-900 to-slate-950 border-b border-red-500/30 py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[11px] font-semibold text-red-200 overflow-hidden gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-extrabold uppercase text-white tracking-wider">OFFICIAL PORTAL</span>
          </div>
          <div className="truncate text-slate-300 font-medium hidden sm:block">
            🔥 Rongpur Division National Selection Campaign • Date: <span className="text-white font-bold">{EVENT_DETAILS.date}</span> • Venue: <span className="text-white font-bold">{EVENT_DETAILS.venue}</span>
          </div>
          <div className="flex items-center gap-1.5 text-yellow-400 font-bold shrink-0 text-xs">
            <Trophy className="w-3.5 h-3.5" />
            <span>FIRSO 2026</span>
          </div>
        </div>
      </div>

      {/* Top Ambient Glow Effect */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-52 bg-gradient-to-r from-red-700/35 via-rose-600/25 to-amber-600/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-9 relative overflow-hidden border-2 border-red-500/35 shadow-2xl shadow-red-950/40">
          
          {/* Cyber Radial Accents */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">

            {/* Left Brand Title & Subtitle */}
            <div className="text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>RONGPUR DIVISION REGISTRATION PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Fibonacci International Robot & <span className="gradient-text">STEM Olympiad 2026</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl">
                {EVENT_DETAILS.event} — Empowering the next generation of innovators in Bangladesh.
              </p>

              {/* Stats Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 text-slate-200">
                  <Users className="w-3.5 h-3.5 text-red-400" />
                  <span>500+ Participants</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>6 STEM & Robotics Tracks</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 border border-red-500/30 text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified National Entry</span>
                </div>
              </div>
            </div>

            {/* Right Date & Venue Badge Cards */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <div className="flex-1 sm:flex-initial glass-card px-5 py-4 rounded-2xl border border-red-500/40 flex items-center gap-3.5 min-w-[180px]">
                <div className="w-11 h-11 rounded-xl bg-red-600/20 flex items-center justify-center text-red-400 shrink-0 border border-red-500/40 shadow-inner">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Event Date</div>
                  <div className="text-base font-extrabold text-white">{EVENT_DETAILS.date}</div>
                </div>
              </div>

              <div className="flex-1 sm:flex-initial glass-card px-5 py-4 rounded-2xl border border-red-500/40 flex items-center gap-3.5 min-w-[220px]">
                <div className="w-11 h-11 rounded-xl bg-rose-600/20 flex items-center justify-center text-rose-400 shrink-0 border border-red-500/40 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Venue</div>
                  <div className="text-xs sm:text-sm font-extrabold text-white leading-tight">UIU, Dhaka</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
