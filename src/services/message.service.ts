import { createApiClient } from "../utils/api";
// import { paramsObjectToQueryString } from "../utils/functions";

let profile:any = sessionStorage.getItem("profitall-client-auth")
profile = JSON.parse(profile)
const userId = profile.state.profile._doc ? profile.state.profile._doc.clientId : profile.state.profile._id;
console.log("Session UserID", profile.state.profile);

export const MessageService = {
  createConversation: (payload: any) => createApiClient(false).post(`/messaging/conversations`, payload),
  getConversations: () => createApiClient(false).get(`/messaging/conversations/${userId}`),
  getMessages: (conversationId: string) => createApiClient(false).get(`/messaging/message/${conversationId}`),
  sendMessage: (payload:any) => createApiClient(false).post(`/messaging/message/${payload.conversationId}/send`, payload.message),
  seeMessage:(payload:any) => createApiClient(false).post(`/messaging/message/seen`, payload)
}