import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseInitialized } from "./firebase/config";

import Header from "./components/Header";
import ProgressStepper from "./components/ProgressStepper";
import CategorySelection from "./components/CategorySelection";
import ParticipantForm from "./components/ParticipantForm";
import TeamMembers from "./components/TeamMembers";
import RegistrationSummary from "./components/RegistrationSummary";
import Confirmation from "./components/Confirmation";
import LoadingScreen from "./components/LoadingScreen";

import { validateStep1, validateStep2, validateStep3, validateStep4 } from "./utils/validation";
import { generateRegistrationId } from "./utils/registrationId";
import { calculateFee } from "./utils/feeCalculator";
import { formatFirestoreDocument } from "./utils/documentFormatter";

const INITIAL_REGISTRATION_STATE = {
  registrationId: "",
  division: "Rongpur",
  event: "FIRSO Bangladesh National Selection Round 2026",
  eventDate: "4 September 2026",
  venue: "United International University (UIU), Dhaka",
  category: "",
  competition: "",
  subcategories: [],
  ageGroup: "",
  teamName: "",
  leader: {
    name: "",
    email: "",
    phone: "",
    institution: "",
    class: "",
    tshirtSize: ""
  },
  teamMembers: [],
  referralCodeEntered: "",
  referralCode: "Rongpur-UA",
  referralDivision: "Rongpur",
  payment: {
    method: "bKash",
    senderMobile: "",
    transactionId: ""
  },
  promo: {
    appliedPromoCode: "",
    discountPercent: 0,
    originalFee: 0,
    fee: 0
  },
  status: "Pending Verification"
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [registration, setRegistration] = useState(() => {
    try {
      const savedDraft = localStorage.getItem("firso_rongpur_draft");
      return savedDraft ? JSON.parse(savedDraft) : INITIAL_REGISTRATION_STATE;
    } catch {
      return INITIAL_REGISTRATION_STATE;
    }
  });

  const isOlympiad = registration.category === "olympiads";

  useEffect(() => {
    try {
      if (currentStep < 5) {
        localStorage.setItem("firso_rongpur_draft", JSON.stringify(registration));
      }
    } catch (e) {
      console.warn("Draft auto-save notice:", e);
    }
  }, [registration, currentStep]);

  const updateRegistration = (updates) => {
    setRegistration((prev) => ({
      ...prev,
      ...updates
    }));
    setErrors({});
  };

  const handleStep1Next = () => {
    const val = validateStep1(registration);
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }
    setErrors({});
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Next = () => {
    const val = validateStep2(registration);
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }
    setErrors({});
    if (isOlympiad) {
      setCurrentStep(4);
    } else {
      setCurrentStep(3);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep3Next = () => {
    const val = validateStep3(registration);
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }
    setErrors({});
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const valPay = validateStep4(registration.payment);
    if (!valPay.isValid) {
      setErrors(valPay.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const newRegId = generateRegistrationId();
    const totalParticipants = isOlympiad ? 1 : 1 + (registration.teamMembers?.length || 0);

    const calculatedFeeObj = calculateFee({
      category: registration.category,
      subcategories: registration.subcategories || [],
      teamSize: totalParticipants,
      discountPercent: registration.promo?.discountPercent || 0
    });

    // Format exact Firestore document schema
    const formattedDoc = formatFirestoreDocument(registration, newRegId, calculatedFeeObj);

    let isSavedLocally = false;

    // 1. Write to Firestore collection registrations
    if (firebaseInitialized && db) {
      try {
        const regCollectionRef = collection(db, "registrations");
        await addDoc(regCollectionRef, {
          ...formattedDoc,
          createdAt: serverTimestamp()
        });
        console.log("🔥 Registration successfully saved to Firestore with exact schema:", newRegId);
      } catch (error) {
        console.warn("⚠️ Firestore write failed. Gracefully executing LocalStorage fallback.", error);
        isSavedLocally = true;
      }
    } else {
      isSavedLocally = true;
    }

    // 2. Persist in LocalStorage
    try {
      const existingListStr = localStorage.getItem("firso_rongpur_registrations");
      const existingList = existingListStr ? JSON.parse(existingListStr) : [];
      existingList.push({ ...formattedDoc, createdAt: new Date().toISOString(), isSavedLocally });
      localStorage.setItem("firso_rongpur_registrations", JSON.stringify(existingList));
      localStorage.removeItem("firso_rongpur_draft");
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    setRegistration({
      ...registration,
      ...formattedDoc,
      isSavedLocally
    });

    setIsSubmitting(false);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    localStorage.removeItem("firso_rongpur_draft");
    setRegistration(INITIAL_REGISTRATION_STATE);
    setCurrentStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-red-600 selection:text-white font-sans pb-16">
      {/* Background Red Neon Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-rose-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-4">
          <ProgressStepper
            currentStep={currentStep}
            isOlympiad={isOlympiad}
            onStepClick={(stepNum) => setCurrentStep(stepNum)}
          />

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
        </main>

        {/* Footer Branding */}
        <footer className="mt-16 text-center text-xs text-slate-500 space-y-1 no-print">
          <div>Fibonacci International Robot & STEM Olympiad (FIRSO) 2026 • Rongpur Division Campaign</div>
          <div>Venue: United International University (UIU), Dhaka • 4 September 2026</div>
        </footer>
      </div>
    </div>
  );
}
