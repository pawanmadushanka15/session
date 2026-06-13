import { describe, expect, it, vi, beforeEach } from "vitest";
import { authenticateStudent } from "@/services/student.service";
import * as db from "@/lib/db";
import bcrypt from "bcryptjs";

vi.mock("@/lib/db", () => ({
  query: vi.fn(),
}));

describe("student.service - authenticateStudent", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("authenticates a student with correct email and password", async () => {
    const passwordHash = await bcrypt.hash("password123", 10);
    const mockStudent = {
      id: "uuid-123",
      full_name: "John Doe",
      email: "john@university.edu",
      student_id: "STU-001",
      password_hash: passwordHash,
      created_at: "2026-06-13T00:00:00Z",
      updated_at: "2026-06-13T00:00:00Z",
    };

    vi.mocked(db.query).mockResolvedValue({
      rows: [mockStudent],
      command: "",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const result = await authenticateStudent("john@university.edu", "password123");

    expect(result).toEqual({
      id: "uuid-123",
      fullName: "John Doe",
      email: "john@university.edu",
      studentId: "STU-001",
      createdAt: "2026-06-13T00:00:00Z",
    });
    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      ["john@university.edu"]
    );
  });

  it("throws 401 when student is not found", async () => {
    vi.mocked(db.query).mockResolvedValue({
      rows: [],
      command: "",
      rowCount: 0,
      oid: 0,
      fields: [],
    });

    await expect(
      authenticateStudent("unknown@university.edu", "password123")
    ).rejects.toThrowError("Invalid email or password");
  });

  it("throws 401 when password hash does not match", async () => {
    const passwordHash = await bcrypt.hash("password123", 10);
    const mockStudent = {
      id: "uuid-123",
      full_name: "John Doe",
      email: "john@university.edu",
      student_id: "STU-001",
      password_hash: passwordHash,
      created_at: "2026-06-13T00:00:00Z",
      updated_at: "2026-06-13T00:00:00Z",
    };

    vi.mocked(db.query).mockResolvedValue({
      rows: [mockStudent],
      command: "",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    await expect(
      authenticateStudent("john@university.edu", "wrongpassword")
    ).rejects.toThrowError("Invalid email or password");
  });
});
