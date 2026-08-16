/**
 * Formats the registration state into the exact Firestore document schema requested by the user
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

  // Stored referCode (e.g. "RONGPUR-UA TAHSIN")
  const enteredReferral = (registration.referralCodeEntered || "").trim().toUpperCase();
  const referCode = registration.referralCode || (enteredReferral ? `RONGPUR-UA ${enteredReferral}` : "");

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
    referralCodeEntered: registration.referralCodeEntered || "",
    referralDivision: registration.referralDivision || "Rongpur",
    appliedPromoCode: registration.promo?.appliedPromoCode || "",
    discountPercent: Number(registration.promo?.discountPercent) || 0,
    originalFee: calculatedFeeObj.originalFee,
    fee: calculatedFeeObj.fee,
    paymentMethod: registration.payment?.method || "",
    paymentNumber: registration.payment?.senderMobile || "",
    transactionId: registration.payment?.transactionId || "",
    paymentVerified: false
  };
}
