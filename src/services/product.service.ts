import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";

export const ProductService = {
  getallProducts: (payload: any) => createApiClient(false).get(`/products/get-products-by-whitelabelname/${paramsObjectToQueryString(payload)}`, payload),
  getProductDetails: (payload: any) => createApiClient(false).get(`/product/${payload.id}`),
  getProductRequest: (payload:any) => createApiClient(false).get(`/product-request`),
  getProductDiscovery: (payload:any) => createApiClient(false).get(`/external-api/get-all-products${paramsObjectToQueryString(payload)}`),
  sendProductRequest:(payload:any) => createApiClient(false).post(`/external-api/send-product-request`, payload)

}