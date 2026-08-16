import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import DelegateBadge from "./DelegateBadge";
import { CheckCircle2, Copy, Check, Sparkles, RefreshCw } from "lucide-react";

export default function Confirmation({ registration, onReset }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#EF4444", "#DC2626", "#F87171", "#F59E0B", "#FFFFFF"]
      });
    } catch (e) {
      console.log("Confetti effect optional", e);
    }
  }, []);

  const handleCopyId = () => {
    if (registration.registrationId) {
      navigator.clipboard.writeText(registration.registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-600/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          REGISTRATION CONFIRMED
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Congratulations!
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Your FIRSO 2026 Rongpur Division registration has been submitted successfully.
        </p>

        {/* LocalStorage Fallback Notification */}
        {registration.isSavedLocally && (
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            ℹ️ Registration saved locally. Sync will complete automatically when connection refreshes.
          </div>
        )}
      </div>

      {/* Highly Visible Registration ID Card */}
      <div className="glass-panel max-w-md mx-auto p-6 rounded-2xl border border-red-500/50 text-center space-y-3 bg-gradient-to-b from-red-950/40 via-slate-950/90 to-rose-950/40 shadow-xl shadow-red-500/20">
        <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Your Official Registration ID
        </div>

        <div className="text-2xl sm:text-3xl font-black text-red-400 tracking-widest font-mono select-all">
          {registration.registrationId}
        </div>

        <button
          type="button"
          onClick={handleCopyId}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            copied
              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
              : "bg-slate-900 hover:bg-slate-800 text-red-400 border border-red-500/40"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Registration ID Copied!" : "Copy Registration ID"}</span>
        </button>
      </div>

      {/* Digital Delegate Badge */}
      <DelegateBadge registration={registration} />

      {/* Start New Registration Button */}
      <div className="text-center pt-8 border-t border-white/10 no-print">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-all border border-slate-800"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Register Another Participant / Team</span>
        </button>
      </div>
    </div>
  );
}
