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
    showStaffInfoModal: boolean;
    activeStaff: User | null;
    showCreateStaffModal: boolean;
    }

export interface BlogSlice {
  posts: {
    all: IBlogPayload[];
    draft: IBlogPayload[];
    published: IBlogPayload[];
  };
  counts: {
    total: number;
    draft: number;
    published: number;
  };
  loading: boolean;
  error: string | null;
}

export interface IUpdatePostPayload { 
    id: string;
    updatedPayload: Partial<IBlogPayload>;
}

export interface UploadSlice {
    loading: boolean;
    error: string | null;
    uploading: boolean;
    imageHolder: string | null
}


export interface IUpdatePostPayload { 
    id: string;
    updatedPayload: Partial<IBlogPayload>;
}

