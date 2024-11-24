import { ModalSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
  
//initial state
const initialState: ModalSlice = {
    showOtpModal: false,
    
    showAddInventoryModal: false,
    showViewInventoryModal: false,
    showInventoryHistoryModal: false,
    showInventoryRequestModal: false,
    showDialogModal: false,
    showEditInventoryModal: false,
    
    showLogoutModal: false,
    
    showStaffInfoModal: false,
    showCreateStaffModal: false,

    showNotificationModal: false,
    
    activeStaff: null,
    
    activeInventoryHistory: null,
    activeInventory: null,
    activeInventoryRequest: null
};

//Slice
const modalSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        openOtpModal: (state) => {
            state.showOtpModal = true;
        },
        closeOtpModal: (state) => {
            state.showOtpModal = false;
        },
        
        openLogoutModal: (state) => {
            state.showLogoutModal = true;
        },
        closeLogoutModal: (state) => {
            state.showLogoutModal = false;
        },
        
        openStaffInfoModal: (state, action) => {
            state.activeStaff = action.payload;
            state.showStaffInfoModal = true;
        },
        closeStaffInfoModal: (state) => {
            state.showStaffInfoModal = false;
        },
        
        openCreateStaffModal: (state) => {
            state.showCreateStaffModal = true;
        },
        closeCreateStaffModal: (state) => {
            state.showCreateStaffModal = false;
        },
        
        openAddInventoryModal: (state) => {
            state.showAddInventoryModal = true;
        },
        closeAddInventoryModal: (state) => {
            state.showAddInventoryModal = false;
        },
        
        openInventoryHistoryModal: (state, action) => {
            state.activeInventoryHistory = action.payload;
            state.showInventoryHistoryModal = true;
        },
        closeInventoryHistoryModal: (state) => {
            state.showInventoryHistoryModal = false;
        },
        
        openInventoryRequestModal: (state, action) => {
            state.activeInventoryRequest = action.payload;
            state.showInventoryRequestModal = true;
        },
        closeInventoryRequestModal: (state) => {
            state.showInventoryRequestModal = false;
        },

        openViewInventoryModal: (state, action) => {
            state.activeInventory = action.payload;
            state.showViewInventoryModal = true;
        },
        closeViewInventoryModal: (state) => {
            state.showViewInventoryModal = false;
        },

        openDialogModal: (state) => {
            state.showDialogModal = true;
        },
        closeDialogModal: (state) => {
            state.showDialogModal = false;
        },

        openEditInventoryModal: (state) => {
            state.showEditInventoryModal = true;
        },
        closeEditInventoryModal: (state) => {
            state.showEditInventoryModal = false;
        },

        openNotificationModal: (state) => {
            // console.log('Redux open')
            state.showNotificationModal = true;
        },
        closeNotificationModal: (state) => {
            // console.log('redux close')
            state.showNotificationModal = false;
        }
    }
})

export const {
    openOtpModal, 
    closeOtpModal, 
    openAddInventoryModal, 
    openStaffInfoModal, 
    closeStaffInfoModal, 
    openCreateStaffModal, 
    closeCreateStaffModal, 
    closeLogoutModal, 
    openLogoutModal, 
    closeAddInventoryModal, 
    openInventoryHistoryModal, 
    closeInventoryHistoryModal,
    openInventoryRequestModal,
    closeInventoryRequestModal,
    openViewInventoryModal,
    closeViewInventoryModal,
    openDialogModal,
    closeDialogModal,
    openEditInventoryModal,
    closeEditInventoryModal,
    openNotificationModal,
    closeNotificationModal
} = modalSlice.actions;

export default modalSlice.reducer;

//selectors
export const getModalSlice = (state: RootState) => state.modal