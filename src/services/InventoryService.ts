import { Inventory } from "@/interfaces/AppInterfaces";
import apiClient from "./client";
import { paramsObjectToQueryString } from "@/utilities/helpers";
const baseEndPoint = "/inventory";

export const InventoryService = {

    createInventory: (data: Inventory) => apiClient.post(`${baseEndPoint}`, data),

    getInventories: (data: any) => apiClient.get(`${baseEndPoint}${paramsObjectToQueryString(data)}`),
    
    getAllInventoryRequests: (data: any) => apiClient.get(`${baseEndPoint}/request${paramsObjectToQueryString(data)}`),
    
    getAllRequestHistory: (data: any) => apiClient.get(`${baseEndPoint}/request${paramsObjectToQueryString(data)}`),

    addInventoryCategory: (data: any) => apiClient.get(`${baseEndPoint}/addCategory`),

    updateInventoryRequest: (data: any) => apiClient.put(`${baseEndPoint}/update-request`, data),

    updateInventory: (inventoryId: string, data: any) => apiClient.put(`${baseEndPoint}/${inventoryId}`, data)

}