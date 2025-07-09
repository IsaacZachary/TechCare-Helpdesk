# TechCare Africa Helpdesk Backend 🚀

A production-ready, modular Node.js backend for the **TechCare Africa Helpdesk** — a full-stack ticketing system designed for IT teams, institutions, and support desks across Africa.

---

## 🛠 Tech Stack

| Feature             | Stack / Tool                              |
|---------------------|--------------------------------------------|
| Server Framework    | Node.js + Express                         |
| ORM                 | Sequelize (Supabase-compatible PostgreSQL) |
| Auth                | JWT, bcrypt, Role-based (user, admin, superadmin) |
| Email               | Nodemailer (stubbed placeholder)          |
| Realtime Support    | Socket.IO (ready-to-hook)                 |
| Validation & Util   | Middleware, UUIDs, Timestamp tracking     |
| Documentation       | JSDoc-style + `/docs/api-specs.md`        |

---

## 📦 Project Setup

1. **Clone the project & move to backend folder**

   ```bash
   git clone https://github.com/izach-tech/techcare-helpdesk.git
   cd techcare-helpdesk/server
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables

bash
Copy
Edit
cp .env.example .env
Fill in database credentials, JWT secret, etc.

Start development server

bash
Copy
Edit
npm run dev
# or
npm start
🔐 Authentication
Register → POST /api/auth/register

Login → POST /api/auth/login

JWT-based Auth → Include token in Authorization: Bearer <token>

Middleware:

protect: Auth-required routes

authorize: Role-restricted access

🎫 Ticketing Endpoints
Action	Endpoint
Create Ticket	POST /api/tickets
Get All Tickets	GET /api/tickets
Get Ticket by ID	GET /api/tickets/:id
Update Ticket	PATCH /api/tickets/:id
Delete Ticket	DELETE /api/tickets/:id (admin)
Comment on Ticket	POST /api/tickets/:id/comments

Query Parameters (Optional):

?status=open&priority=high&page=1&limit=10&search=password

👥 User Management
GET /api/users → List users (admin/superadmin only)

PATCH /api/users/:id/role → Change user role (superadmin only)

User activity log → Placeholder in controllers/userController.js

📩 Email Notifications
Nodemailer stub logs emails instead of sending

Located in: utils/email.js

TODO: Hook into ticket creation/update for real alerts

💬 Live Chat (Realtime Prep)
Socket.IO placeholder in index.js

Ready for chatbot or live chat integration

⚙️ Environment Variables
In .env.example:

env
Copy
Edit
PORT=5000
DB_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_secret_here
EMAIL_USER=your_email
EMAIL_PASS=your_password
🧪 Testing & Docs
Use Postman or Thunder Client to test routes

Refer to:

docs/api-specs.md → API blueprint

db/supabase_schema.sql → Database schema

docs/uml-diagrams/ → Class, sequence, use-case diagrams

🧱 Folder Structure
csharp
Copy
Edit
server/
├── config/            # DB and Sequelize setup
├── controllers/       # Route logic
├── middleware/        # Auth, error handlers
├── models/            # Sequelize models (User, Ticket, Comment)
├── routes/            # API route files
├── utils/             # Helpers (email stub, validators)
├── index.js           # Express app entry
├── .env.example
└── README.md
📄 License

MIT © @izach