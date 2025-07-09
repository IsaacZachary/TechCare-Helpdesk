// utils/email.js
const nodemailer = require('nodemailer');

/**
 * Send email (stub for future implementation)
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 */
exports.sendEmail = async (to, subject, text) => {
  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Send mail (stub)
  // await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
  // For now, just log
  console.log(`[EMAIL STUB] To: ${to}, Subject: ${subject}, Text: ${text}`);
}; 