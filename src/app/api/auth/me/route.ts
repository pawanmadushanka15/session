import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import type { AuthMeResponse } from "@/types/student";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("library_session")?.value;

    if (!token) {
      const response: AuthMeResponse = {
        success: true,
        authenticated: false,
      };
      return NextResponse.json(response, { status: 200 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response: AuthMeResponse = {
        success: true,
        authenticated: false,
      };
      return NextResponse.json(response, { status: 200 });
    }

    const response: AuthMeResponse = {
      success: true,
      authenticated: true,
      student: {
        id: payload.id,
        fullName: payload.fullName,
        email: payload.email,
        studentId: payload.studentId,
        createdAt: payload.createdAt,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
