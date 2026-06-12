-- Library Management System: Student Registration
-- Uses library_students to avoid conflict with existing students table on shared Supabase DB

CREATE TABLE IF NOT EXISTS library_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  student_id VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT library_students_email_unique UNIQUE (email),
  CONSTRAINT library_students_student_id_unique UNIQUE (student_id)
);

CREATE INDEX IF NOT EXISTS idx_library_students_email ON library_students (email);
CREATE INDEX IF NOT EXISTS idx_library_students_student_id ON library_students (student_id);

CREATE OR REPLACE FUNCTION update_library_students_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS library_students_updated_at ON library_students;
CREATE TRIGGER library_students_updated_at
  BEFORE UPDATE ON library_students
  FOR EACH ROW
  EXECUTE FUNCTION update_library_students_updated_at();
