import { useEffect } from 'react'
import { UserLogin} from '@/interfaces/AppInterfaces'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userLogin } from '@/store/slices/authSlice'
import { getAuthSlice } from '@/store/slices/authSlice'

const useAuth = () => {
    const authSlice = useAppSelector(getAuthSlice);
    const dispatch = useAppDispatch();

    // useEffect(() => {console.log("Authslice", authSlice)}, [authSlice.loading])

    const handleLogin = async (values: UserLogin) => {
        console.log("Login details", values)
        const logUserIn = await dispatch(userLogin({...values, platform: "portal"}));
        console.log("Login result hook", logUserIn)
    }

    return {
        handleLogin,
        loading: authSlice.loading
    }
}

export default useAuth