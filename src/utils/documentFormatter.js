/**
 * Formats the registration state into the exact Firestore document schema requested by the user.
 * If refer code is left blank, referCode defaults to "Rongpur-UA" in the database.
 * If no promo code is applied, appliedPromoCode is saved as "" (empty string) and discountPercent is 0.
 */
export function formatFirestoreDocument(registration, newRegId, calculatedFeeObj) {
  const leader = registration.leader || {};
  const teamMembers = registration.teamMembers || [];
  const isOlympiad = registration.category === "olympiads";
  const totalMembers = isOlympiad ? 1 : 1 + teamMembers.length;

  // Selected Olympiads Array
  const selectedOlympiads = [];
  if (isOlympiad) {
    if (registration.subcategories?.includes("math")) {
      selectedOlympiads.push("Mathematics Olympiad");
    }
    if (registration.subcategories?.includes("science")) {
      selectedOlympiads.push("Science Olympiad");
    }
  }

  // Subcategory string
  let subcategory = "";
  if (isOlympiad) {
    subcategory = selectedOlympiads.join(", ");
  } else {
    subcategory = registration.competition || "";
  }

  // Registration Type string
  let registrationType = "olympiad";
  if (registration.category === "robotics") {
    registrationType = "robotics";
  } else if (registration.category === "entrepreneurship") {
    registrationType = "entrepreneurship";
  }

  // Stored referCode logic:
  // If participant typed/selected a referral code, map to "RONGPUR-UA <CODE>" (or resolved storedCode).
  // If participant left referral code blank, ALWAYS save "Rongpur-UA" in database.
  const enteredReferral = (registration.referralCodeEntered || "").trim();
  let referCode = registration.referralCode;

  if (!referCode || referCode.trim() === "") {
    if (enteredReferral) {
      referCode = `RONGPUR-UA ${enteredReferral.toUpperCase()}`;
    } else {
      referCode = "Rongpur-UA";
    }
  }

  // Applied Promo Code logic:
  // If no promo code was applied, save as "" (empty string) and discountPercent: 0
  const appliedPromo = (registration.promo?.appliedPromoCode || "").trim();
  const discountVal = appliedPromo ? (Number(registration.promo?.discountPercent) || 0) : 0;

  return {
    registrationId: newRegId,
    studentName: leader.name || "",
    leaderName: leader.name || "",
    email: leader.email || "",
    phone: leader.phone || "",
    institution: leader.institution || "",
    class: leader.class || "",
    ageCategory: registration.ageGroup || "",
    tShirtSize: leader.tshirtSize || "",
    teamName: isOlympiad ? "" : registration.teamName || "",
    category: isOlympiad
      ? "Olympiads"
      : registration.category === "entrepreneurship"
      ? "Entrepreneurship & Projects"
      : "Direct Robotics Categories",
    registrationType,
    subcategory,
    selectedOlympiads,
    totalMembers,
    members: teamMembers.map((m) => ({
      name: m.name || "",
      email: m.email || "",
      phone: m.phone || "",
      institution: m.institution || "",
      class: m.class || "",
      tShirtSize: m.tshirtSize || ""
    })),
    referCode,
    referralCodeEntered: enteredReferral,
    referralDivision: registration.referralDivision || "Rongpur",
    appliedPromoCode: appliedPromo,
    discountPercent: discountVal,
    originalFee: calculatedFeeObj.originalFee,
    fee: calculatedFeeObj.fee,
    paymentMethod: registration.payment?.method || "",
    paymentNumber: registration.payment?.senderMobile || "",
    transactionId: registration.payment?.transactionId || "",
    paymentVerified: false
  };
}
