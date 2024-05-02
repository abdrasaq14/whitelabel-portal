import { createApiClient } from "../utils/api";

export const AuthService = {
  login: (payload: any) => createApiClient(false).post("/auth/login", payload),
  forgotPassword: (payload: any) => createApiClient(false).post("/auth/forgot-password", payload),
  changePassword: (payload: any) => createApiClient(false).post("/changepassword", payload),
  resetPassword: (payload: any) => createApiClient(false).post("/auth/reset-password", payload),
  confirmOtp: (payload: any) => createApiClient(false).post("/verify/otp", payload)
};
