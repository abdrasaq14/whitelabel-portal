import { createApiClient } from "../utils/api";



export const NotificationService = {
    getUsersNewNotification : () => createApiClient(false).get('/notification/new'),
    getUsersNotification : () => createApiClient(false).get('/notification'),
    updateNotification: (payload:any) => createApiClient(false).put(`/notification/${payload}`)
}