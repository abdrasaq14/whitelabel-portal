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
    apiClient.get(
      `/merchant-request/get-all-request-by-whitelabel-id/`, {...payload}
    ),
  updateMerchantRequest: (id: string, payload: any) =>
    apiClient.put(`/merchant-request/${id}`, payload)
};

