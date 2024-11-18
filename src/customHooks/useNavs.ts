import React from 'react'
import useNavigation from './useNavigation'
import useStorage from './useStorage'
import { getNavSlice, setActiveLabel, toggleSideNav } from '@/store/slices/navSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

const useNavs = () => {
    
    const dispatch = useAppDispatch();

    const { clearSessionData, clearLocalData, currentUser } = useStorage();
    
    const { windowRedirect } = useNavigation();

    const navSlice = useAppSelector(getNavSlice);

    const toggleNav = () => dispatch(toggleSideNav());

    const logout = () => {
        
        clearSessionData();
        
        clearLocalData();
        
        windowRedirect('/Login');
    
    }

    const handleSetActiveLabel = (label: string) => dispatch(setActiveLabel(label))

    return {
        
        logout,
        
        isOpen: navSlice.isOpen,
        
        toggleNav,

        activeLabel: navSlice.activeLabel,

        handleSetActiveLabel,

        currentUser
    }
}

export default useNavs