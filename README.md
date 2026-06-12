# Library Management System

University presentation and demo project for student registration.

**Stack:** Next.js · Material UI · PostgreSQL (Supabase) · Axios · Zod

---

## For Students

**Full setup guide:** [docs/STUDENT_SETUP.md](docs/STUDENT_SETUP.md)

### Quick start

```bash
npm install
npm run db:migrate
npm run dev
```

Open http://localhost:3000

### Required software

| Software | Download |
|----------|----------|
| Node.js 18+ | https://nodejs.org |
| Supabase account | https://supabase.com |
| VS Code (optional) | https://code.visualstudio.com |

---

## Setup (detailed)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure database

Copy `.env.example` to `.env` and add Supabase PostgreSQL credentials:

```env
PGHOST=db.your-project-ref.supabase.co
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-db-password
PGDATABASE=postgres
```

### 3. Run migration

```bash
npm run db:migrate
```

### 4. Start development server

```bash
npm run dev
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run db:migrate` | Create `library_students` table |
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run test` | Run unit tests |
| `npm run lint` | Run ESLint |

---

## Features

- Student registration (Full Name, Email, Student ID, Password)
- Password show/hide toggle
- Email uniqueness validation
- Password minimum 8 characters
- REST API: `POST /api/auth/register`

---

## API Example

**Request:**
```json
POST /api/auth/register
{
  "fullName": "Jane Doe",
  "email": "jane@university.edu",
  "studentId": "STU-2024-001",
  "password": "securepass123"
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Registration successful! ...",
  "data": {
    "id": "uuid",
    "fullName": "Jane Doe",
    "email": "jane@university.edu",
    "studentId": "STU-2024-001",
    "createdAt": "2026-06-12T00:00:00.000Z"
  }
}
```

---

## Project Structure

```
src/
├── app/
│   ├── api/auth/register/route.ts
│   ├── register/page.tsx
│   └── page.tsx
├── components/
│   ├── layout/AppShell.tsx
│   └── registration/RegistrationForm.tsx
├── lib/db.ts
├── services/student.service.ts
supabase/migrations/
docs/
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/STUDENT_SETUP.md](docs/STUDENT_SETUP.md) | Student installation guide |
| [docs/5.implementation/README.md](docs/5.implementation/README.md) | Implementation notes |
| `docs/1.user_stories/` | User stories |
| `docs/2.system_design/` | System design |
| `docs/3.development/` | Development prompts |
| `docs/4.testing/` | Testing prompts |
