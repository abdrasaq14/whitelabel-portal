"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAccountSlice } from '@/store/slices/accountSlice'
import { setEditMode } from '@/store/slices/accountSlice'

const useAccount = () => {

    const dispatch = useAppDispatch();
  
    const accountSlice = useAppSelector(getAccountSlice);

    const toggleEditMode = () => dispatch(setEditMode());

    return {
        
        editMode: accountSlice.disableMode,

        loading: accountSlice.loading,

        toggleEditMode
    }
}

export default useAccount