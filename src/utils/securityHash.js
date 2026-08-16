/**
 * Generates a Base64 encoded verification security hash for the delegate badge
 * @param {string} registrationId
 * @param {string} email
 * @param {string} division
 * @returns {string} Base64 verification hash string
 */
export function generateSecurityHash(registrationId = "", email = "", division = "Rongpur") {
  const timestamp = new Date().toISOString();
  const rawData = `${registrationId}|${email.trim().toLowerCase()}|${division}|${timestamp}`;
  try {
    return btoa(rawData);
  } catch {
    // Fallback if btoa fails due to unicode characters
    return btoa(encodeURIComponent(rawData));
  }
}
