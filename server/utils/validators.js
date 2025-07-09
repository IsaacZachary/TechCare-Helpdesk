// utils/validators.js
/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
exports.isValidEmail = (email) => {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
};

/**
 * Validate password strength (min 6 chars)
 * @param {string} password
 * @returns {boolean}
 */
exports.isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
}; 