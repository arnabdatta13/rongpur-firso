import React from "react";
import { CATEGORIES } from "../data/categories";
import { calculateFee } from "../utils/feeCalculator";
import PaymentSection from "./PaymentSection";
import {
  User,
  Award,
  Users,
  Tag,
  ArrowLeft,
  Send,
  Receipt,
} from "lucide-react";

export default function RegistrationSummary({
  registration,
  onChange,
  onBack,
  onSubmit,
  isSubmitting = false,
  errors = {},
}) {
  const currentCatObj = CATEGORIES.find(
    (c) => c.id === registration.category
  );

  const isOlympiad = registration.category === "olympiads";

  const leader = registration.leader || {};
  const teamMembers = registration.teamMembers || [];

  const totalParticipants = isOlympiad
    ? 1
    : 1 + teamMembers.length;

  // Calculate registration fee without promo code/discount
  const feeDetails = calculateFee({
    category: registration.category,
    subcategories: registration.subcategories || [],
    teamSize: totalParticipants,
    discountPercent: 0,
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Receipt className="w-3.5 h-3.5 text-red-500" />
          STEP 04 OF 05
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Review{" "}
          <span className="gradient-text">
            Summary & Payment
          </span>
        </h2>

        <p className="text-slate-300 text-sm font-medium">
          Please verify your details and complete payment to confirm your FIRSO
          Rongpur registration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* =========================================================
            LEFT COLUMN
        ========================================================== */}
        <div className="lg:col-span-7 space-y-6">

          {/* Competition Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-red-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-red-500" />
                Competition Track
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-red-600/20 text-red-300 font-bold border border-red-500/30">
                {currentCatObj?.title}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">

              {/* Selected Event */}
              <div>
                <span className="text-slate-400 block mb-1 font-medium">
                  Selected Event / Subcategory:
                </span>

                <span className="font-extrabold text-white text-sm">
                  {isOlympiad
                    ? registration.subcategories?.length === 2
                      ? "Both Mathematics & Science Olympiads (Combo)"
                      : registration.subcategories
                          ?.map((s) =>
                            s === "math"
                              ? "Mathematics Olympiad"
                              : "Science Olympiad"
                          )
                          .join(", ") || "Olympiad"
                    : registration.competition || "N/A"}
                </span>
              </div>

              {/* Age Group */}
              <div>
                <span className="text-slate-400 block mb-1 font-medium">
                  Age Group:
                </span>

                <span className="font-extrabold text-white text-sm">
                  {registration.ageGroup || "N/A"}
                </span>
              </div>

              {/* Team Name */}
              {!isOlympiad && (
                <div>
                  <span className="text-slate-400 block mb-1 font-medium">
                    Team Name:
                  </span>

                  <span className="font-extrabold text-red-400 text-sm">
                    {registration.teamName || "Solo Leader"}
                  </span>
                </div>
              )}

              {/* Total Participants */}
              <div>
                <span className="text-slate-400 block mb-1 font-medium">
                  Total Participants:
                </span>

                <span className="font-extrabold text-white text-sm">
                  {totalParticipants} Participant(s)
                </span>
              </div>
            </div>
          </div>

          {/* Primary Participant Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-red-500/30 space-y-4 shadow-xl">
            <div className="border-b border-white/10 pb-3.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                <User className="w-4 h-4 text-red-500" />

                {isOlympiad
                  ? "Participant Details"
                  : "Team Leader Details"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">

              {/* Full Name */}
              <div>
                <span className="text-slate-400 block font-medium">
                  Full Name:
                </span>

                <span className="font-extrabold text-white text-sm">
                  {leader.name}
                </span>
              </div>

              {/* Email */}
              <div>
                <span className="text-slate-400 block font-medium">
                  Email Address:
                </span>

                <span className="font-semibold text-slate-200">
                  {leader.email}
                </span>
              </div>

              {/* Phone */}
              <div>
                <span className="text-slate-400 block font-medium">
                  Phone / WhatsApp:
                </span>

                <span className="font-semibold text-slate-200">
                  {leader.phone}
                </span>
              </div>

              {/* Institution */}
              <div>
                <span className="text-slate-400 block font-medium">
                  Educational Institution:
                </span>

                <span className="font-semibold text-slate-200">
                  {leader.institution} ({leader.class})
                </span>
              </div>

              {/* T-Shirt */}
              <div>
                <span className="text-slate-400 block font-medium">
                  T-Shirt Size:
                </span>

                <span className="font-extrabold text-red-400 text-sm">
                  {leader.tshirtSize}
                </span>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          {!isOlympiad && teamMembers.length > 0 && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-red-500/30 space-y-4 shadow-xl">

              <h3 className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2 border-b border-white/10 pb-3.5">
                <Users className="w-4 h-4 text-red-500" />

                Additional Team Members ({teamMembers.length})
              </h3>

              <div className="space-y-3">
                {teamMembers.map((m, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-3.5 rounded-2xl border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-white">
                        {idx + 2}. {m.name}
                      </div>

                      <div className="text-slate-400 font-medium">
                        {m.institution} ({m.class}) • {m.phone}
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-red-400 font-bold border border-red-500/30">
                      Size: {m.tshirtSize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referral Summary Card */}
          {registration.referralCodeEntered && (
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-red-500/40 bg-red-950/20 flex items-center justify-between text-xs">

              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-red-400" />

                <div>
                  <span className="text-slate-400 font-medium">
                    Referral Code:{" "}
                  </span>

                  <span className="font-black text-red-300 uppercase tracking-wider">
                    {registration.referralCodeEntered}
                  </span>
                </div>
              </div>

              <div className="text-slate-400 font-medium">
                Division:{" "}
                <span className="font-bold text-white">
                  Rongpur
                </span>
              </div>
            </div>
          )}

        </div>

        {/* =========================================================
            RIGHT COLUMN
        ========================================================== */}
        <div className="lg:col-span-5 space-y-6">

          {/* Registration Fee Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border-2 border-red-500/50 space-y-5 bg-gradient-to-b from-slate-950/95 via-slate-950 to-red-950/50 shadow-2xl shadow-red-600/25">

            <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-3.5 flex items-center justify-between">

              <span>Registration Fee</span>

              <span className="text-[10px] px-2.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-bold">
                RONGPUR RATE
              </span>
            </h3>

            <div className="space-y-3 text-xs">

              {/* Original Fee */}
              <div className="flex items-center justify-between text-slate-300">
                <span>
                  Registration Fee ({totalParticipants} Participant/s):
                </span>

                <span className="font-bold text-white text-sm">
                  {feeDetails.originalFee} BDT
                </span>
              </div>

              {/* Payable Amount */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">

                <span className="text-sm font-black uppercase text-white">
                  Payable Amount:
                </span>

                <span className="text-3xl font-black text-red-500 gradient-text">
                  {feeDetails.fee} BDT
                </span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <PaymentSection
            payment={registration.payment}
            onChange={(pay) =>
              onChange({
                payment: pay,
              })
            }
            errors={errors}
          />
        </div>
      </div>

      {/* =========================================================
          ACTION BUTTONS
      ========================================================== */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm transition-all border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting Registration...
            </span>
          ) : (
            <>
              <span>Submit Registration</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}