# TechCare Helpdesk – Backend

**Backend Tech:** Node.js, Express, PostgreSQL, Supabase, Brevo SMTP

---

## 🚀 How to Run Locally (Requires Permission)

1. **Clone the repository** (access by invitation only).
2. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in all required values (see below).
4. **Start the backend:**
   ```bash
   npm start
   ```

---

## 📧 Email Setup

- The backend uses Brevo SMTP for email notifications.
- Ensure your `.env` file includes:
  - `EMAIL_HOST` (e.g., smtp-relay.brevo.com)
  - `EMAIL_PORT`
  - `EMAIL_USER`
  - `EMAIL_PASS`

---

## ⚠️ Disclaimer

This software is proprietary. Unauthorized redistribution or usage is prohibited.

---

© 2025 Isaac Zachary. All rights reserved.