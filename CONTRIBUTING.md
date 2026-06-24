# Contributing to ComplexionAI

Thank you for your interest in contributing. This document covers how to get the project running locally, the branch workflow, and coding standards.

---

## Development Setup

Follow the [Getting Started](README.md#getting-started) steps in the README to run the project locally. You will need a Supabase project and a Gemini API key — both offer free tiers.

---

## Branch Workflow

```
main          ← stable, always deployable
└── feature/short-description    ← your work
└── fix/short-description        ← bug fixes
```

1. Fork the repository and create your branch from `main`
2. Make your changes
3. Open a pull request against `main` with a clear description of what changed and why

Keep pull requests focused — one feature or fix per PR.

---

## Coding Standards

### General

- Prefer clarity over cleverness
- Remove `console.log` statements before submitting
- Delete unused imports and dead code

### Backend (Node.js / Express)

- ES Modules only (`import`/`export`) — the project uses `"type": "module"`
- Route handlers stay thin: delegate to controllers, controllers delegate to services
- All Supabase DB access belongs in `services/` — never in controllers directly
- Error responses always go through `handleError()` in `utils/handleError.js`
- New endpoints must be protected with the `protect` middleware from `middleware/auth.js`

### Frontend (React)

- Functional components only
- API calls belong in `lib/api.js` — pages should not construct fetch calls directly
- Use existing UI components (`Button`, `Card`, `Input`) before writing new ones
- CSS follows the design token system in `index.css` — use `var(--token-name)` rather than raw values

---

## Reporting Issues

Open a GitHub issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behaviour
- Any relevant error messages or screenshots
