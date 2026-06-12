import { NextRequest, NextResponse } from "next/server";
import {
  formatZodErrors,
  registrationSchema,
} from "@/lib/validations/registration";
import { registerStudent } from "@/services/student.service";
import type { ApiErrorResponse, RegisterResponse } from "@/types/student";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        errors: formatZodErrors(parsed.error),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const student = await registerStudent(parsed.data);

    const response: RegisterResponse = {
      success: true,
      message: "Registration successful! You can now borrow books and manage your library activities.",
      data: student,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const statusCode =
      error instanceof Error &&
      "statusCode" in error &&
      typeof (error as Error & { statusCode?: number }).statusCode === "number"
        ? (error as Error & { statusCode: number }).statusCode
        : 500;

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during registration";

    const errorResponse: ApiErrorResponse = {
      success: false,
      message,
    };

    return NextResponse.json(errorResponse, { status: statusCode });
  }
}
