import pg from "pg";

const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || "postgres",
  ssl: process.env.PGHOST?.includes("supabase.co")
    ? { rejectUnauthorized: false }
    : undefined,
});

const { rows } = await pool.query(
  `SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'library_students'
   ORDER BY ordinal_position`
);

console.log(rows.length ? rows : "No students table found");
await pool.end();
