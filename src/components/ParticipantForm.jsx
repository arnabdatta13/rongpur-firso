import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../data/categories";
import { TSHIRT_SIZES } from "../config/constants";
import { OFFICIAL_RONGPUR_AMBASSADORS } from "../data/referralCodes";
import { resolveReferralCode } from "../utils/referralResolver";
import { User, Mail, Phone, School, GraduationCap, Shirt, Users, Tag, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Zap } from "lucide-react";

export default function ParticipantForm({
  registration,
  onChange,
  onNext,
  onBack,
  errors = {}
}) {
  const [referralStatus, setReferralStatus] = useState({ loading: false, message: "", isValid: null });

  const currentCatObj = CATEGORIES.find((c) => c.id === registration.category);
  const isOlympiad = registration.category === "olympiads";
  const availableAgeGroups = currentCatObj?.ageGroups || [];

  const leader = registration.leader || {};

  const handleLeaderChange = (field, value) => {
    onChange({
      leader: {
        ...leader,
        [field]: value
      }
    });
  };

  const handleAutoFill = () => {
    const sampleAgeGroup = availableAgeGroups.includes("Class 9-10")
      ? "Class 9-10"
      : availableAgeGroups[0] || "Class 9-10";

    onChange({
      ageGroup: sampleAgeGroup,
      teamName: isOlympiad ? "" : "Rongpur Cyber Robotics",
      leader: {
        name: "Tahsin Ahmed",
        email: "tahsin.firso2026@gmail.com",
        phone: "01712345678",
        institution: "Rongpur Zilla School",
        class: "Class 10",
        tshirtSize: "L"
      },
      referralCodeEntered: "Samiya786"
    });
    handleReferralChange("Samiya786");
  };

  const handleReferralChange = async (val) => {
    onChange({ referralCodeEntered: val });
    if (!val.trim()) {
      setReferralStatus({ loading: false, message: "", isValid: null });
      onChange({ referralCode: "Rongpur-UA", referralDivision: "Rongpur" });
      return;
    }

    setReferralStatus({ loading: true, message: "Processing referral code...", isValid: null });
    const res = await resolveReferralCode(val);

    if (res.isValid && res.storedCode) {
      setReferralStatus({
        loading: false,
        message: `✓ Valid Referral Code (Database Stored: ${res.storedCode})`,
        isValid: true
      });
      onChange({
        referralCode: res.storedCode,
        referralDivision: res.division || "Rongpur"
      });
    } else {
      setReferralStatus({
        loading: false,
        message: res.error || "Invalid referral code.",
        isValid: false
      });
      onChange({ referralCode: "Rongpur-UA", referralDivision: "Rongpur" });
    }
  };

  useEffect(() => {
    if (registration.referralCodeEntered) {
      handleReferralChange(registration.referralCodeEntered);
    }
  }, []);

  const phoneDigits = (leader.phone || "").replace(/\D/g, "").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Quick Fill Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Step 2: <span className="gradient-text">{isOlympiad ? "Participant" : "Team Leader"} Details</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Fill in primary registrant contact details.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-yellow-500/25 transition-all transform hover:-translate-y-0.5 shrink-0"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>⚡ Fast Auto-Fill Form</span>
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-400" />
                Full Name <span className="text-red-400">*</span>
              </span>
              {leader.name && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <input
              type="text"
              placeholder="e.g. Tahsin Ahmed"
              value={leader.name || ""}
              onChange={(e) => handleLeaderChange("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
            />
            {errors.name && <p className="text-xs text-red-400 font-medium">⚠️ {errors.name}</p>}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                Email Address <span className="text-red-400">*</span>
              </span>
              {leader.email && leader.email.includes("@") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <input
              type="email"
              placeholder="e.g. tahsin@example.com"
              value={leader.email || ""}
              onChange={(e) => handleLeaderChange("email", e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
            />
            <div className="flex gap-1.5 pt-1 overflow-x-auto no-scrollbar">
              {["@gmail.com", "@yahoo.com", "@uiu.ac.bd"].map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    const prefix = (leader.email || "").split("@")[0] || "tahsin";
                    handleLeaderChange("email", `${prefix}${domain}`);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  +{domain}
                </button>
              ))}
            </div>
            {errors.email && <p className="text-xs text-red-400 font-medium">⚠️ {errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                Phone / WhatsApp Number <span className="text-red-400">*</span>
              </span>
              <span className={`text-[10px] font-bold ${phoneDigits === 11 ? "text-emerald-400" : "text-slate-500"}`}>
                {phoneDigits} / 11 Digits
              </span>
            </label>
            <input
              type="tel"
              maxLength={11}
              placeholder="e.g. 01712345678"
              value={leader.phone || ""}
              onChange={(e) => handleLeaderChange("phone", e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium tracking-wide"
            />
            {errors.phone && <p className="text-xs text-red-400 font-medium">⚠️ {errors.phone}</p>}
          </div>

          {/* Educational Institution */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-red-400" />
                Educational Institution <span className="text-red-400">*</span>
              </span>
              {leader.institution && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <input
              type="text"
              placeholder="e.g. Rongpur Zilla School / UIU"
              value={leader.institution || ""}
              onChange={(e) => handleLeaderChange("institution", e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
            />
            {errors.institution && <p className="text-xs text-red-400 font-medium">⚠️ {errors.institution}</p>}
          </div>

          {/* Class / Grade / Semester */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                Class / Grade / Semester <span className="text-red-400">*</span>
              </span>
              {leader.class && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <input
              type="text"
              placeholder="e.g. Class 10 / Semester 4"
              value={leader.class || ""}
              onChange={(e) => handleLeaderChange("class", e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
            />
            {errors.class && <p className="text-xs text-red-400 font-medium">⚠️ {errors.class}</p>}
          </div>

          {/* Dynamic Age Group Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-red-400" />
              Eligible Age Group <span className="text-red-400">*</span>
            </label>
            <select
              value={registration.ageGroup || ""}
              onChange={(e) => onChange({ ageGroup: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium bg-[#0A0A0C] text-white cursor-pointer"
            >
              <option value="">-- Select Age Group Category --</option>
              {availableAgeGroups.map((grp) => (
                <option key={grp} value={grp}>
                  {grp}
                </option>
              ))}
            </select>
            {errors.ageGroup && <p className="text-xs text-red-400 font-medium">⚠️ {errors.ageGroup}</p>}
          </div>

          {/* T-Shirt Size Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-red-400" />
              T-Shirt Size <span className="text-red-400">*</span>
            </label>
            <select
              value={leader.tshirtSize || ""}
              onChange={(e) => handleLeaderChange("tshirtSize", e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium bg-[#0A0A0C] text-white cursor-pointer"
            >
              <option value="">-- Select T-Shirt Size --</option>
              {TSHIRT_SIZES.map((sz) => (
                <option key={sz.value} value={sz.value}>
                  {sz.label}
                </option>
              ))}
            </select>
            {errors.tshirtSize && <p className="text-xs text-red-400 font-medium">⚠️ {errors.tshirtSize}</p>}
          </div>

          {/* Team Name - Only for Non-Olympiad competitions */}
          {!isOlympiad && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-red-400" />
                  Team Name <span className="text-red-400">*</span>
                </span>
                {registration.teamName && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </label>
              <input
                type="text"
                placeholder="e.g. Rongpur Cyber Robotics"
                value={registration.teamName || ""}
                onChange={(e) => onChange({ teamName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
              />
              {errors.teamName && <p className="text-xs text-red-400 font-medium">⚠️ {errors.teamName}</p>}
            </div>
          )}

        </div>

        {/* Referral / Campus Ambassador Code Select Dropdown & Manual Input */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              Referral Code / Campus Ambassador (Optional)
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Rongpur Division Campaign</span>
          </label>

          {/* Dropdown Select Menu */}
          <div className="space-y-2">
            <select
              value={registration.referralCodeEntered || ""}
              onChange={(e) => handleReferralChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-semibold bg-[#0A0A0C] text-white cursor-pointer"
            >
              <option value="">-- Select Official Campus Ambassador Code --</option>
              {OFFICIAL_RONGPUR_AMBASSADORS.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          {/* Or Type Custom Code */}
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-slate-400">Or type custom referral code:</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Type custom referral code..."
                value={registration.referralCodeEntered || ""}
                onChange={(e) => handleReferralChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium uppercase tracking-wider"
              />
              {referralStatus.loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-400 font-medium">
                  Checking...
                </span>
              )}
            </div>
          </div>

          {referralStatus.message && (
            <div
              className={`text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-2 ${
                referralStatus.isValid
                  ? "bg-emerald-500/15 border border-emerald-400/30 text-emerald-300"
                  : "bg-red-500/15 border border-red-400/30 text-red-300"
              }`}
            >
              {referralStatus.isValid ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{referralStatus.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm transition-all border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{isOlympiad ? "Proceed to Payment" : "Continue to Team Members"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
