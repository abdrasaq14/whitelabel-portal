"use client"
import { AdminAccountInfo, User } from '@/interfaces/AppInterfaces'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAccountSlice, setEditMode, editUserInfo, usersFetched, staffCreated } from '@/store/slices/accountSlice'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import useStorage from './useStorage'
import { staffUpdated } from '@/store/slices/uploadSlice'
import { Constants } from '@/utilities/constants'
import useModal from './useModal'
import { closeCreateStaffModal } from '@/store/slices/modalSlice'

const useAccount = () => {

    const dispatch = useAppDispatch();
  
    const accountSlice = useAppSelector(getAccountSlice);

    const toggleEditMode = () => dispatch(setEditMode());

    const {updateSessionData, currentUser} = useStorage();

    const {handleCloseModal} = useModal();

    useEffect(() => {if (!accountSlice.staffsResult) handleFetchUsers()}, []);

    useEffect(() => {

        if(accountSlice.error){

            toast.error(accountSlice.error);

        }

    }, [accountSlice.error])

    const handleEditUserInfo = async (payload: AdminAccountInfo) => {
        
        const adminInfoPayload = {
            
            representative: {
              
                fullName: payload?.adminName,
              
                email: payload?.adminEmail,
              
                phoneNumber: payload?.adminPhoneNumber,
            
            },
            
            email: payload?.companyEmail,
            
            businessName: payload?.companyName,
            
            phoneNumber: payload?.companyPhoneNumber,
            
            address: payload?.companyAddress
        
        }

        const userInfoEdited = await dispatch(editUserInfo(adminInfoPayload));
        
        // console.log("User info edited", userInfoEdited.payload);

        if(accountSlice.error){
            return;
        }

        updateSessionData('UserData', 'user', userInfoEdited?.payload?.result?.user)

        toast.success("User updated successfully")
    }

    const handleFetchUsers = async () => await dispatch(usersFetched())

    const handleUpdateStaff = async (payload: User, id: string | undefined) => {
        
        console.log("UpdateStaff", payload, id)

        const payloadCopy = {...payload};

        payloadCopy.roleId = payload.role === "SuperAdmin" ? Constants.roles.SuperAdmin.id : payload.role === "Admin" ? Constants.roles.Admin.id : Constants.roles.Staff.id;
        
        const staffInfoEdited = await dispatch(staffUpdated({payloadCopy, id}))

        console.log("DB response", staffInfoEdited.payload)

        if(staffInfoEdited?.payload?.status === 'Failed'){
            
            toast.error("Image upload error")
            
            return;
        }

        // updateSessionData('UserData', 'user', staffInfoEdited?.payload?.result?.user)

        toast.success("Updated successfully")
    }

    const handleCreateStaff = async (payload: User) => {
        
        // console.log("About to process", payload);

        const payloadCopy = {...payload};

        payloadCopy.roleId = payload.role === "SuperAdmin" ? Constants.roles.SuperAdmin.id : payload.role === "Admin" ? Constants.roles.Admin.id : Constants.roles.Staff.id;

        const createStaff = await dispatch(staffCreated(payloadCopy));

        // console.log("Staff created", createStaff.payload)

        if(createStaff?.payload?.status === 'Failed'){
            
            toast.error(createStaff?.payload?.message)
            
            return;
        
        }

        // await dispatch(updateStaffList(createStaff?.payload?.result?.user))

        toast.success("Succefully added")

        handleCloseModal(closeCreateStaffModal);

    }

    const handleCopyLink = () => {
        
        const link = `${Constants.profitAllUrl}${currentUser?.user?._id}`;
        
        navigator.clipboard
        
        .writeText(link)
        
        .then(() => {
        
            toast.success("Link copied to clipboard");
        
        })
        
        .catch((err) => {
        
            toast.error("Failed to copy: ");
        
        });
    
    }

    return {
        
        editMode: accountSlice.disableMode,

        loading: accountSlice.loading,

        staffsResult: accountSlice.staffsResult,

        toggleEditMode,

        handleEditUserInfo,

        handleUpdateStaff,

        handleCreateStaff,

        handleCopyLink
    }
}

export default useAccount
