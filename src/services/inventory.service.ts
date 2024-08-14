import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";





export const InventoryService = {
    createInventory: (payload: any) => createApiClient(false).post(`/inventory`, payload),
    getInventoroes: (payload: any) => createApiClient(false).get(`/inventory${paramsObjectToQueryString(payload)}`),
    getInventoryDetails: (payload: any) => createApiClient(false).get(``),
    getInventoryRequest: async (payload: any) => {
        // const { whiteLabelName, ...params } = payload;
        // console.log(whiteLabelName, params, payload)
        return await createApiClient(false).get(`/inventory/request/${paramsObjectToQueryString(payload)}`,)
    },
    getInventoryRequestHistory: async (payload: any) => {
        // const { whiteLabelName, ...params } = payload;
        // console.log(whiteLabelName, params, payload)
        return await createApiClient(false).get(`/inventory/request/${paramsObjectToQueryString(payload)}`,)
    },
    getUsersRequest: async (payload: any) => {
        const { whiteLabelName, ...params } = payload;
        console.log(whiteLabelName, params, payload)
        return await createApiClient(false).get(`/inventory/request/${paramsObjectToQueryString(params)}`,)
    },
    getUsersRequestHistory: async (payload: any) => {
        const { whiteLabelName, ...params } = payload;
        console.log(whiteLabelName, params, payload)
        return await createApiClient(false).get(`/inventory/request/${paramsObjectToQueryString(params)}`,)
    },
    updateInventory: (payload: any) => createApiClient(false).put(``),
    updateInventoryRequest: (payload: any) => createApiClient(false).put(`/inventory/update-request`, payload),
    makeRequest: (payload: any) => createApiClient(false).post('/inventory/request', payload),
    getTotalInventories : (payload: any) => createApiClient(false).get('/inventory/get-total-inventory')
}