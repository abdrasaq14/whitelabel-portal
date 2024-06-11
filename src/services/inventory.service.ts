import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";





export const InventoryService = {
    createInventory: (payload: any) => createApiClient(false).post(`/inventory`, payload),
    getInventoroes: (payload: any) => createApiClient(false).get(`/inventory${paramsObjectToQueryString(payload)}`),
    getInventoryDetails: (payload:any) => createApiClient(false).get(``),
    getInventoryRequest: (payload:any) => createApiClient(false).get(`/inventory/request/${payload.whitelabelname}${paramsObjectToQueryString(payload)}`,),
    getUsersRequest: (payload:any) => createApiClient(false).get(``),
    updateInventory:(payload:any) => createApiClient(false).put(``),
    updateInventoryRequest: (payload:any) => createApiClient(false).put(`/inventory/update-request`, payload),
}