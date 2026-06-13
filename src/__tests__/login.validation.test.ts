import { describe, expect, it } from "vitest";
import { loginSchema } from "@/lib/validations/login";

describe("loginSchema", () => {
  const validInput = {
    email: "student@university.edu",
    password: "password123",
  };

  it("accepts valid login data", () => {
    const result = loginSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = loginSchema.safeParse({
      ...validInput,
      email: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      ...validInput,
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = loginSchema.safeParse({
      ...validInput,
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("accepts password with exactly 8 characters (boundary)", () => {
    const result = loginSchema.safeParse({
      ...validInput,
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
});
