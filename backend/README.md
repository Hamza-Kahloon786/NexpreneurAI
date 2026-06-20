# Areej Backend — Node.js + Express + MongoDB

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` file
```bash
cp .env.example .env
```
Fill in your values:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — any random secret string (use a password generator)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` — from Google Cloud Console

### 3. Google OAuth Setup
1. Go to https://console.cloud.google.com
2. Create a project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (Web application)
4. Add Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
5. Copy Client ID and Secret to `.env`

### 4. Run the server
```bash
npm run dev      # development (nodemon)
npm start        # production
```

Server runs at `http://localhost:5000`

## API Endpoints

| Method | Route                     | Auth     | Description          |
|--------|---------------------------|----------|----------------------|
| POST   | /api/auth/register        | Public   | Create account       |
| POST   | /api/auth/login           | Public   | Sign in              |
| GET    | /api/auth/me              | Bearer   | Get current user     |
| GET    | /api/auth/google          | Public   | Google OAuth start   |
| GET    | /api/auth/google/callback | Public   | Google OAuth return  |
| GET    | /api/user/profile         | Bearer   | Get profile          |
| PUT    | /api/user/profile         | Bearer   | Update profile       |
