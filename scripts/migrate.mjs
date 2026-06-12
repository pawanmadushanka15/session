import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || "postgres",
  ssl: process.env.PGHOST?.includes("supabase.co")
    ? { rejectUnauthorized: false }
    : undefined,
});

const sql = readFileSync(
  join(__dirname, "..", "supabase", "migrations", "001_create_students.sql"),
  "utf8"
);

try {
  await pool.query(sql);
  console.log("Migration completed: library_students table is ready.");
} catch (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
} finally {
  await pool.end();
}
