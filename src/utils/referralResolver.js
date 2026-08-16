import { collection, query, where, getDocs } from "firebase/firestore";
import { db, firebaseInitialized } from "../firebase/config";
import { RONGPUR_REFERRAL_CODES } from "../data/referralCodes";

/**
 * Resolves participant-entered referral code to internal database referral value.
 * If blank, defaults storedCode to "Rongpur-UA".
 * If provided, maps to "RONGPUR-UA <CODE>".
 * 
 * @param {string} inputCode - Code typed by participant (e.g. "", "TAHSIN", "CA-TAHSIN")
 * @returns {Promise<{ isValid: boolean, publicCode: string, storedCode: string, division: string, error?: string }>}
 */
export async function resolveReferralCode(inputCode) {
  if (!inputCode || !inputCode.trim()) {
    return {
      isValid: true,
      publicCode: "",
      storedCode: "Rongpur-UA",
      division: "Rongpur"
    };
  }

  const cleanInput = inputCode.trim().toUpperCase();

  // 1. Check Firestore collection referral_codes if available
  if (firebaseInitialized && db) {
    try {
      const referralRef = collection(db, "referral_codes");
      const q = query(referralRef, where("publicCode", "==", cleanInput));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        if (docData.active !== false) {
          return {
            isValid: true,
            publicCode: docData.publicCode || cleanInput,
            storedCode: docData.storedCode || `RONGPUR-UA ${cleanInput}`,
            division: docData.division || "Rongpur"
          };
        }
      }
    } catch (err) {
      console.warn("Firestore referral lookup notice. Falling back to dynamic mapper.", err);
    }
  }

  // 2. Check local pre-configured mapping dictionary if matched
  if (RONGPUR_REFERRAL_CODES[cleanInput]) {
    const item = RONGPUR_REFERRAL_CODES[cleanInput];
    if (item.active !== false) {
      return {
        isValid: true,
        publicCode: item.publicCode,
        storedCode: item.storedCode,
        division: item.division || "Rongpur"
      };
    }
  }

  // 3. Any referral code entered maps to "RONGPUR-UA <CODE>" in DB
  return {
    isValid: true,
    publicCode: cleanInput,
    storedCode: `RONGPUR-UA ${cleanInput}`,
    division: "Rongpur"
  };
}
