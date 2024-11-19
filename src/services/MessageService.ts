import apiClient from "./client";
import { paramsObjectToQueryString } from "@/utilities/helpers";
const baseEndPoint = "/messaging";

export const MessageService = {

    getAllConversations: (userId: string) => apiClient.get(`${baseEndPoint}/conversations/${userId}`),

    getAllMessages: (conversationId: string) => apiClient.get(`${baseEndPoint}/message/${conversationId}`),

    sendMessage: (conversationId: string, data: any) => apiClient.post(`${baseEndPoint}/message/${conversationId}/send`, data)

}