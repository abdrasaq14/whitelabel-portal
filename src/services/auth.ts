import { Otp, UserLogin } from "@/interfaces/AppInterfaces";
import apiClient from "./client";
const baseEndPoint = "/auth";

export const AuthService = {
    login: (data: UserLogin) => apiClient.post(`${baseEndPoint}/login`, data),
    verifyOtp: (data: Otp) => apiClient.post(`${baseEndPoint}/verify-otp`, {email: data.otpReceiver, otp: data.otp})
}