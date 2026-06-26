# AAINA Architecture

This document summarizes the AAINA system architecture as defined in the Blueprint. It must remain synchronized with implementation.

## High-Level Flow

```
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

## Layer Responsibilities

| Layer | Responsibility |
|-------|----------------|
| **Frontend** | UI, interaction, visualization — never calculates scores |
| **Authentication** | Google Sign-In, JWT, protected routes |
| **API (Cloud Functions)** | Auth, validation, orchestration, structured responses |
| **Repositories** | Firestore CRUD only — no business logic |
| **Context Assemblers** | Gather data into context objects for workflows |
| **Decision Engine** | All deterministic math — never calls Gemini |
| **Workflow Orchestrator** | Controls agent execution order |
| **AI Gateway** | Only Gemini integration point |
| **Validation** | Zod + JSON schema validation with retry and fallback |
| **Firestore** | Persistent storage — raw actions stored, insights derived |

## Immutable Rules

1. **Decision Engine calculates. Gemini explains.**
2. **UI → API → Repository → Firestore** — no direct Firestore from React
3. **Configuration Service** holds all weights, thresholds, model names, prompt versions
4. **Repository Pattern** — all database access through repositories
5. **Workflow Orchestrator** — agents never call each other directly

## Decision Engine Services

- ProbabilityService
- RiskService
- PriorityService
- BurnoutService
- FocusService
- RecoveryService
- DecisionMemoryService
- CapacityService (Core)

## AI Agents (Multi-Agent System)

1. Reality Check (first)
2. Risk Radar
3. Priority Navigator
4. Burnout Monitor
5. FocusGuard
6. ReRoute
7. Weekly Reflection (scheduled)

## Firestore Collections

`users`, `goals`, `tasks`, `weeklySchedules`, `dailyLogs`, `focusDNA`, `decisionMemory`, `riskSnapshots`, `weeklyReviews`, `notifications`, `settings`, `activityLogs`, `aiRecommendations`

Team collections (`teams`, `teamMembers`, `managerAssignments`) are deferred from MVP.

## Backend Folder Structure

```
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

```
frontend/src/
├── components/ui/
├── components/layout/
├── pages/
├── hooks/
├── services/
├── contexts/
├── config/
├── lib/
└── types/
```

## Google Cloud Services

| Service | Purpose |
|---------|---------|
| Firebase Auth | Authentication |
| Firestore | Database |
| Cloud Functions | Backend API |
| Firebase Hosting | Frontend deployment |
| Google AI Studio | Gemini explanations |
| Cloud Scheduler | Background jobs |
| Cloud Logging | Monitoring |

## Implementation Phases

See `PROJECT_STATUS.md` for current progress.

1. Project Setup
2. Authentication
3. Firestore + Repositories
4. Backend Foundation
5. Decision Engine
6. Workflow Pipeline
7. Gemini Integration
8. UI Foundation
9. Core Screens
10. Manager Dashboard (deferred)
11. Performance Optimization
12. Testing
13. Production Deployment
14. Final Polish
15. Demo Preparation
