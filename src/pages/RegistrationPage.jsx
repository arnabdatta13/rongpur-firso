import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategorySelection from "../components/CategorySelection";
import ParticipantForm from "../components/ParticipantForm";
import TeamMembers from "../components/TeamMembers";
import RegistrationSummary from "../components/RegistrationSummary";
import Confirmation from "../components/Confirmation";
import LoadingScreen from "../components/LoadingScreen";

export default function RegistrationPage({
  currentStep,
  setCurrentStep,
  registration,
  updateRegistration,
  errors,
  isSubmitting,
  handleStep1Next,
  handleStep2Next,
  handleStep3Next,
  handleSubmit,
  handleReset
}) {
  const isOlympiad = registration.category === "olympiads";

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto px-4 pt-4">
      {isSubmitting ? (
        <LoadingScreen message="Submitting your FIRSO 2026 Registration..." />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {currentStep === 1 && (
              <CategorySelection
                registration={registration}
                onChange={updateRegistration}
                onNext={handleStep1Next}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <ParticipantForm
                registration={registration}
                onChange={updateRegistration}
                onNext={handleStep2Next}
                onBack={() => setCurrentStep(1)}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <TeamMembers
                registration={registration}
                onChange={updateRegistration}
                onNext={handleStep3Next}
                onBack={() => setCurrentStep(2)}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <RegistrationSummary
                registration={registration}
                onChange={updateRegistration}
                onBack={() => setCurrentStep(isOlympiad ? 2 : 3)}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            )}

            {currentStep === 5 && (
              <Confirmation
                registration={registration}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
