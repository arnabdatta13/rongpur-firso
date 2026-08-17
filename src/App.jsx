import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseInitialized } from "./firebase/config";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";

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
  const [activeTab, setActiveTab] = useState("home");
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

    const formattedDoc = formatFirestoreDocument(registration, newRegId, calculatedFeeObj);

    let isSavedLocally = false;

    if (firebaseInitialized && db) {
      try {
        const regCollectionRef = collection(db, "registrations");
        await addDoc(regCollectionRef, {
          ...formattedDoc,
          createdAt: serverTimestamp()
        });
        console.log("🔥 Registration saved to Firestore:", newRegId);
      } catch (error) {
        console.warn("⚠️ Firestore write failed. Gracefully executing LocalStorage fallback.", error);
        isSavedLocally = true;
      }
    } else {
      isSavedLocally = true;
    }

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

  const handleNavigate = (targetTab) => {
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-red-600 selection:text-white font-sans cyber-grid">
      {/* Navbar Header */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Content Pages */}
      <div className="pt-6">
        {activeTab === "home" ? (
          <HomePage onNavigate={handleNavigate} />
        ) : (
          <RegistrationPage
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            registration={registration}
            updateRegistration={updateRegistration}
            errors={errors}
            isSubmitting={isSubmitting}
            handleStep1Next={handleStep1Next}
            handleStep2Next={handleStep2Next}
            handleStep3Next={handleStep3Next}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
