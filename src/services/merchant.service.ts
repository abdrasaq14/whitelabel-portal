import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";

// let profile:any = sessionStorage.getItem("profitall-client-auth")
//  profile = JSON.parse(profile)
// console.log(profile.state.profile.whiteLabelName)

export const MerchantService = {
  getallMerchants: (payload: any) => createApiClient(false).get(`/external-api/merchant/get-merchants-by-whiteLabelName/${paramsObjectToQueryString(payload)}`, payload),
  getMercharntDetails: (payload: any) => createApiClient(false).get(`/external-api/merchant/get-by-merchantId/${payload.id}`),
  getMerchantRequest: (payload:any) => createApiClient(false).get(`/merchant-request/get-all-request-by-whitelabel-id/${paramsObjectToQueryString(payload)}`),
  getProductRequest: (payload:any) => createApiClient(false).get(`/external-api/product/get-product-request/${paramsObjectToQueryString(payload)}`),
  getMerchantDiscovery: (payload:any) => createApiClient(false).get(`/external-api/merchant/get-all-merchants/${paramsObjectToQueryString(payload)}`),
  sendPMerchantRequest:(payload:any) => createApiClient(false).post(`/external-api/merchant/send-merchant-request`, payload),
  getMerchantProducts: (payload:any) => createApiClient(false).get(`/external-api/merchant/get-merchant-products/${paramsObjectToQueryString(payload)}`),
  suspendMerchant: (payload:any, id:string) => createApiClient(false).put(`/external-api/merchant/update-merchant-status/${id}`, payload),
  startConversation: (payload:any) => createApiClient(false).post(`/messaging/conversations`, payload)

}