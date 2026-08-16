import React from "react";
import { Check, Award, User, Users, CreditCard, CheckCircle2 } from "lucide-react";

export default function ProgressStepper({ currentStep, isOlympiad = false, onStepClick }) {
  const steps = [
    { number: 1, id: "category", label: "Category", icon: Award },
    { number: 2, id: "participant", label: "Participant", icon: User },
    {
      number: 3,
      id: "team",
      label: "Team",
      icon: Users,
      skipped: isOlympiad,
      skippedLabel: "Solo"
    },
    { number: 4, id: "payment", label: "Payment", icon: CreditCard },
    { number: 5, id: "complete", label: "Confirmation", icon: CheckCircle2 }
  ];

  // Calculate progress bar percentage
  const activeIndex = Math.max(0, currentStep - 1);
  const progressPercent = (activeIndex / (steps.length - 1)) * 100;

  return (
    <nav aria-label="Registration Progress" className="w-full max-w-4xl mx-auto mb-10 px-2 sm:px-4">
      <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-red-500/30 relative overflow-hidden shadow-2xl">
        
        {/* Progress Stepper Container */}
        <div className="relative z-10 max-w-3xl mx-auto">
          
          {/* Background Track Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-slate-900 rounded-full -translate-y-1/2 z-0 border border-white/5" />

          {/* Animated Glowing Fill Line */}
          <div
            className="absolute top-5 left-6 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-500 rounded-full -translate-y-1/2 z-0 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(239,68,68,0.8)]"
            style={{ width: `calc(${progressPercent}% * 0.88)` }}
          />

          {/* Connected Node Circles */}
          <div className="flex items-start justify-between relative z-10">
            {steps.map((step) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;
              const isSkipped = step.skipped;
              const isClickable = step.number < currentStep && !isSkipped;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => {
                    if (isClickable && onStepClick) {
                      onStepClick(step.number);
                    }
                  }}
                >
                  {/* Circle Node */}
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/50 ring-4 ring-red-500/30 scale-110"
                        : isCompleted
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30 group-hover:scale-105"
                        : isSkipped
                        ? "bg-slate-900 text-slate-600 border border-slate-800 opacity-60"
                        : "bg-[#0A0A0C] text-slate-500 border border-red-500/20 group-hover:border-red-500/50"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  {/* Clean Single Label */}
                  <div className="mt-2.5 text-center">
                    <span
                      className={`text-[11px] sm:text-xs font-bold tracking-tight block transition-colors ${
                        isActive
                          ? "text-red-400 font-extrabold"
                          : isCompleted
                          ? "text-slate-200"
                          : isSkipped
                          ? "text-slate-600 italic"
                          : "text-slate-400"
                      }`}
                    >
                      {isSkipped ? `03 ${step.skippedLabel}` : `0${step.number} ${step.label}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </nav>
  );
}
