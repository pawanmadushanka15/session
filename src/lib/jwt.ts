import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-me-in-production"
);

interface TokenPayload {
  id: string;
  email: string;
  fullName: string;
  studentId: string;
  createdAt: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      fullName: payload.fullName as string,
      studentId: payload.studentId as string,
      createdAt: payload.createdAt as string,
    };
  } catch (error) {
    return null;
  }
}
