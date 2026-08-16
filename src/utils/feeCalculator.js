/**
 * Calculates raw fee and final fee with promo code discounts
 * @param {Object} params
 * @param {string} params.category - "olympiads", "entrepreneurship", "robotics"
 * @param {Array<string>} params.subcategories - list of selected subcategory IDs (e.g. ['math', 'science'])
 * @param {number} params.teamSize - total team members including leader (min 1, max 5)
 * @param {number} params.discountPercent - percentage discount (0 to 100)
 */
export function calculateFee({ category, subcategories = [], teamSize = 1, discountPercent = 0 }) {
  let originalFee = 0;
  const safeTeamSize = Math.max(1, Math.min(5, Number(teamSize) || 1));

  if (category === "olympiads") {
    // Single: 500 BDT, Both: 800 BDT
    if (subcategories.length >= 2) {
      originalFee = 800; // Combo package
    } else if (subcategories.length === 1) {
      originalFee = 500;
    } else {
      originalFee = 0;
    }
  } else if (category === "entrepreneurship") {
    // 500 + ((teamSize - 1) * 500)
    originalFee = 500 + (safeTeamSize - 1) * 500;
  } else if (category === "robotics") {
    // 800 + ((teamSize - 1) * 400)
    originalFee = 800 + (safeTeamSize - 1) * 400;
  }

  const discountAmount = Math.round((originalFee * (Number(discountPercent) || 0)) / 100);
  const fee = Math.max(0, originalFee - discountAmount);

  return {
    originalFee,
    discountPercent: Number(discountPercent) || 0,
    discountAmount,
    fee
  };
}
