import React from "react";
import { TSHIRT_SIZES } from "../config/constants";
import { User, Mail, Phone, School, GraduationCap, Shirt, Plus, Trash2, ArrowRight, ArrowLeft, Users } from "lucide-react";

export default function TeamMembers({
  registration,
  onChange,
  onNext,
  onBack,
  errors = {}
}) {
  const members = registration.teamMembers || [];
  const maxMembers = 4; // 1 Leader + 4 members = 5 max

  const handleAddMember = () => {
    if (members.length >= maxMembers) return;
    const newMember = {
      name: "",
      email: "",
      phone: "",
      institution: "",
      class: "",
      tshirtSize: ""
    };
    onChange({ teamMembers: [...members, newMember] });
  };

  const handleRemoveMember = (index) => {
    const updated = members.filter((_, idx) => idx !== index);
    onChange({ teamMembers: updated });
  };

  const handleMemberChange = (index, field, value) => {
    const updated = members.map((m, idx) => {
      if (idx === index) {
        return { ...m, [field]: value };
      }
      return m;
    });
    onChange({ teamMembers: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Step 3: <span className="gradient-text">Team Members</span> Details
        </h2>
        <p className="text-slate-400 text-sm">
          Team: <span className="text-white font-bold">{registration.teamName || "Your Team"}</span> (Leader + Up to 4 additional members. Max 5 total).
        </p>
      </div>

      {/* Leader Summary Box */}
      <div className="glass-panel p-4 rounded-xl border border-red-500/40 flex items-center justify-between bg-red-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-red-400">Team Leader (Primary Registrant)</div>
            <div className="text-sm font-bold text-white">{registration.leader?.name || "Leader"}</div>
          </div>
        </div>
        <div className="text-xs text-slate-400">T-Shirt: {registration.leader?.tshirtSize || "N/A"}</div>
      </div>

      {/* Member Forms */}
      <div className="space-y-6">
        {members.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center border border-white/10 space-y-3">
            <Users className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Participating Solo or Adding Members?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You are currently registered as a solo team leader (1 participant). Click below to add up to 4 extra team members.
            </p>
          </div>
        ) : (
          members.map((member, idx) => {
            const memberError = errors[`member_${idx}`] || {};

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-red-500/30 relative space-y-6 animate-fadeIn"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center">
                      {idx + 2}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Team Member #{idx + 1}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Member Name"
                      value={member.name || ""}
                      onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                    />
                    {memberError.name && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.name}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-red-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. member@example.com"
                      value={member.email || ""}
                      onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                    />
                    {memberError.email && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-red-400" />
                      Phone (11 Digits) *
                    </label>
                    <input
                      type="tel"
                      maxLength={11}
                      placeholder="e.g. 01800000000"
                      value={member.phone || ""}
                      onChange={(e) => handleMemberChange(idx, "phone", e.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                    />
                    {memberError.phone && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.phone}</p>}
                  </div>

                  {/* Institution */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-red-400" />
                      Institution *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Institution Name"
                      value={member.institution || ""}
                      onChange={(e) => handleMemberChange(idx, "institution", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                    />
                    {memberError.institution && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.institution}</p>}
                  </div>

                  {/* Class */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                      Class / Semester *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Class 9 / Semester 2"
                      value={member.class || ""}
                      onChange={(e) => handleMemberChange(idx, "class", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                    />
                    {memberError.class && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.class}</p>}
                  </div>

                  {/* T-Shirt Size */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Shirt className="w-3.5 h-3.5 text-red-400" />
                      T-Shirt Size *
                    </label>
                    <select
                      value={member.tshirtSize || ""}
                      onChange={(e) => handleMemberChange(idx, "tshirtSize", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium bg-[#0A0A0C] text-white"
                    >
                      <option value="">-- Select T-Shirt Size --</option>
                      {TSHIRT_SIZES.map((sz) => (
                        <option key={sz.value} value={sz.value}>
                          {sz.label}
                        </option>
                      ))}
                    </select>
                    {memberError.tshirtSize && <p className="text-xs text-red-400 font-medium">⚠️ {memberError.tshirtSize}</p>}
                  </div>

                </div>
              </div>
            );
          })
        )}

        {/* Add Member Button */}
        {members.length < maxMembers && (
          <button
            type="button"
            onClick={handleAddMember}
            className="w-full py-4 rounded-xl border-2 border-dashed border-red-500/40 hover:border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>+ Add Team Member ({members.length + 1} of 5 Total Participants)</span>
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Continue to Summary & Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
