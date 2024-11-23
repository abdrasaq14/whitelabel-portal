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

interface ApiListResponse {
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
    staffsResult: ApiListResponse | null
}

export interface DashboardSlice {
    loading: boolean;
    error: string | null;
    stats: any;
}

export interface InventorySlice {
    loading: boolean;
    error: string | null;
    inventoriesResult: ApiListResponse | null;
    inventoryRequestResult: ApiListResponse | null;
    requestHistoryResult: ApiListResponse | null;
}

export interface MessageSlice {
    loading: boolean;
    error: string | null;
    conversationsResult: ApiListResponse | null;
    activeConversation: any;
    activePartner: any;
    messageLoading: boolean;
    messagesResult: any;
    sendLoading: boolean;
}

export interface UserSlice {
    loading: boolean;
    error: string | null;
    otp: string;
}

export interface ModalSlice {
    showOtpModal: boolean;
    showAddInventoryModal: boolean;
    showViewInventoryModal: boolean;
    showInventoryHistoryModal: boolean;
    showInventoryRequestModal: boolean;
    showDialogModal: boolean;
    showEditInventoryModal: boolean;
    showLogoutModal: boolean;
    showStaffInfoModal: boolean;
    showCreateStaffModal: boolean;
    showNotificationModal: boolean;
    activeStaff: User | null;
    activeInventoryHistory: any;
    activeInventoryRequest: any;
    activeInventory: any;
}

export interface SettingSlice {
    loading: boolean;
    error: string | null;
}


export interface NavSlice {
    messageCounter: number;
    newNotifications: null | any[];
    breadcrumb: string;
    isOpen: boolean;
    error: string | null;
    notifications: null | any[];
    activeNotification: any;
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
    totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface IProductSlice{
    products: {
        all: any[];
        blocked: any[];
    };
    total: number;
    loading: boolean;
    error: null | string;
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


