import { User } from "./AppInterfaces";
import { IBlogPayload } from "./ComponentInterfaces";

interface StaffListResult {
    limit: number;
    page: number;
    results: any[];
    totalPages: number;
    totalResults: number;
}

export interface AccountSlice {
    loading: boolean;
    error: string | null;
    disableMode: boolean;
    staffsResult: StaffListResult | null
}

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
<<<<<<< HEAD
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
=======
    showStaffInfoModal: boolean;
    activeStaff: User | null;
    showCreateStaffModal: boolean;
}

export interface UploadSlice {
    loading: boolean;
    error: string | null;
    uploading: boolean;
    imageHolder: string | null
}
<<<<<<< HEAD
>>>>>>> 4f4649d (Account completed)
=======



export interface BlogSlice{
  posts: IBlogPayload[];
  loading: boolean;
  error: string | null;
}

export interface IUpdatePostPayload { 
    id: string;
    updatedPayload: Partial<IBlogPayload>;
}

>>>>>>> cb4d2a9 (blog module in progress)
