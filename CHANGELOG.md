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
