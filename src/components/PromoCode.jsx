import React, { useState } from "react";
import { resolvePromoCode } from "../utils/promoResolver";
import { Tag, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function PromoCode({ promo = {}, onApplyPromo }) {
  const [inputCode, setInputCode] = useState(promo.appliedPromoCode || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    message: promo.appliedPromoCode ? `Applied ${promo.appliedPromoCode} (${promo.discountPercent}% OFF)` : "",
    isValid: promo.discountPercent > 0
  });

  const availableSamplePromos = [
    { code: "IUBPC10", label: "IUBPC10 (10% OFF)" },
    { code: "FIRSO2026", label: "FIRSO2026 (15% OFF)" },
    { code: "ARNAB20", label: "ARNAB20 (20% OFF)" }
  ];

  const handleApplyCode = async (codeToApply) => {
    const target = codeToApply || inputCode;
    if (!target.trim()) {
      onApplyPromo({ appliedPromoCode: "", discountPercent: 0 });
      setStatus({ message: "", isValid: null });
      return;
    }

    setLoading(true);
    const res = await resolvePromoCode(target);
    setLoading(false);

    if (res.isValid && res.discountPercent > 0) {
      setInputCode(res.code);
      setStatus({
        message: `🎉 Promo code ${res.code} applied! (${res.discountPercent}% OFF)`,
        isValid: true
      });
      onApplyPromo({
        appliedPromoCode: res.code,
        discountPercent: res.discountPercent
      });
    } else {
      setStatus({
        message: res.error || "Invalid promo code. Code not found in database.",
        isValid: false
      });
      onApplyPromo({ appliedPromoCode: "", discountPercent: 0 });
    }
  };

  const handleClear = () => {
    setInputCode("");
    setStatus({ message: "", isValid: null });
    onApplyPromo({ appliedPromoCode: "", discountPercent: 0 });
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-red-500/30 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-red-400" />
          Promo Code / Coupon
        </label>
        <span className="text-[10px] text-red-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Instant Discount
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. IUBPC10, FIRSO2026"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          className="flex-1 px-4 py-3 rounded-2xl glass-input text-sm font-bold uppercase tracking-wider"
        />
        {promo.appliedPromoCode ? (
          <button
            type="button"
            onClick={handleClear}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-slate-700 shrink-0"
          >
            Clear
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleApplyCode(inputCode)}
            disabled={loading || !inputCode.trim()}
            className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-md shadow-red-600/30 shrink-0"
          >
            {loading ? "Checking..." : "Apply Code"}
          </button>
        )}
      </div>

      {/* 1-Tap Clickable Sample Promo Chips */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[11px] font-bold text-slate-400">Tap to apply sample discount coupon:</div>
        <div className="flex flex-wrap gap-2">
          {availableSamplePromos.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleApplyCode(item.code)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                promo.appliedPromoCode === item.code
                  ? "bg-red-600 text-white border-red-400 shadow-md shadow-red-600/30"
                  : "bg-red-950/40 hover:bg-red-900/60 text-red-300 border-red-500/30"
              }`}
            >
              🏷️ {item.label}
            </button>
          ))}
        </div>
      </div>

      {status.message && (
        <div
          className={`text-xs font-semibold p-3 rounded-xl flex items-center gap-2 ${
            status.isValid
              ? "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300"
              : "bg-red-500/15 border border-red-400/30 text-red-300"
          }`}
        >
          {status.isValid ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}
