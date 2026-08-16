import React from "react";
import { EVENT_DETAILS } from "../config/constants";
import { generateSecurityHash } from "../utils/securityHash";
import { Calendar, MapPin, Printer, MessageSquare, ShieldCheck, QrCode } from "lucide-react";

export default function DelegateBadge({ registration }) {
  const leaderName = registration.studentName || registration.leaderName || registration.leader?.name || "Participant";
  const email = registration.email || registration.leader?.email || "";
  const institution = registration.institution || registration.leader?.institution || "";
  const tshirtSize = registration.tShirtSize || registration.leader?.tshirtSize || "N/A";
  const ageGroup = registration.ageCategory || registration.ageGroup || "";
  const teamMembers = registration.members || registration.teamMembers || [];
  const category = registration.category || "";

  let delegateBannerText = "DELEGATE";
  if (category === "Olympiads" || registration.registrationType === "olympiad" || category === "olympiads") {
    delegateBannerText = "OLYMPIAD DELEGATE";
  } else if (category === "Direct Robotics Categories" || registration.registrationType === "robotics" || category === "robotics") {
    delegateBannerText = "ROBOTICS DELEGATE";
  } else if (category === "Entrepreneurship & Projects" || registration.registrationType === "entrepreneurship" || category === "entrepreneurship") {
    delegateBannerText = "ENTREPRENEURSHIP DELEGATE";
  }

  const securityHash = generateSecurityHash(
    registration.registrationId,
    email,
    registration.referralDivision || "Rongpur"
  );

  const handlePrint = () => {
    window.print();
  };

  const handleJoinWhatsApp = () => {
    window.open(EVENT_DETAILS.whatsappGroupUrl, "_blank");
  };

  const subcategoryDisplay = registration.subcategory || (
    registration.subcategories?.length === 2
      ? "Both Math & Science Olympiads"
      : registration.subcategories?.map((s) => (s === "math" ? "Mathematics Olympiad" : "Science Olympiad")).join(", ")
  ) || registration.competition || "N/A";

  return (
    <div className="space-y-6">

      {/* Printable Badge Container */}
      <div
        id="printable-badge"
        className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-red-500/60 relative overflow-hidden bg-gradient-to-b from-[#120507] via-[#0A0A0C] to-[#18080B] max-w-xl mx-auto shadow-2xl shadow-red-600/25"
      >
        {/* Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Header */}
        <div className="text-center space-y-1.5 border-b border-white/15 pb-5">
          <div className="text-xs font-black uppercase tracking-widest text-red-500">
            FIRSO BANGLADESH
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            National Selection Round 2026
          </h2>
          <div className="inline-block px-3 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-300 font-black text-xs uppercase tracking-wider">
            RONGPUR DIVISION
          </div>
        </div>

        {/* Event Date & Venue */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-300 py-3 border-b border-white/10 font-semibold">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-red-400" />
            <span>{EVENT_DETAILS.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-right">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>UIU, Dhaka</span>
          </div>
        </div>

        {/* Delegate Type Banner */}
        <div className="my-5 text-center">
          <div className="inline-block w-full py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-crimson to-rose-700 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-red-700/30">
            {delegateBannerText}
          </div>
        </div>

        {/* Registration ID Banner */}
        <div className="bg-[#050505] border border-red-500/40 rounded-2xl p-4 text-center my-4">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Registration ID</div>
          <div className="text-xl sm:text-2xl font-black text-red-400 tracking-widest font-mono">
            {registration.registrationId}
          </div>
        </div>

        {/* Participant & Competition Breakdown */}
        <div className="space-y-3 text-xs text-slate-200">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400 font-medium">Participant Name:</span>
            <span className="font-bold text-white text-sm">{leaderName}</span>
          </div>

          {registration.teamName && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400 font-medium">Team Name:</span>
              <span className="font-bold text-red-400">{registration.teamName}</span>
            </div>
          )}

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400 font-medium">Competition:</span>
            <span className="font-semibold text-white">
              {subcategoryDisplay}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400 font-medium">Age Group & Institution:</span>
            <span className="font-semibold text-slate-200">
              {ageGroup} • {institution}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-slate-400 font-medium">T-Shirt Size:</span>
            <span className="font-bold text-red-400">{tshirtSize}</span>
          </div>

          {/* Team Members List on Badge */}
          {teamMembers.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-300 uppercase">Team Members ({teamMembers.length}):</div>
              <div className="space-y-1">
                {teamMembers.map((m, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-slate-300">
                    <span>{idx + 2}. {m.name}</span>
                    <span className="font-semibold text-red-400">Size: {m.tShirtSize || m.tshirtSize}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Barcode Verification Area */}
        <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-4 bg-[#050505] rounded-xl p-3.5 border border-red-500/30">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              Verified Delegate
            </div>
            <div className="text-[9px] font-mono text-slate-400 break-all max-w-[280px]">
              HASH: {securityHash.substring(0, 36)}...
            </div>
          </div>
          <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print pt-2">
        <button
          type="button"
          onClick={handleJoinWhatsApp}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Join Official WhatsApp Group</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Registration ID Card / Badge</span>
        </button>
      </div>

    </div>
  );
}
