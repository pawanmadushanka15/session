# Implementation Guide

This folder documents what was built from the prompts in `docs/`.

## Quick Start

1. Copy `.env.example` → `.env` and set `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
2. Run `npm run db:migrate`
3. `npm install && npm run dev`
4. Open http://localhost:3000/register

## Architecture

```
Browser → RegistrationForm (MUI + Axios)
       → POST /api/auth/register (Next.js API Route)
       → student.service.ts (validation + bcrypt)
       → PostgreSQL via pg pool (students table on Supabase)
```

## Deliverables by Prompt

| Prompt | Output Location |
|--------|-----------------|
| Database | `supabase/migrations/001_create_students.sql` |
| Backend | `src/app/api/auth/register/route.ts`, `src/services/` |
| Frontend | `src/app/register/`, `src/components/registration/` |
| Tests | `src/__tests__/registration.validation.test.ts` |
