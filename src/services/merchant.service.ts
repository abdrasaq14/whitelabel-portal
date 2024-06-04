import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";

let profile:any = sessionStorage.getItem("profitall-client-auth")
 profile = JSON.parse(profile)
// console.log(profile.state.profile.whiteLabelName)

export const MerchantService = {
  getallMerchants: (payload: any) => createApiClient(false).get(`/external-api/get-merchants-by-whiteLabelName/${paramsObjectToQueryString(payload)}`, payload),
  getMercharntDetails: (payload: any) => createApiClient(false).get(`/external-api/get-by-merchantId/${payload.id}`),
  getMerchantRequest: (payload:any) => createApiClient(false).get(`/merchant-request/get-all-request-by-whitelabel-id/${paramsObjectToQueryString(payload)}`),
  getMerchantDiscovery: (payload:any) => createApiClient(false).get(`/external-api/get-all-merchants/${paramsObjectToQueryString(payload)}`),
  sendPMerchantRequest:(payload:any) => createApiClient(false).post(`/external-api/send-merchant-request`, payload)

}