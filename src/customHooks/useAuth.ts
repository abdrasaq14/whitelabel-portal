"use client"
import { useEffect, useState } from 'react'
import { UserLogin } from '@/interfaces/AppInterfaces'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userLogin, otpVerified } from '@/store/slices/authSlice'
import { getAuthSlice } from '@/store/slices/authSlice'
import useNavigation from './useNavigation'
import { setOtpValue } from '@/store/slices/authSlice'
import useStorage from './useStorage'
import toast from 'react-hot-toast'

const useAuth = () => {
    const { storeLocalData, storeSessionData } = useStorage();

    const { push } = useNavigation();

    const authSlice = useAppSelector(getAuthSlice);

    const dispatch = useAppDispatch();

    const [time, setTime] = useState(29);

    useEffect(() => {

        if (authSlice.error) {

            toast.error(authSlice.error);

        }

    }, [authSlice.error])

    useEffect(() => {

        if (time > 0) {

            const timerId = setTimeout(() => {

                setTime(time - 1);

            }, 1000);

            // Cleanup function to clear the timeout if the component unmounts or time changes
            return () => clearTimeout(timerId);
        }

    }, [time]);

    const resendOtp = () => {

        setTime(29);

    }

    const handleLogin = async (values: UserLogin) => {

        // console.log("Login details", values)

        const logUserIn = await dispatch(userLogin({ ...values, platform: "portal" }));

        // console.log("Login result hook", logUserIn?.payload)

        const { result } = logUserIn?.payload;

        if (result.otpMessage) {

            //Store email to localstorage as otp receiver
            storeLocalData("otpReceiver", values.email)

            push("/Authenticate")

        } else {
            console.log(result)
            handleUserData(result)

        }

    }

    const handleUserData = (result: any) => {
        storeSessionData('UserData', JSON.stringify(result))
        push('/Dashboard')
    }

    const setOtp = (otp: any) => {

        dispatch(setOtpValue(otp))

    }

    const verifyOtp = async (length: number, otpReceiver: string) => {

        // console.log("Otp", authSlice.otp)

        const otp = authSlice.otp;

        const otpLength = otp.length;

        if (otpLength !== length) {

            toast.error(`Otp must be atleast ${length} digits`)

            return;

        }

        const verified = await dispatch(otpVerified({ otp, otpReceiver }))

        if (verified?.payload?.status === "Failed") {
            return;
        }

        const { result } = verified.payload;

        // console.log("After verified", result);

        storeSessionData('UserData', JSON.stringify(result))

        push('/Dashboard')

    }

    return {
        handleLogin,

        loading: authSlice.loading,

        setOtp,

        otp: authSlice.otp,

        verifyOtp,

        resendOtp,

        time
    }
}

export default useAuth