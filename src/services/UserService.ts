import { AdminAccountInfo } from "@/interfaces/AppInterfaces";
import apiClient from "./client";
const baseEndPoint = "/users";

export const UserService = {
    editUserInfo: (data: AdminAccountInfo) => apiClient.put(`${baseEndPoint}`, data),
    getAllUsers: () => apiClient.get(`${baseEndPoint}/staff`),
    updateStaff: (payload: any, id:string) => apiClient.put(`${baseEndPoint}/staff/${id}`, payload),
    createStaff: (payload: any) => apiClient.post(`${baseEndPoint}/staff`, payload)
}