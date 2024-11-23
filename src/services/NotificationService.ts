import apiClient from "./client";
const baseEndPoint = "/notification";

export const NotificationService = {
    
    getUsersNewNotification: () => apiClient.get(`${baseEndPoint}/new`),

    getUsersNotification: () => apiClient.get(`${baseEndPoint}`),

    updateNotification: (data: string) => apiClient.put(`${baseEndPoint}/${data}`)

}