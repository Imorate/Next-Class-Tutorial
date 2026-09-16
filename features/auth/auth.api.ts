import {
  LoginResponse,
  LogoutResponse,
  SessionResponse,
  SignupResponse,
} from "@/features/auth/auth.type";
import { apiClient } from "@/lib/api/client";
import {
  LoginApiRequest,
  loginApiRequestSchema,
} from "@/lib/validation/login.schema";
import {
  signupApiRequestSchema,
  SignupFormValues,
} from "@/lib/validation/signup.schema";

export async function signup(data: SignupFormValues): Promise<SignupResponse> {
  const signupApiRequest = signupApiRequestSchema.parse(data);
  return apiClient("/api/auth/sign-up", {
    method: "POST",
    body: signupApiRequest,
  });
}

export async function login(data: LoginApiRequest): Promise<LoginResponse> {
  const loginApiRequest = loginApiRequestSchema.parse(data);
  return apiClient("/api/auth/sign-in", {
    method: "POST",
    body: loginApiRequest,
    credentials: "include",
  });
}

export async function getCurrentSession(): Promise<string> {
  const response = await apiClient<SessionResponse>("/api/auth/session", {
    method: "GET",
    credentials: "include",
  });
  return response.session.id;
}

export async function logout(): Promise<LogoutResponse> {
  return apiClient("/api/auth/sign-out", {
    method: "DELETE",
    credentials: "include",
  });
}
