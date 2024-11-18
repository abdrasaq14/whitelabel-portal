import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getModalSlice } from '@/store/slices/modalSlice';

const useModal = () => {
    const modalSlice = useAppSelector(getModalSlice);
    
    const dispatch = useAppDispatch();

    // const handleOpenStaffInfoModal = (activeStaff: any) => dispatch(openStaffInfoModal(activeStaff))

    const handleOpenModal = (openModal: any, payload?: any) => {

        // console.log("payload", payload);
        
        payload ? dispatch(openModal(payload)) : dispatch(openModal())
    
    }

    const handleCloseModal = (closeModal: any) => {
        
        dispatch(closeModal())
    
    }

    return {
        showOtpModal: modalSlice.showOtpModal,
        
        handleCloseModal,

        handleOpenModal,

        showLogoutModal: modalSlice.showLogoutModal,

        showStaffInfoModal: modalSlice.showStaffInfoModal,

        showCreateStaffModal: modalSlice.showCreateStaffModal,

        activeStaff: modalSlice.activeStaff,

        activeInventoryHistory: modalSlice.activeInventoryHistory,

        activeInventoryRequest: modalSlice.activeInventoryRequest,

        activeInventory: modalSlice.activeInventory,

        showAddInventoryModal: modalSlice.showAddInventoryModal,

        showInventoryHistoryModal: modalSlice.showInventoryHistoryModal,

        showInventoryRequestModal: modalSlice.showInventoryRequestModal,

        showViewInventoryModal: modalSlice.showViewInventoryModal,

        showDialogModal: modalSlice.showDialogModal,

        showEditInventoryModal: modalSlice.showEditInventoryModal,
    }
}

export default useModal