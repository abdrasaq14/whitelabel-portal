import { Otp, UserLogin } from "@/interfaces/AppInterfaces";
import apiClient from "./client";
const baseEndPoint = "/dashboard";

export const DashboardService = {
    dashboardStats: (data: string) => apiClient.get(`${baseEndPoint}/get-dashboard-stats/${data}`),
}