import { createApiClient } from "../utils/api";




export const DashboardService = {
    getDashboardstat: (payload:any) => createApiClient(false).get(`/dashboard/get-dashboard-stats/${payload}`, {
        headers: {
            'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
        }
    }),
    getMonthleySales: (payload:any) => createApiClient(false).get(`/dashboard/get-monthly-sales/${payload}`, {
        headers: {
            'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
        }
    }),
    getTopVentures: (payload:any) => createApiClient(false).get(`/dashboard/get-top-five-rgv/${payload}`, {
        headers: {
            'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
        }
    }),
    // getTotalInventories: () => createApiClient(false).get(`/dashboard/get-top-five-rgv/landmark`, {
    //     headers: {
    //         'CLIENT-PARTNER-KEY': 'A&5FeeGhuiQkh3TYqrI3aabTye'
    //     }
    // }),

}