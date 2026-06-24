# ComplexionAI

**AI-powered skincare product analyzer.** Upload a photo of any ingredient label and receive a personalized safety rating — Safe, Caution, or Avoid — based on your unique skin profile.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_+_Auth-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini_2.0_Flash-4285F4?style=flat&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Overview

Skincare shopping is full of uncertainty. Ingredient labels are dense, scientific, and rarely explain whether a product is suitable *for you specifically* — someone with sensitive skin, fragrance allergies, or a history of breakouts.

ComplexionAI solves this with a two-step workflow: set your skin profile once, then photograph any product label. Gemini Vision reads every ingredient and returns a plain-English safety rating cross-referenced against your personal concerns and allergens.

---

## Features

- **AI Ingredient Analysis** — Gemini 2.0 Flash Vision extracts every ingredient from a product photo and evaluates it against your skin profile
- **Personalized Safety Ratings** — three-tier system (Safe / Caution / Avoid) with an explanation of flagged ingredients
- **Skin Profile** — stores your skin type, tone, concerns, and allergens; used to personalise every analysis
- **Routine Management** — build and view morning/evening skincare routines
- **Product Library** — manage your product collection
- **Secure Authentication** — Supabase Auth with JWT tokens and persistent sessions
- **Protected Data** — Row Level Security ensures users can only access their own data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Lucide React |
| Backend | Node.js, Express 5 (ESM) |
| AI | Google Gemini 2.0 Flash (Vision) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT) |
| File Handling | Multer (in-memory, never persisted to disk) |
| Rate Limiting | express-rate-limit |

---

## Architecture

```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│   React SPA     │  fetch  │   Express API         │  SDK    │  Google Gemini  │
│                 │ ──────► │   /api/scan           │ ──────► │  Vision AI      │
│  Supabase Auth  │         │   /api/profile        │         └─────────────────┘
│  (client-side)  │         │                       │
└─────────────────┘         │  JWT validation       │  SQL    ┌─────────────────┐
                            │  (supabaseAdmin)      │ ──────► │  Supabase       │
                            │                       │         │  PostgreSQL     │
                            │  Rate limiting        │         │  + Auth         │
                            │  File validation      │         └─────────────────┘
                            └──────────────────────┘
```

**Auth flow:** The frontend authenticates directly with Supabase and receives a JWT. Every API request includes this JWT as a `Bearer` token. The backend validates it server-side using the Supabase Admin SDK — the API never trusts the client.

**Data isolation:** PostgreSQL Row Level Security policies prevent any user from reading or modifying another user's profile, even if the backend were compromised.

**Image handling:** Uploaded images are held in memory by Multer and passed directly to Gemini as base64 inline data. They are never written to disk or stored anywhere.

---

## Screenshots

> *Screenshots coming soon — start the app locally to explore the UI.*

| Sign In | Dashboard | Product Analyzer |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

