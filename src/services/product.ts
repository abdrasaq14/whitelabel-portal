import apiClient from "./client";
import { IQueryParams } from "@/interfaces/AppInterfaces";


export const ProductService = {
  fetchAll: (IQueryParams: IQueryParams) =>
    apiClient.get(`/products/get-products-by-whitelabelname`, {
      ...IQueryParams
    }),
  getCategories: () => apiClient.get(`/external-api/product/get-categories`),
  getProductDetails: (payload: IQueryParams) =>
    apiClient.get(`/product/${payload.id}`),
  getProductRequest: (payload: IQueryParams) =>
    apiClient.get(`/product-request`),
  blockAndUnblockProducts: (payload: IQueryParams) => {
    const { id, ...params } = payload;
    return apiClient.put(`/products/update-product-status/${id}`, params);
  },
  checkIfProductAlreadyRequested: (payload: {
    productId: string;
    whiteLabelName: string;
  }) =>
    apiClient.get(`/products/check-product-request`, {
      params: payload
    }),
  sendProductRequest: (payload: any) =>
    apiClient.post(
      `/external-api/product/send-product-request`,
      payload
    )
};
