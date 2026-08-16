import { collection, query, where, getDocs } from "firebase/firestore";
import { db, firebaseInitialized } from "../firebase/config";
import { PROMO_CODES } from "../data/promoCodes";

/**
 * Resolves a promo code against Firestore promo_codes collection or local pre-configured promos
 * @param {string} inputCode
 * @returns {Promise<{ isValid: boolean, code: string, discountPercent: number, error?: string }>}
 */
export async function resolvePromoCode(inputCode) {
  if (!inputCode || !inputCode.trim()) {
    return {
      isValid: true,
      code: "",
      discountPercent: 0
    };
  }

  const cleanCode = inputCode.trim().toUpperCase();

  // Try Firestore lookup
  if (firebaseInitialized && db) {
    try {
      const promoRef = collection(db, "promo_codes");
      const q = query(promoRef, where("Code", "==", cleanCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const discountVal = Number(docData.Discount) || 0;
        return {
          isValid: true,
          code: docData.Code || cleanCode,
          discountPercent: discountVal
        };
      }
    } catch (err) {
      console.warn("Firestore promo lookup notice. Falling back to local promos.", err);
    }
  }

  // Fallback to local dataset
  if (PROMO_CODES[cleanCode]) {
    const item = PROMO_CODES[cleanCode];
    if (item.active !== false) {
      return {
        isValid: true,
        code: item.Code,
        discountPercent: Number(item.Discount) || 0
      };
    }
  }

  return {
    isValid: false,
    code: cleanCode,
    discountPercent: 0,
    error: "Invalid promo code. Code not found in database."
  };
}
