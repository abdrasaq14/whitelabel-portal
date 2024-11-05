import { User } from "./AppInterfaces";

export interface UserSlice {
    loading: boolean;
    error: string | null;
    otp: string;
}

export interface ModalSlice {
    showOtpModal: boolean;
}

export interface NavSlice {
    messageCounter: number;
    newNotification: boolean;
    breadcrumb: string;
    isOpen: boolean;
    showLogoutModal: boolean;
    activeLabel: string;
}