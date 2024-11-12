import apiClient from "./client";
import { IQueryParams } from "@/interfaces/AppInterfaces";


export const ProductService = {
  fetchAll: (IQueryParams: IQueryParams) =>
    apiClient.get(`/products/get-products-by-whitelabelname`, {
      ...IQueryParams
    }),
  getCategories: () => apiClient.get(`/external-api/product/get-categories`)
};
