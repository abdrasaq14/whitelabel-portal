import { ModalSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthService} from '@/services/auth'; 
import { RootState } from '../store';
  
//initial state
const initialState: ModalSlice = {
    showOtpModal: false,
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
        }
    }
})

export const {openOtpModal, closeOtpModal} = modalSlice.actions;

export default modalSlice.reducer;

//selectors
export const getModalSlice = (state: RootState) => state.modal