import { createApiClient } from "../utils/api";



export const NotificationService = {
    getUsersNotification : () => createApiClient(false).get('/notification'),
    updateNotification: (payload:any) => createApiClient(false).put(`/notification/${payload}`)
}