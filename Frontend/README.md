# NexpreneurAI

An AI-powered platform that helps beginners launch and grow their businesses — no technical or English skills required. Users describe their idea, and the platform generates a business plan, product descriptions, pricing suggestions, and social media content, all guided step by step.

---

## Features

- **Language Selection** — choose your preferred language on first visit
- **AI Business Plan Generator** — enter your idea and receive a personalized business plan
- **AI Product Description Generator** — generate ready-to-use product listings
- **Dashboard** — central hub to access all AI tools
- **My Progress** — track completed AI tasks and activity over time
- **Help & Support** — FAQs, trouble-shooting guide, and contact details
- **Authentication** — email/password sign-up and Google OAuth sign-in
- **Protected Routes** — dashboard and AI tools require a logged-in account

---

## Tech Stack

### Frontend
| Tool | Version |
|------|---------|
| React | 18 |
| React Router DOM | 6 |
| Vite | 5 |
| Tailwind CSS | 3 |

### Backend
| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| Express | 4 |
| MongoDB + Mongoose | 8 |
| Passport.js (Google OAuth 2.0) | 0.7 |
| JSON Web Tokens | 9 |
| bcryptjs | 2 |

---

## Project Structure

```
areej-project/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── DashboardNavbar/
│   │   ├── Footer/
│   │   ├── Logo/
│   │   ├── AuthLeftPanel/
│   │   └── ProtectedRoute/
│   ├── pages/
│   │   ├── LanguageSelection/
│   │   ├── Home/
│   │   ├── SignIn/
│   │   ├── SignUp/
│   │   ├── Dashboard/
│   │   ├── BusinessPlan/
│   │   ├── ProductDescription/
│   │   ├── MyProgress/
│   │   ├── About/
│   │   ├── HelpSupport/
│   │   └── AuthCallback/
│   ├── constants/
│   │   ├── colors.js
│   │   └── homeData.js
│   └── services/
│       └── api.js
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js
│       │   └── passport.js
│       ├── middleware/
│       │   └── authMiddleware.js
│       ├── models/
│       │   └── User.js
│       └── routes/
│           ├── authRoutes.js
│           └── userRoutes.js
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com/))
- OpenAI API key

---

### 1. Clone the repository

```bash
git clone <repository-url>
cd areej-project
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

**.env variables:**

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/areej_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

FRONTEND_URL=http://localhost:5173

OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend setup

Open a new terminal in the project root:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> The Vite dev server proxies all `/api` requests to `http://localhost:5000` automatically — no CORS configuration needed during development.

---

## Available Scripts

### Frontend (root)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Backend (`/backend`)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start without auto-reload |

---

## Pages & Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Language Selection | No |
| `/home` | Home | No |
| `/sign-in` | Sign In | No |
| `/sign-up` | Sign Up | No |
| `/about` | About | No |
| `/help-support` | Help & Support | No |
| `/dashboard` | Dashboard | Yes |
| `/business-plan` | Business Plan Input | Yes |
| `/business-plan/result` | Business Plan Result | Yes |
| `/product-description` | Product Description Input | Yes |
| `/product-description/result` | Product Description Result | Yes |
| `/my-progress` | My Progress | Yes |

---

## Contact

**NexpreneurAI Ltd** — Reg. No. 17256706  
Email: info@nexpreneuai.co.uk  
Phone: +44 7448 781708  
LinkedIn: linkedin.com/company/nexpreneuai  
Registered Office: Worcester, United Kingdom

---

© 2026 NexpreneurAI. All Rights Reserved.
