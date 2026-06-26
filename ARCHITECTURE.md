# AAINA Architecture

This document summarizes the AAINA system architecture and must remain synchronized with implementation.

## High-Level Flow

```text
User
  ↓
React Frontend (UI)
  ↓
Firebase Authentication
  ↓
HTTPS Cloud Functions (API)
  ↓
Repository Layer (CRUD only)
  ↓
Context Assembler Layer
  ↓
Decision Engine (deterministic calculations)
  ↓
Workflow Orchestrator
  ↓
AI Gateway
  ↓
Google AI Studio (Gemini)
  ↓
JSON Validation Layer
  ↓
Firestore
  ↓
React Frontend
```

## Phase 2 Authentication Flow

```text
LoginPage
  ↓
AuthContext / useAuth
  ↓
Firebase Google Popup Sign-In
  ↓
Redirect fallback when popup is blocked
  ↓
Firebase local session persistence
  ↓
onAuthStateChanged silent login on refresh
  ↓
API client sends Firebase ID token to Cloud Function
  ↓
Authentication middleware verifies ID token through Firebase Admin
  ↓
AuthService creates or synchronizes the user profile
  ↓
UserRepository performs users/{uid} CRUD
  ↓
Firestore
```

## Layer Responsibilities

| Layer                 | Responsibility                                                                   |
| --------------------- | -------------------------------------------------------------------------------- |
| Frontend              | UI, interaction, visualization, auth state, loading states, error states         |
| Authentication        | Google Sign-In, session persistence, JWT/ID-token verification, route protection |
| API (Cloud Functions) | Token verification, validation, orchestration, structured responses              |
| Services              | Business logic, profile synchronization, default role initialization             |
| Repositories          | Firestore CRUD only; no business logic                                           |
| Firestore             | Persistent storage; user-isolated data                                           |

## Immutable Rules

1. Decision Engine calculates. Gemini explains.
2. UI -> API -> Repository -> Firestore; no direct Firestore from React.
3. Configuration Service holds weights, thresholds, model names, prompt versions, and constants.
4. Repository Pattern: all database access through repositories.
5. Workflow Orchestrator: agents never call each other directly.

## Phase 2 Files

### Frontend

- `frontend/src/contexts/AuthContext.tsx` owns auth state and profile synchronization.
- `frontend/src/hooks/useAuth.ts` exposes authentication state and actions.
- `frontend/src/components/auth/ProtectedRoute.tsx` blocks unauthenticated access.
- `frontend/src/components/auth/PublicRoute.tsx` redirects authenticated users away from login.
- `frontend/src/services/auth.service.ts` handles Firebase sign-in, redirect fallback, logout, and backend sync.
- `frontend/src/services/apiClient.ts` sends Firebase ID tokens to Cloud Functions.
- `frontend/src/pages/LoginPage.tsx` provides the responsive AAINA login UI.
- `frontend/src/pages/DashboardPage.tsx` confirms authenticated user initialization.

### Backend

- `backend/functions/src/api/auth.ts` exports the authentication sync HTTPS function.
- `backend/functions/src/middleware/auth.middleware.ts` verifies every Firebase ID token.
- `backend/functions/src/services/auth.service.ts` owns user initialization and synchronization logic.
- `backend/functions/src/repositories/user.repository.ts` performs Firestore CRUD for `users`.
- `backend/functions/src/validators/auth.validators.ts` validates incoming auth payloads with Zod.

## Firestore Collections

`users`, `goals`, `tasks`, `weeklySchedules`, `dailyLogs`, `focusDNA`, `decisionMemory`, `riskSnapshots`, `weeklyReviews`, `notifications`, `settings`, `activityLogs`, `aiRecommendations`

Team collections are deferred from MVP.

## Backend Folder Structure

```text
backend/functions/src/
├── auth/
├── api/
├── scheduled/
├── triggers/
├── repositories/
├── services/
├── decision-engine/
├── workflow/
├── ai/
├── prompts/
├── utils/
├── validators/
├── middleware/
├── config/
└── types/
```

## Frontend Folder Structure

```text
frontend/src/
├── components/ui/
├── components/layout/
├── components/auth/
├── pages/
├── hooks/
├── services/
├── contexts/
├── config/
├── lib/
└── types/
```

## Google Cloud Services

| Service          | Purpose                             |
| ---------------- | ----------------------------------- |
| Firebase Auth    | Authentication                      |
| Firestore        | Database                            |
| Cloud Functions  | Backend API                         |
| Firebase Hosting | Frontend deployment                 |
| Google AI Studio | Gemini explanations in later phases |
| Cloud Scheduler  | Background jobs in later phases     |
| Cloud Logging    | Monitoring                          |

## Implementation Phases

1. Project Setup - complete
2. Authentication - complete
3. Firestore + Repositories - next
4. Backend Foundation
5. Decision Engine
6. Workflow Pipeline
7. Gemini Integration
8. UI Foundation
9. Core Screens
10. Manager Dashboard - deferred
11. Performance Optimization
12. Testing
13. Production Deployment
14. Final Polish
15. Demo Preparation
