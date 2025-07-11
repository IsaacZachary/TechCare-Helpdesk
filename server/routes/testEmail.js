// TechCare Helpdesk Backend
// © 2025 Isaac Zachary. All rights reserved.
"use strict";
const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/email");

// GET /api/test-email
router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "isaaczachary18@gmail.com",
      subject: "✅ TechCare Email Test via Brevo",
      text: "This is a test email sent from TechCare Helpdesk using Brevo SMTP."
    });
    res.json({ success: true, message: "Test email sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send test email.", error: error.message });
  }
});

module.exports = router; 