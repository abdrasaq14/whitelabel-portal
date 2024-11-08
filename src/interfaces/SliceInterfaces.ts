import { User } from "./AppInterfaces";
import { IBlogPayload } from "./ComponentInterfaces";

export interface DashboardSlice {
    loading: boolean;
    error: string | null;
    stats: any;
}

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

export interface BlogSlice{
  posts: IBlogPayload[];
  loading: boolean;
  error: string | null;
}

export interface IUpdatePostPayload { 
    id: string;
    updatedPayload: Partial<IBlogPayload>;
}
