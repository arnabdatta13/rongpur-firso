import React, { useState } from "react";
import { EVENT_DETAILS } from "../config/constants";
import { CreditCard, Copy, Check, PhoneCall, Hash, ShieldAlert, Zap } from "lucide-react";

export default function PaymentSection({ payment = {}, onChange, errors = {} }) {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(EVENT_DETAILS.paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFillSamplePayment = () => {
    onChange({
      method: payment.method || "bKash",
      senderMobile: "01957684794",
      transactionId: "BKL89X12Z"
    });
  };

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-red-500/30 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-red-400" />
            Payment Gateway Details
          </h3>
          <p className="text-xs text-slate-400">
            Complete your registration payment via bKash or Nagad <span className="text-red-400 font-bold">Send Money</span>.
          </p>
        </div>

        {/* Quick Sample Payment Fill Button */}
        <button
          type="button"
          onClick={handleFillSamplePayment}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-500/30 text-[11px] font-bold transition-all shrink-0"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Demo Payment Data</span>
        </button>
      </div>

      {/* Official Payment Number Banner */}
      <div className="glass-card rounded-2xl p-5 border-2 border-red-500/40 bg-gradient-to-r from-red-950/80 via-slate-950/90 to-rose-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-red-950/30">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Official FIRSO Send Money Number
          </div>
          <div className="text-2xl font-black tracking-widest text-white font-mono">
            {EVENT_DETAILS.paymentNumber}
          </div>
          <div className="text-[11px] text-slate-300">
            Use <span className="text-yellow-400 font-bold">Send Money</span> option in your bKash or Nagad mobile app.
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyNumber}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shrink-0 ${
            copied
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105"
              : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Number Copied!" : "1-Tap Copy Number"}</span>
        </button>
      </div>

      {/* Payment Form Fields */}
      <div className="space-y-6 pt-2">
        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Select Payment Gateway <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {EVENT_DETAILS.paymentMethods.map((method) => {
              const isSelected = payment.method === method;
              return (
                <div
                  key={method}
                  onClick={() => onChange({ ...payment, method })}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all text-center font-black text-sm flex items-center justify-center gap-3 ${
                    isSelected
                      ? method === "bKash"
                        ? "bg-pink-950/80 border-pink-500 text-pink-300 shadow-xl shadow-pink-500/30 scale-[1.02]"
                        : "bg-orange-950/80 border-orange-500 text-orange-300 shadow-xl shadow-orange-500/30 scale-[1.02]"
                      : "bg-slate-950/60 border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${isSelected ? "bg-red-500 animate-pulse" : "bg-slate-700"}`} />
                  <span>{method}</span>
                </div>
              );
            })}
          </div>
          {errors.method && <p className="text-xs text-red-400 font-medium">⚠️ {errors.method}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Sender Mobile Number */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                Sender Mobile Number <span className="text-red-400">*</span>
              </span>
              <span className="text-[10px] text-slate-400">11 Digits</span>
            </label>
            <input
              type="tel"
              maxLength={11}
              placeholder="e.g. 01900000000"
              value={payment.senderMobile || ""}
              onChange={(e) => onChange({ ...payment, senderMobile: e.target.value.replace(/\D/g, "") })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium tracking-wide"
            />
            {errors.senderMobile && <p className="text-xs text-red-400 font-medium">⚠️ {errors.senderMobile}</p>}
          </div>

          {/* Transaction ID */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-red-400" />
              Transaction ID (TrxID) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. BKL89X12Z"
              value={payment.transactionId || ""}
              onChange={(e) => onChange({ ...payment, transactionId: e.target.value.toUpperCase().trim() })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-bold tracking-widest uppercase"
            />
            {errors.transactionId && <p className="text-xs text-red-400 font-medium">⚠️ {errors.transactionId}</p>}
          </div>

        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-amber-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Double-check your Sender Mobile Number and Transaction ID. Registration confirmation updates within 24 hours.
          </span>
        </div>
      </div>
    </div>
  );
}
