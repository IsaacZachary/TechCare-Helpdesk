# 🛠️ TechCare Helpdesk

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://reactjs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E.svg)](https://supabase.com)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/IsaacZachary/TechCare-Helpdesk)
[![GitHub last commit](https://img.shields.io/github/last-commit/IsaacZachary/TechCare-Helpdesk)](https://github.com/IsaacZachary/TechCare-Helpdesk/commits/main)
[![Issues](https://img.shields.io/github/issues/IsaacZachary/TechCare-Helpdesk)](https://github.com/IsaacZachary/TechCare-Helpdesk/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/IsaacZachary/TechCare-Helpdesk)](https://github.com/IsaacZachary/TechCare-Helpdesk/pulls)

> **AI-powered ticketing system** designed for African IT support teams and institutions — powered by Node.js, React, Supabase, and Socket.io.

---

## 🌍 Overview

TechCare Helpdesk empowers support teams to manage tickets, users, and real-time communications in a fast, clean interface — with Supabase cloud DB, React + Vite frontend, and Node.js backend.

<!-- Optional screenshot -->
<!-- ![TechCare Dashboard Preview](docs/demo-screenshot.png) -->

---

## 📁 Project Structure

```

TechCare-Helpdesk/
├── client/         # Frontend (React + Vite + Shadcn UI)
├── server/         # Backend (Node.js + Express + Sequelize)
├── db/             # Supabase schema SQL
├── docs/           # Diagrams, specs, architecture
├── .env.example    # Environment config template
└── README.md       # This file

````

---

## 🔧 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React, Vite, TypeScript, TailwindCSS, Shadcn UI |
| Backend    | Node.js, Express, Sequelize ORM |
| Database   | Supabase (PostgreSQL) |
| Auth       | Supabase Auth (JWT), bcrypt |
| Realtime   | Socket.io |
| Email      | Nodemailer |
| Dev Tools  | Cursor AI (backend), Lovable AI (frontend), Nodemon |

---

## ✅ Features Implemented

- 🔐 Authentication (register/login with JWT)
- 📬 Email support with Nodemailer
- 🎟️ Ticket submission and management
- 🧑‍💼 User roles (User, Admin, SuperAdmin)
- 📦 Supabase cloud-hosted PostgreSQL DB
- 📊 Modular dashboard for each role
- 🧠 AI integration-ready (chatbot, ticket classifier)
- 📡 Realtime support via Socket.io
- ☁️ DevOps-ready structure (Netlify + Render friendly)

---

## 🔜 Roadmap / To-Do

- [ ] 🎙️ AI Chatbot assistant (OpenAI / prompt-based)
- [ ] 📈 Analytics dashboard (charts on tickets, users, traffic)
- [ ] 📲 M-Pesa & Email ticket notifications
- [ ] 🧑‍💻 Dev CLI Assistant (manage helpdesk from terminal)
- [ ] 🌐 Multilingual support
- [ ] 📥 Export/Import ticket data (CSV, PDF)
- [ ] 🔐 Supabase RLS policies and advanced auth rules

---

## 🛠️ Setup Instructions

### Backend

```bash
cd server
cp ../.env.example .env     # Fill in your Supabase & SMTP credentials
npm install
npm run dev
````

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🙌 Contributing

We welcome contributions! Fork the repo and submit a pull request, or start a conversation in [GitHub Discussions](https://github.com/IsaacZachary/TechCare-Helpdesk/discussions) for ideas, bugs, or suggestions.

---

## 🧠 Built With Purpose

TechCare Helpdesk is more than just a project — it's a vision for accessible, African-first support tools powered by modern open-source tech.

> If you find this useful, consider leaving a ⭐️ or sharing with others who'd benefit.

---

## 🌍 License

This project is licensed under the [MIT License](LICENSE). Feel free to fork, extend, or contribute!

---