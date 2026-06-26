# Changelog

All notable changes to AAINA are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added — Phase 1 (2026-06-26)

- Monorepo scaffold with npm workspaces (`frontend`, `backend/functions`, `shared`)
- React 19 + TypeScript + Vite frontend
- TailwindCSS v4 with AAINA design tokens (Deep Indigo, Lavender, Emerald, etc.)
- Framer Motion for animations
- Firebase client configuration module (`frontend/src/config/firebase.ts`)
- Firebase Cloud Functions backend with health check endpoint
- Shared TypeScript types package (`@aaina/shared`)
- Firestore security rules for all MVP collections
- Firestore composite indexes per Blueprint
- Firebase emulator configuration
- ESLint flat config + Prettier at monorepo root
- Environment variable template (`.env.example`)
- Project documentation: README, ARCHITECTURE, PROJECT_STATUS
- Backend folder structure per Blueprint (repositories, services, decision-engine, workflow, ai, etc.)
- Frontend folder structure per Blueprint (components, pages, hooks, services, contexts, etc.)
- Configuration Service scaffold with Blueprint-defined weights and thresholds
### Added - Phase 2 (2026-06-26)

- Firebase Google Authentication frontend flow
- Google popup sign-in with redirect fallback
- Firebase local session persistence
- Silent login on refresh through `onAuthStateChanged`
- Logout support
- `AuthContext` and `useAuth`
- Protected and public route guards
- AAINA-branded responsive login page
- Authentication loading screen
- Frontend API client that sends Firebase ID tokens to Cloud Functions
- HTTPS Cloud Function `syncAuthenticatedUser`
- Backend authentication middleware that verifies Firebase ID tokens using Firebase Admin
- Zod validation for auth sync payloads
- `AuthService` for user profile initialization and synchronization
- `UserRepository` for Firestore CRUD on `users`
- Automatic `users/{uid}` document creation
- Default user role set to `Student`
- Structured API success/error responses
- CORS handling through configured allowed origins

### Security - Phase 2 (2026-06-26)

- Firestore writes are blocked from the frontend for protected collections.
- Cloud Functions verify every Firebase ID token before synchronizing profiles.
- User profile fields are sourced from verified token claims instead of trusting frontend identity data.
- Secrets remain in environment variables only.

### Added - Phase 1 (2026-06-26)

- Monorepo scaffold with npm workspaces (`frontend`, `backend/functions`, `shared`)
- React 19 + TypeScript + Vite frontend
- TailwindCSS v4 with AAINA design tokens (Deep Indigo, Lavender, Emerald, etc.)
- Framer Motion for animations
- Firebase client configuration module (`frontend/src/config/firebase.ts`)
- Firebase Cloud Functions backend with health check endpoint
- Shared TypeScript types package (`@aaina/shared`)
- Firestore security rules for all MVP collections
- Firestore composite indexes per Blueprint
- Firebase emulator configuration
- ESLint flat config + Prettier at monorepo root
- Environment variable template (`.env.example`)
- Project documentation: README, ARCHITECTURE, PROJECT_STATUS
- Backend folder structure per Blueprint (repositories, services, decision-engine, workflow, ai, etc.)
- Frontend folder structure per Blueprint (components, pages, hooks, services, contexts, etc.)
- Configuration Service scaffold with Blueprint-defined weights and thresholds
