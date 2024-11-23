import { ChangePasswordData } from '@/interfaces/AppInterfaces';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAccountSlice, passwordChanged, editUserInfo } from '@/store/slices/accountSlice';
import React from 'react'
import useNavs from './useNavs';
import toast from 'react-hot-toast';
import useStorage from './useStorage';

const useSettings = () => {
    const dispatch = useAppDispatch();
    const settingSlice = useAppSelector(getAccountSlice);
    const { updateSessionData } = useStorage()

    const handleChangePassword = async (payload: ChangePasswordData) => {

        const changed = await dispatch(passwordChanged(payload));

        if (settingSlice.error) {
            toast.error(settingSlice.error);
        } else {
            toast.success("password changed successfully");
            // logout();
        }
    }

    const handleChangeInfo = async (payload: any) => {
        const userInfoEdited = await dispatch(editUserInfo(payload));

        // console.log("User info edited", userInfoEdited.payload);

        if (settingSlice.error) {
            return;
        }

        updateSessionData('UserData', 'user', userInfoEdited?.payload?.result?.user)

        toast.success("Updated successfully")
    }

    return (
        {
            loading: settingSlice.loading,
            handleChangePassword,
            handleChangeInfo

        }
    )
}

export default useSettings