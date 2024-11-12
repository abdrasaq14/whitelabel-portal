import React from 'react'
import useNavigation from './useNavigation'
import useStorage from './useStorage'
import { closeCreateStaffModal, closeStaffInfoModal, getNavSlice, openCreateStaffModal, openStaffInfoModal, setActiveLabel } from '@/store/slices/navSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleSideNav, closeLogoutModal, openLogoutModal } from '@/store/slices/navSlice'

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

    const handleCloseLogoutModal = () => dispatch(closeLogoutModal())

    const handleOpenLogoutModal = () => dispatch(openLogoutModal())

    const handleCloseStaffInfoModal = () => dispatch(closeStaffInfoModal())

    const handleOpenStaffInfoModal = (activeStaff: any) => dispatch(openStaffInfoModal(activeStaff))

    const handleCloseCreateStaffModal = () => dispatch(closeCreateStaffModal())

    const handleOpenCreateStaffModal = () => dispatch(openCreateStaffModal())

    const handleSetActiveLabel = (label: string) => dispatch(setActiveLabel(label))

    return {
        
        logout,
        
        isOpen: navSlice.isOpen,
        
        toggleNav,
        
        showLogoutModal: navSlice.showLogoutModal,

        showStaffInfoModal: navSlice.showStaffInfoModal,

        showCreateStaffModal: navSlice.showCreateStaffModal,
        
        handleCloseLogoutModal,
        
        handleOpenLogoutModal,

        handleCloseStaffInfoModal,

        handleOpenStaffInfoModal,

        handleCloseCreateStaffModal,

        handleOpenCreateStaffModal,

        activeLabel: navSlice.activeLabel,

        handleSetActiveLabel,

        currentUser,

        activeStaff: navSlice.activeStaff
    }
}

export default useNavs