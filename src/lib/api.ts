import axios from "axios";
import type {
  AuthMeResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/student";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Ensure cookies are sent with requests if needed, but since Next.js API routes are on the same domain, standard Axios calls send cookies automatically.
});

export async function registerStudent(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}

export async function loginStudent(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function logoutStudent(): Promise<{ success: boolean; message: string }> {
  const response = await api.post<{ success: boolean; message: string }>("/auth/logout");
  return response.data;
}

export async function getCurrentStudent(): Promise<AuthMeResponse> {
  const response = await api.get<AuthMeResponse>("/auth/me");
  return response.data;
}

export default api;
