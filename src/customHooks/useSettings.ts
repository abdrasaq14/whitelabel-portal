import { ChangePasswordData } from '@/interfaces/AppInterfaces';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAccountSlice, passwordChanged } from '@/store/slices/accountSlice';
import React from 'react'
import useNavs from './useNavs';
import toast from 'react-hot-toast';

const useSettings = () => {
    const dispatch = useAppDispatch();
    const settingSlice = useAppSelector(getAccountSlice);

    const { logout } = useNavs();

    const handleChangePassword = async (payload: ChangePasswordData) => {

        const changed = await dispatch(passwordChanged(payload));

        if (settingSlice.error) {
            toast.error(settingSlice.error);
        } else {
            toast.success("password changed successfully");
            // logout();
        }
    }

    return (
        {
            loading: settingSlice.loading,
            handleChangePassword

        }
    )
}

export default useSettings