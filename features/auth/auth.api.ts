import { LoginResponse, SignupResponse } from "@/features/auth/auth.type";
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
  return apiClient("/api/auth/login", {
    method: "POST",
    body: loginApiRequest,
    useBaseUrl: false,
  });
}
