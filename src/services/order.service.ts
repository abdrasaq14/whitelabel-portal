import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";



export const OrderService = {
    getOrders : (payload:any) => createApiClient(false).get(`/order/get-orders/${paramsObjectToQueryString(payload)}`)
}