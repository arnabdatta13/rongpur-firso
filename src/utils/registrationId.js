/**
 * Generates a unique registration ID in format: FIRSO-RNG-2026-XXXXX
 */
export function generateRegistrationId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // clear readable alphanumeric chars (excluding O, 0, 1, I)
  let randomPart = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars.charAt(randomIndex);
  }
  return `FIRSO-RNG-2026-${randomPart}`;
}
