/**
 * Form validation helper routines for registration wizard
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\d{11}$/;

export function validateStep1(registration) {
  const errors = {};

  if (!registration.category) {
    errors.category = "Please select a competition category.";
    return { isValid: false, errors };
  }

  if (registration.category === "olympiads") {
    if (!registration.subcategories || registration.subcategories.length === 0) {
      errors.subcategories = "Please select Mathematics, Science, or Both Olympiads.";
    }
  } else if (registration.category === "entrepreneurship") {
    if (!registration.competition) {
      errors.competition = "Please select an entrepreneurship subcategory.";
    }
  } else if (registration.category === "robotics") {
    if (!registration.competition) {
      errors.competition = "Please select a robotics event.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateStep2(registration) {
  const errors = {};
  const leader = registration.leader || {};

  if (!leader.name || !leader.name.trim()) {
    errors.name = "Full Name is required.";
  }

  if (!leader.email || !leader.email.trim()) {
    errors.email = "Email Address is required.";
  } else if (!EMAIL_REGEX.test(leader.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const cleanPhone = (leader.phone || "").trim().replace(/\D/g, "");
  if (!leader.phone || !leader.phone.trim()) {
    errors.phone = "Phone / WhatsApp number is required.";
  } else if (cleanPhone.length !== 11) {
    errors.phone = "Phone number must contain exactly 11 digits.";
  }

  if (!leader.institution || !leader.institution.trim()) {
    errors.institution = "Educational Institution is required.";
  }

  if (!leader.class || !leader.class.trim()) {
    errors.class = "Class / Grade / Semester is required.";
  }

  if (!leader.tshirtSize) {
    errors.tshirtSize = "T-Shirt Size is required.";
  }

  if (!registration.ageGroup) {
    errors.ageGroup = "Age Group selection is required.";
  }

  if (registration.category !== "olympiads") {
    if (!registration.teamName || !registration.teamName.trim()) {
      errors.teamName = "Team Name is required for non-Olympiad competitions.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateStep3(registration) {
  const errors = {};

  // Olympiads skip team members
  if (registration.category === "olympiads") {
    return { isValid: true, errors: {} };
  }

  const members = registration.teamMembers || [];

  members.forEach((member, index) => {
    const memberErrors = {};

    if (!member.name || !member.name.trim()) {
      memberErrors.name = "Name is required.";
    }

    if (!member.email || !member.email.trim()) {
      memberErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(member.email.trim())) {
      memberErrors.email = "Invalid email format.";
    }

    const cleanPhone = (member.phone || "").trim().replace(/\D/g, "");
    if (!member.phone || !member.phone.trim()) {
      memberErrors.phone = "Phone is required.";
    } else if (cleanPhone.length !== 11) {
      memberErrors.phone = "Must be 11 digits.";
    }

    if (!member.institution || !member.institution.trim()) {
      memberErrors.institution = "Institution required.";
    }

    if (!member.class || !member.class.trim()) {
      memberErrors.class = "Class required.";
    }

    if (!member.tshirtSize) {
      memberErrors.tshirtSize = "T-shirt size required.";
    }

    if (Object.keys(memberErrors).length > 0) {
      errors[`member_${index}`] = memberErrors;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateStep4(payment) {
  const errors = {};
  const pay = payment || {};

  if (!pay.method) {
    errors.method = "Please select bKash or Nagad as your payment method.";
  }

  const cleanSender = (pay.senderMobile || "").trim().replace(/\D/g, "");
  if (!pay.senderMobile || !pay.senderMobile.trim()) {
    errors.senderMobile = "Sender mobile number is required.";
  } else if (cleanSender.length !== 11) {
    errors.senderMobile = "Sender mobile number must be exactly 11 digits.";
  }

  if (!pay.transactionId || !pay.transactionId.trim()) {
    errors.transactionId = "Transaction ID is required.";
  } else if (pay.transactionId.trim().length < 6) {
    errors.transactionId = "Transaction ID must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
