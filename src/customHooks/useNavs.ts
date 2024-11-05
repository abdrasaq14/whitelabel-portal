import React from 'react'
import useNavigation from './useNavigation'
import useStorage from './useStorage'
import { getNavSlice, setActiveLabel } from '@/store/slices/navSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleSideNav, closeLogoutModal, openLogoutModal } from '@/store/slices/navSlice'

const useNavs = () => {
    
    const dispatch = useAppDispatch();

    const { clearSessionData, clearLocalData } = useStorage();
    
    const { windowRedirect } = useNavigation();

    const navSlice = useAppSelector(getNavSlice);

    const toggleNav = () => dispatch(toggleSideNav());

    const logout = () => {
        
        clearSessionData();
        
        clearLocalData();
        
        windowRedirect('/Login');
    
    }

    const handleCloseLogoutModal = () => dispatch(closeLogoutModal())

    const handleOpenLogoutModal = () => dispatch(openLogoutModal())

    const handleSetActiveLabel = (label: string) => dispatch(setActiveLabel(label))

    return {
        
        logout,
        
        isOpen: navSlice.isOpen,
        
        toggleNav,
        
        showLogoutModal: navSlice.showLogoutModal,
        
        handleCloseLogoutModal,
        
        handleOpenLogoutModal,

        activeLabel: navSlice.activeLabel,

        handleSetActiveLabel
    }
}

export default useNavs