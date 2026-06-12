export interface Student {
  id: string;
  full_name: string;
  email: string;
  student_id: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface StudentPublic {
  id: string;
  fullName: string;
  email: string;
  studentId: string;
  createdAt: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  studentId: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: StudentPublic;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
