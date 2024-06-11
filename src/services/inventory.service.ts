import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";





export const InventoryService = {
    createInventory: (payload: any) => createApiClient(false).post(`/inventory`, payload),
    getInventoroes: (payload: any) => createApiClient(false).get(`/inventory${paramsObjectToQueryString(payload)}`),
    getInventoryDetails: (payload: any) => createApiClient(false).get(``),
    getInventoryRequest: async (payload: any) => {
        console.log(payload)
       return await createApiClient(false).get(`/inventory/request/${payload.whiteLabelName}${paramsObjectToQueryString(payload)}`,)
    },
    getUsersRequest: (payload: any) => createApiClient(false).get(``),
    updateInventory: (payload: any) => createApiClient(false).put(``),
    updateInventoryRequest: (payload: any) => createApiClient(false).put(`/inventory/update-request`, payload),
    makeRequest: (payload: any) => createApiClient(false).post('/inventory/request', payload)
}