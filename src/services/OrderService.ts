import apiClient from "./client";


export const OrderService = {
    getOrders: (payload: any) => apiClient.get(`/order/get-orders`, {...payload}),
}