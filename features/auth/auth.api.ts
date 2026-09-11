import { apiClient } from "@/lib/api/client";
import {
  signupApiRequestSchema,
  SignupFormValues,
} from "@/lib/validation/signup.schema";
import { SignupResponse } from "./auth.type";

export async function signup(data: SignupFormValues): Promise<SignupResponse> {
  const signupApiRequest = signupApiRequestSchema.parse(data);
  return apiClient("/api/auth/sign-up", {
    method: "POST",
    body: signupApiRequest,
  });
}
