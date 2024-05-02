import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";

export const MerchantService = {
  getallMerchants: (payload: any) => createApiClient(false).get(`/merchant${paramsObjectToQueryString(payload)}`, payload),
  getMercharntDetails: (payload: any) => createApiClient(false).get(`/merchant/${payload.id}`),
  getMerchantRequest: (payload:any) => createApiClient(false).get(`/merchant-request`)

}