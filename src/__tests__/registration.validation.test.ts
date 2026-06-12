import { describe, expect, it } from "vitest";
import { registrationSchema } from "@/lib/validations/registration";

describe("registrationSchema", () => {
  const validInput = {
    fullName: "Jane Doe",
    email: "jane@university.edu",
    studentId: "STU-2024-001",
    password: "password123",
  };

  it("accepts valid registration data", () => {
    const result = registrationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects empty full name", () => {
    const result = registrationSchema.safeParse({
      ...validInput,
      fullName: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = registrationSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = registrationSchema.safeParse({
      ...validInput,
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty student ID", () => {
    const result = registrationSchema.safeParse({
      ...validInput,
      studentId: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts password with exactly 8 characters (boundary)", () => {
    const result = registrationSchema.safeParse({
      ...validInput,
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});
