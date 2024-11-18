import { Inventory, User } from "./AppInterfaces";

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
    activeStaff: User | null;
    activeInventoryHistory: any;
    activeInventoryRequest: any;
    activeInventory: any;
}

export interface NavSlice {
    messageCounter: number;
    newNotification: boolean;
    breadcrumb: string;
    isOpen: boolean;
    activeLabel: string;
}

export interface UploadSlice {
    loading: boolean;
    error: string | null;
    uploading: boolean;
    imageHolder: string | null
}