import React, { useEffect } from 'react'
import useStorage from './useStorage'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getDashboardSlice } from '@/store/slices/dashboardSlice'
import { statsData } from '@/store/slices/dashboardSlice'

const useDashboard = () => {

    const dispatch = useAppDispatch();
  
    const {currentUser} = useStorage();

    // console.log("Current user outside", currentUser)

    const dashboardSlice = useAppSelector(getDashboardSlice);

    const getStats = async () => {
        const dbData = await dispatch(statsData(currentUser?.whiteLabelName))
        console.log("Dashboard stats", dbData.payload)
    }

    useEffect(() => {
        getStats();
    }, []);

    return {
        
        stats: dashboardSlice.stats,

        // loading: dashboartSlice.loading
    }
}

export default useDashboard