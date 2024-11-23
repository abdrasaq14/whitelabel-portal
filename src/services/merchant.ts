import apiClient from "./client";
import { IQueryParams } from "@/interfaces/AppInterfaces";

export const MerchantService = {
  getallMerchants: (payload: IQueryParams) =>
    apiClient.get(`/external-api/merchant/get-merchants-by-whiteLabelName`, {
      ...payload
    }),
  getMerchantDetails: (id: string) =>
    apiClient.get(`/external-api/merchant/get-by-merchantId/${id}`),
  getMerchantRequest: (payload: IQueryParams) =>
    apiClient.get(`/merchant-request/get-all-request-by-whitelabel-id/`, {
      ...payload
    }),
  updateMerchantRequest: (id: string, payload: any) =>
    apiClient.put(`/merchant-request/${id}`, payload),
  getMerchantProducts: (payload: IQueryParams) =>
    apiClient.get(`/external-api/merchant/get-merchant-products/`, {
      ...payload
    }),
  suspendMerchant: (payload: any, id: string) =>
    apiClient.put(
      `/external-api/merchant/update-merchant-status/${id}`,
      payload
    )
};
