import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  formatZodErrors,
  loginSchema,
} from "@/lib/validations/login";
import { authenticateStudent } from "@/services/student.service";
import { signToken } from "@/lib/jwt";
import type { ApiErrorResponse, LoginResponse } from "@/types/student";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        errors: formatZodErrors(parsed.error),
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const student = await authenticateStudent(parsed.data.email, parsed.data.password);

    // Create the signed JWT session token
    const token = await signToken({
      id: student.id,
      email: student.email,
      fullName: student.fullName,
      studentId: student.studentId,
      createdAt: student.createdAt,
    });

    const response: LoginResponse = {
      success: true,
      message: "Login successful",
      data: {
        student,
      },
    };

    const nextResponse = NextResponse.json(response, { status: 200 });

    // Set HttpOnly, Secure session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "library_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return nextResponse;
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
        : "An unexpected error occurred during login";

    const errorResponse: ApiErrorResponse = {
      success: false,
      message,
    };

    return NextResponse.json(errorResponse, { status: statusCode });
  }
}
