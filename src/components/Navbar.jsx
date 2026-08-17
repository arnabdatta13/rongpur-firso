import React, { useState } from "react";
import { EVENT_DETAILS } from "../config/constants";
import { Flame, Trophy, Menu, X, ArrowRight, BookOpen, Layers, HelpCircle, Calendar } from "lucide-react";

export default function Navbar({ activeTab = "home", onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Trophy },
    { id: "registration", label: "Registration", icon: Flame },
    { id: "categories", label: "Categories", icon: Layers, anchor: "#categories" },
    { id: "timeline", label: "Timeline", icon: Calendar, anchor: "#timeline" },
    { id: "faq", label: "FAQ", icon: HelpCircle, anchor: "#faq" }
  ];

  const handleItemClick = (item) => {
    if (item.anchor) {
      if (activeTab !== "home") {
        onNavigate("home");
        setTimeout(() => {
          const el = document.querySelector(item.anchor);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(item.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onNavigate(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-red-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate("home")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/40 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">
                  FIRSO <span className="gradient-text">2026</span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                  Rongpur
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">National Selection Round</div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !item.anchor;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-red-600/20 text-red-400 border border-red-500/30 shadow-md shadow-red-600/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("registration")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-red-500/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.anchor;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all ${
                  isActive
                    ? "bg-red-600/20 text-red-400 border border-red-500/30"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 text-red-400" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onNavigate("registration");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
