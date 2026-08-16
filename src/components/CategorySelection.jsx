import React from "react";
import { CATEGORIES } from "../data/categories";
import { Brain, Lightbulb, Bot, CheckCircle2, Sparkles, ArrowRight, Zap, Flame } from "lucide-react";

export default function CategorySelection({
  registration,
  onChange,
  onNext,
  errors = {}
}) {
  const iconMap = {
    Brain: Brain,
    Lightbulb: Lightbulb,
    Bot: Bot
  };

  const handleCategorySelect = (categoryId) => {
    const selectedCat = CATEGORIES.find((c) => c.id === categoryId);
    if (!selectedCat) return;

    onChange({
      category: categoryId,
      competition: "",
      subcategories: [],
      ageGroup: ""
    });
  };

  const handleOlympiadSubcategoryToggle = (subId) => {
    let currentSubs = [...(registration.subcategories || [])];
    if (subId === "both") {
      currentSubs = ["math", "science"];
    } else if (currentSubs.includes(subId)) {
      currentSubs = currentSubs.filter((id) => id !== subId);
    } else {
      currentSubs.push(subId);
    }
    onChange({ subcategories: currentSubs });
  };

  const handleSingleSubcategorySelect = (subName) => {
    onChange({ competition: subName });
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === registration.category);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Category Selection Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-red-500" />
          STEP 01 OF 05
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Select Your <span className="gradient-text">Competition Category</span>
        </h2>
        <p className="text-slate-300 text-sm">
          Choose a track to view eligible age groups, team sizes, and registration pricing.
        </p>
        {errors.category && (
          <div className="inline-block mt-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-semibold animate-pulse">
            ⚠️ {errors.category}
          </div>
        )}
      </div>

      {/* Main 3 Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const IconComp = iconMap[cat.icon] || Brain;
          const isSelected = registration.category === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`relative cursor-pointer rounded-3xl p-7 transition-all duration-300 glass-panel-hover border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-red-950/70 to-slate-950/90 border-red-500 shadow-2xl shadow-red-600/30 scale-[1.03]"
                  : "bg-slate-950/70 border-red-500/20 hover:border-red-500/50"
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/40 border border-red-400"
                      : "bg-slate-900 text-red-400 border border-red-500/30"
                  }`}
                >
                  <IconComp className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-600/15 text-red-300 border border-red-500/30">
                  {cat.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 mb-6">
                <h3 className="text-xl font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {cat.description}
                </p>
              </div>

              {/* Selection Status Indicator */}
              <div
                className={`mt-auto pt-4 border-t flex items-center justify-between text-xs font-bold ${
                  isSelected ? "border-red-500/40 text-red-400" : "border-white/10 text-slate-500"
                }`}
              >
                <span>{isSelected ? "✔ Selected Category" : "Click to select"}</span>
                <CheckCircle2
                  className={`w-5 h-5 transition-transform ${
                    isSelected ? "text-red-500 scale-125" : "text-slate-700"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Subcategory & Specific Event Selection Options */}
      {selectedCategoryObj && (
        <div className="glass-panel rounded-3xl p-6 sm:p-9 border-2 border-red-500/35 animate-fadeIn space-y-6">
          
          {/* OLYMPIADS SECTION */}
          {selectedCategoryObj.id === "olympiads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
                    <Brain className="w-6 h-6 text-red-500" />
                    Select Olympiad Subjects
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Solo participation only. Select Mathematics, Science, or get the Combo Package!
                  </p>
                </div>
                <span className="text-xs px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/40 font-bold">
                  Class 1-12 Eligible
                </span>
              </div>

              {/* Combo Package Banner */}
              <div
                onClick={() => handleOlympiadSubcategoryToggle("both")}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  registration.subcategories?.includes("math") && registration.subcategories?.includes("science")
                    ? "bg-gradient-to-r from-red-950 via-rose-950 to-amber-950 border-red-500 shadow-2xl shadow-red-600/35 scale-[1.01]"
                    : "bg-red-950/20 border-red-500/30 hover:border-red-400/60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-lg shadow-yellow-500/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white flex flex-wrap items-center gap-2.5">
                      Both Olympiads (Math + Science)
                      <span className="text-[11px] font-black uppercase px-3 py-0.5 rounded-full bg-yellow-400 text-slate-950 tracking-wider">
                        SAVE 200 BDT
                      </span>
                    </div>
                    <div className="text-xs text-amber-200 mt-1 font-medium">
                      Best value combo package for ambitious STEM participants
                    </div>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-xl font-black text-white">800 BDT</div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      registration.subcategories?.includes("math") && registration.subcategories?.includes("science")
                        ? "bg-red-600 border-red-400 text-white"
                        : "border-slate-600"
                    }`}
                  >
                    {registration.subcategories?.includes("math") && registration.subcategories?.includes("science") && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Individual Olympiad Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCategoryObj.subcategories.map((sub) => {
                  const isChecked = registration.subcategories?.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => handleOlympiadSubcategoryToggle(sub.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-red-950/60 border-red-500 text-white shadow-lg shadow-red-600/20"
                          : "bg-slate-950/60 border-white/10 hover:border-red-500/40 text-slate-300"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-base font-bold text-white">{sub.name}</div>
                        <div className="text-xs text-red-400 font-semibold">Fee: {sub.fee} BDT</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                          isChecked ? "bg-red-600 border-red-400 text-white" : "border-slate-700"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ENTREPRENEURSHIP SECTION */}
          {selectedCategoryObj.id === "entrepreneurship" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                  Select Entrepreneurship & Project Track
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Select your startup challenge or innovation domain. Pricing: 500 BDT Leader/Solo + 500 BDT each additional member.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategoryObj.subcategories.map((sub) => {
                  const isSelected = registration.competition === sub.name;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => handleSingleSubcategorySelect(sub.name)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-red-950/70 border-red-500 text-white shadow-lg shadow-red-600/25 scale-[1.02]"
                          : "bg-slate-950/60 border-white/10 hover:border-red-500/40 text-slate-300"
                      }`}
                    >
                      <div className="text-sm font-bold">{sub.name}</div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-red-600 border-red-400 text-white" : "border-slate-700"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DIRECT ROBOTICS SECTION */}
          {selectedCategoryObj.id === "robotics" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2.5">
                  <Bot className="w-6 h-6 text-red-500" />
                  Select Direct Robotics Event
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Direct event selection. Pricing: 800 BDT Leader/Solo + 400 BDT each additional team member.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategoryObj.events.map((evt) => {
                  const isSelected = registration.competition === evt.name;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => handleSingleSubcategorySelect(evt.name)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-red-950/70 border-red-500 text-white shadow-lg shadow-red-600/25 scale-[1.02]"
                          : "bg-slate-950/60 border-white/10 hover:border-red-500/40 text-slate-300"
                      }`}
                    >
                      <div className="text-sm font-bold">{evt.name}</div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-red-600 border-red-400 text-white" : "border-slate-700"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {errors.subcategories && (
            <div className="mt-4 text-xs font-semibold text-red-300 bg-red-500/20 p-3.5 rounded-xl border border-red-500/40">
              ⚠️ {errors.subcategories}
            </div>
          )}

          {errors.competition && (
            <div className="mt-4 text-xs font-semibold text-red-300 bg-red-500/20 p-3.5 rounded-xl border border-red-500/40">
              ⚠️ {errors.competition}
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Continue to Participant Details</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
