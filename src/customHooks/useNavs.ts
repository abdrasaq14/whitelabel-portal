import useNavigation from './useNavigation'
import useStorage from './useStorage'
import { getNavSlice, toggleSideNav } from '@/store/slices/navSlice'
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

    return {
        
        logout,
        
        isOpen: navSlice.isOpen,
        
        toggleNav,

        currentUser
    }
}

export default useNavs