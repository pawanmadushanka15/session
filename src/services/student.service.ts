import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import type { RegistrationInput } from "@/lib/validations/registration";
import type { Student, StudentPublic } from "@/types/student";

const SALT_ROUNDS = 12;

function toStudentPublic(student: Student): StudentPublic {
  return {
    id: student.id,
    fullName: student.full_name,
    email: student.email,
    studentId: student.student_id,
    createdAt: student.created_at,
  };
}

export async function findStudentByEmail(
  email: string
): Promise<Student | null> {
  const { rows } = await query<Student>(
    "SELECT * FROM library_students WHERE email = $1 LIMIT 1",
    [email.toLowerCase()]
  );
  return rows[0] ?? null;
}

export async function findStudentByStudentId(
  studentId: string
): Promise<Student | null> {
  const { rows } = await query<Student>(
    "SELECT * FROM library_students WHERE student_id = $1 LIMIT 1",
    [studentId]
  );
  return rows[0] ?? null;
}

export async function registerStudent(
  input: RegistrationInput
): Promise<StudentPublic> {
  const normalizedEmail = input.email.toLowerCase();

  const existingEmail = await findStudentByEmail(normalizedEmail);
  if (existingEmail) {
    const error = new Error("Email is already registered");
    (error as Error & { statusCode?: number }).statusCode = 409;
    throw error;
  }

  const existingStudentId = await findStudentByStudentId(input.studentId);
  if (existingStudentId) {
    const error = new Error("Student ID is already registered");
    (error as Error & { statusCode?: number }).statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  try {
    const { rows } = await query<Student>(
      `INSERT INTO library_students (full_name, email, student_id, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [input.fullName, normalizedEmail, input.studentId, passwordHash]
    );

    return toStudentPublic(rows[0]);
  } catch (error) {
    const pgError = error as { code?: string };
    if (pgError.code === "23505") {
      const duplicateError = new Error(
        "Email or Student ID is already registered"
      );
      (duplicateError as Error & { statusCode?: number }).statusCode = 409;
      throw duplicateError;
    }
    throw error;
  }
}
