import useNavigation from './useNavigation'
import useStorage from './useStorage'
import { getNavSlice, toggleSideNav, newNotification, notification, setActiveNotification, notificationUpdated } from '@/store/slices/navSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import useModal from './useModal'
import { closeNotificationModal } from '@/store/slices/modalSlice'

const useNavs = () => {
    
    const dispatch = useAppDispatch();

    const { clearSessionData, clearLocalData, currentUser } = useStorage();
    
    const { windowRedirect, push } = useNavigation();

    const { handleCloseModal } = useModal();

    const navSlice = useAppSelector(getNavSlice);

    const toggleNav = () => dispatch(toggleSideNav());

    useEffect(() => {
        
        const fetchNewNotifications = async () => {
            await dispatch(newNotification())
        }

        if(navSlice.newNotifications === null){
            fetchNewNotifications()            
        }

    }, [navSlice.newNotifications])

    useEffect(() => {
        
        const fetchNotifications = async () => {
            await dispatch(notification())
        }

        if(navSlice.notifications === null){
            fetchNotifications()            
        }

    }, [navSlice.notifications])

    const logout = () => {
        
        clearSessionData();
        
        clearLocalData();
        
        windowRedirect('/Login');
    
    }

    const viewNotification = async (notificationId: string) => {

        // console.log(notificationId);

        dispatch(setActiveNotification(notificationId))

        handleCloseModal(closeNotificationModal)

        await dispatch(notificationUpdated(notificationId))

        push(`/Notifications?id=${notificationId}`)

    }

    // const updateNotification = async (notificationId: string) => await dispatch(notificationUpdated(notificationId))

    return {
        
        logout,
        
        isOpen: navSlice.isOpen,
        
        toggleNav,

        currentUser,

        newNotifications: navSlice.newNotifications,

        viewNotification,

        notifications: navSlice.notifications,

        activeNotification: navSlice.activeNotification
    }
}

export default useNavs