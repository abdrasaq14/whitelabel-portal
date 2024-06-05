import { createApiClient } from "../utils/api";




export const DashboardService = {
    getDashboardstat : () => createApiClient(false).get(`/dashboard/get-dashboard-stats/landmark`,{
        headers:{
            'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
         }
    }),
    getMonthleySales : () => createApiClient(false).get(`/dashboard/get-monthly-sales/landmark`, {
        headers:{
           'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
        }
    }), 
    getTopVentures : () => createApiClient(false).get(`/dashboard/get-top-five-rgv/landmark`, {
        headers:{
           'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
        }
    }),

}