import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";

export const ProductService = {
  getallProducts: (payload: any) => createApiClient(false).get(`/products/get-products-by-whitelabelname/${paramsObjectToQueryString(payload)}`, payload),
  getProductDetails: (payload: any) => createApiClient(false).get(`/product/${payload.id}`),
  getProductRequest: (payload: any) => createApiClient(false).get(`/product-request`),
  getProductDiscovery: (payload: any) => createApiClient(false).get(`/external-api/product/get-all-products${paramsObjectToQueryString(payload)}`),
  sendProductRequest: (payload: any) => createApiClient(false).post(`/external-api/product/send-product-request`, payload),
  addAllProducts: (payload: any) => createApiClient(false).post(`/external-api/product/send-merchant-request`, payload),
  blockAndUnblockProducts: (payload: any) => {
    const { id, ...params } = payload;
    return createApiClient(false).put(`/products/update-product-status/${id}`, params)
  }

}