| Skin Profile | Routines | Products |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier is sufficient)
- A [Google AI Studio](https://aistudio.google.com) account (free tier is sufficient)

### 1. Clone the repository

```bash
git clone https://github.com/jarred-hub/complexionAI.git
cd complexionAI
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of [`backend/sql_supabase/initial_schema.sql`](backend/sql_supabase/initial_schema.sql)
3. Go to **Project Settings → API** and copy:
   - Project URL
   - Publishable key (`sb_publishable_...`)
   - Secret key (`sb_secret_...`)
4. Go to **Authentication → Providers** and ensure Email is enabled

### 3. Set up Google Gemini

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create an API key
3. Copy the key — you will use it as `GEMINI_API_KEY`

### 4. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
SUPABASE_SECRET_KEY=sb_secret_your_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Install dependencies:

```bash
npm install
```

### 5. Configure the frontend

```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
REACT_APP_API_URL=http://localhost:5000
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Run both servers in separate terminals:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key | `AQ.Ab8RN...` |
| `SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key | `sb_publishable_...` |
| `SUPABASE_SECRET_KEY` | Supabase service role key (server-only) | `sb_secret_...` |
| `PORT` | Port the API listens on | `5000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `REACT_APP_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `REACT_APP_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key (safe for frontend) | `sb_publishable_...` |
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000` |

> **Security note:** The `SUPABASE_SECRET_KEY` is only ever used server-side. It is never sent to the frontend. The publishable key is intentionally safe for client use and is restricted by Row Level Security policies.

---

## Usage Guide

1. **Sign up** at `/signup` with your email and password
2. **Complete your profile** at `/profile` — set your skin type, tone, main concerns, and any allergens or ingredients you want to avoid
3. **Analyze a product** — go to `/product-analyzer`, upload a clear photo of the ingredient list (back of the bottle), and click **Analyze Product**
4. **Read your result** — the AI returns a safety rating, a plain-English explanation, any matched concerns, and identified allergens from your profile
5. **Manage routines** — visit `/my-routine` to view your morning and evening routines or generate new ones
6. **Manage products** — visit `/products` to keep track of your product collection

---

## Project Structure

```
complexionAI/
├── backend/
│   ├── config/
│   │   ├── gemini.js          # Google Gemini SDK initialisation
│   │   └── supabase.js        # Supabase client (anon) + admin client
│   ├── controllers/
│   │   ├── product-scan.controller.js   # POST /api/scan
│   │   └── user-profile.controller.js  # GET/PUT /api/profile
│   ├── middleware/
│   │   └── auth.js            # JWT validation via Supabase Admin
│   ├── routes/
│   │   ├── product-scan.routes.js
│   │   └── user-profile.routes.js
│   ├── services/
│   │   ├── user.service.js    # Supabase DB queries for user profiles
│   │   └── vision.service.js  # Gemini Vision prompt + response parsing
│   ├── sql_supabase/
│   │   └── initial_schema.sql # Full DB schema with RLS policies
│   ├── utils/
│   │   └── handleError.js     # Centralised error handler
│   ├── .env.example
│   └── server.js              # Express app setup
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Layout/        # AppLayout, Sidebar, TodaysSchedule
│       │   └── UI/            # Button, Card, Input (reusable)
│       ├── contexts/
│       │   └── AuthContext.js # Global auth state via Supabase session
│       ├── lib/
│       │   ├── api.js         # Typed fetch wrappers for all API endpoints
│       │   └── supabase.js    # Supabase client initialisation
│       ├── pages/
│       │   ├── Dashboard.js
│       │   ├── MyRoutine.js
│       │   ├── Products.js
│       │   ├── ProductAnalyzer.js
│       │   ├── Profile.js
│       │   ├── SignIn.js
│       │   └── SignUp.js
│       ├── App.js             # Routing + auth guards
│       └── index.css          # Global design tokens + base styles
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Challenges & Learnings

**Migrating from OpenAI to Gemini Vision**
The original prototype was built around OpenAI's vision API. Switching to Google Gemini required understanding the `@google/genai` SDK's content structure — specifically the `inlineData` format for image payloads and using `responseMimeType: "application/json"` to get structured output reliably. Gemini's `gemini-2.0-flash` model proved fast and cost-effective for this use case.

**Supabase Auth on both client and server**
The challenge was avoiding a mismatch between client-side session state and server-side token validation. The solution was a clean separation: the frontend uses the Supabase JS SDK directly for auth state (via `onAuthStateChange`), while the backend validates each request independently using the Admin SDK — no shared session state, no trust of client claims.

**Row Level Security**
Implementing RLS required thinking carefully about which operations the Supabase anon key is used for versus the service role key. The backend uses the anon key for profile queries (letting RLS do the enforcement) while using the admin client only for token validation.

**Image memory handling**
Multer's in-memory storage was chosen deliberately — images are transient data that should never be persisted. This simplified the architecture (no storage bucket needed) while keeping the pipeline fast.

---

## Future Improvements

- [ ] **Scan history** — persist past analyses to a `scan_results` table so users can review previous results
- [ ] **Shareable reports** — generate a shareable link for a scan result
- [ ] **Product database** — pre-populate common products so users don't need to photograph them
- [ ] **Ingredient glossary** — explain what flagged ingredients are and why they matter
- [ ] **Push notifications** — remind users when it's time for their skincare routine
- [ ] **Mobile-responsive layout** — optimise the sidebar and layout for smaller screens
- [ ] **OAuth login** — add Google/Apple sign-in via Supabase Auth providers
- [ ] **Dark mode** — the design token system already supports it; requires adding a `[data-theme="dark"]` layer

---

## License

This project is licensed under the [MIT License](LICENSE).
