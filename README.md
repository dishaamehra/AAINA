# AAINA

**Reflect. Decide. Achieve.**

AAINA is an AI-powered Decision Intelligence Platform that helps people make realistic, informed decisions before execution begins.

## Tagline

AAINA is not a to-do list, calendar, or chatbot. It is a **Personal Decision Operating System** — an AI Decision Coach that answers: *"Is this plan actually realistic?"*

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, TailwindCSS, Framer Motion |
| Backend | Firebase Cloud Functions, Node.js, TypeScript |
| Database | Firestore |
| Authentication | Firebase Authentication (Google Sign-In) |
| AI | Google AI Studio (Gemini) via AI Gateway |
| Shared | TypeScript types in `shared/` |

## Project Structure

```
AAINA/
├── frontend/          # React application
├── backend/
│   └── functions/     # Firebase Cloud Functions
├── shared/            # Shared TypeScript types
├── firebase/          # Firestore rules and indexes
├── docs/              # Additional documentation
├── assets/            # Static assets and demo data
├── firebase.json      # Firebase project configuration
├── ARCHITECTURE.md    # System architecture reference
├── PROJECT_STATUS.md  # Implementation progress
└── CHANGELOG.md       # Version history
```

## Prerequisites

- Node.js 20+
- npm 10+
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project with Authentication, Firestore, Hosting, and Functions enabled
- Google AI Studio API key (for Phase 7+)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in your Firebase and Gemini credentials in `.env`.

For local frontend development, copy the `VITE_*` variables into `frontend/.env` or the root `.env` (Vite loads from the frontend directory).

### 3. Build all packages

```bash
npm run build
```

### 4. Run the frontend (development)

```bash
npm run dev --workspace=@aaina/frontend
```

### 5. Run Firebase emulators (development)

```bash
firebase emulators:start
```

## Development Rules

- **Blueprint.pdf** is the single source of truth
- Never call Firestore directly from React components
- Never call Gemini directly — always use the AI Gateway
- All calculations come from the Decision Engine
- All configurable values come from the Configuration Service
- Follow: `UI → Cloud Function → Repository → Firestore`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build all workspaces |
| `npm run typecheck` | TypeScript check all workspaces |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## License

Private — Vibe2Ship Hackathon Project
