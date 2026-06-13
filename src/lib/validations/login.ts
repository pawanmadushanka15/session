import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function formatZodErrors(
  error: z.ZodError
): Record<string, string[]> {
  return error.flatten().fieldErrors as Record<string, string[]>;
}
