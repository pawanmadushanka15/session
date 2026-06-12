# Student Setup Guide — Library Management System

Use this guide to install software and run the project on your computer.

---

## 1. Required Software

Install these before starting:

| Software | Version | Purpose | Download |
|----------|---------|---------|----------|
| **Node.js** | 18 or higher (LTS recommended) | Runs JavaScript / Next.js | https://nodejs.org |
| **npm** | Included with Node.js | Installs project packages | Comes with Node.js |
| **Git** (optional) | Latest | Clone the project from repository | https://git-scm.com |
| **VS Code** (recommended) | Latest | Code editor | https://code.visualstudio.com |
| **Supabase account** | Free tier | Cloud PostgreSQL database | https://supabase.com |

### Check if Node.js is installed

Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux) and run:

```bash
node -v
npm -v
```

You should see version numbers (example: `v20.x.x` and `10.x.x`).

---

## 2. Database Setup (Supabase)

1. Go to https://supabase.com and sign up / log in.
2. Create a **New Project**.
3. Wait until the project is ready.
4. Open **Project Settings → Database**.
5. Copy these values:
   - **Host** → `PGHOST`
   - **Port** → `PGPORT` (usually `5432`)
   - **Database name** → `PGDATABASE` (usually `postgres`)
   - **User** → `PGUSER` (usually `postgres`)
   - **Password** → `PGPASSWORD` (your database password)

---

## 3. Environment File

1. In the project folder, copy `.env.example` to `.env`:

**Windows (Command Prompt):**
```bash
copy .env.example .env
```

**Mac / Linux:**
```bash
cp .env.example .env
```

2. Open `.env` and paste your Supabase database details:

```env
PGHOST=db.xxxxxxxxxxxx.supabase.co
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-database-password
PGDATABASE=postgres
```

---

## 4. Install and Run

Open terminal inside the project folder and run these commands **in order**:

```bash
# Step 1: Install packages
npm install

# Step 2: Create database table
npm run db:migrate

# Step 3: Start the application
npm run dev
```

Open your browser and go to:

**http://localhost:3000**

Click **Student Registration** and test the form.

---

## 5. Useful Commands

| Command | What it does |
|---------|----------------|
| `npm install` | Install all project dependencies (run once, or after updates) |
| `npm run db:migrate` | Create `library_students` table in Supabase |
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Run production build (run `npm run build` first) |
| `npm run test` | Run unit tests |
| `npm run lint` | Check code style |

---

## 6. Common Problems

### `node` is not recognized
- Install Node.js from https://nodejs.org
- Restart your terminal after installation

### `npm install` fails
- Check your internet connection
- Delete `node_modules` folder and run `npm install` again

### Database connection error
- Check `.env` file values are correct
- Confirm Supabase project is running
- Run `npm run db:migrate` again

### Port 3000 already in use
- Close other apps using port 3000, or
- Next.js may start on port 3001 — check the terminal message

### Email already registered
- Use a different email address when testing registration

---

## 7. Project URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Registration | http://localhost:3000/register |
| API (POST) | http://localhost:3000/api/auth/register |

---

## 8. Technology Used

- **Frontend:** Next.js, React, Material UI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Language:** TypeScript

---

## 9. Need Help?

1. Read `README.md` in the project root
2. Check `docs/` folder for user stories and design documents
3. Ask your lecturer with:
   - Error message (screenshot or copy text)
   - Command you ran
   - Your Node.js version (`node -v`)
