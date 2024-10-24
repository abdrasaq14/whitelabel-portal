import { User } from "./AppInterfaces";
import { IBlogPayload } from "./ComponentInterfaces";

export interface UserSlice {
    loading: boolean;
    error: string | null;
<<<<<<< HEAD
    otp: string;
}

export interface ModalSlice {
    showOtpModal: boolean;
}
<<<<<<< HEAD

export interface NavSlice {
    messageCounter: number;
    newNotification: boolean;
    breadcrumb: string;
    isOpen: boolean;
    showLogoutModal: boolean;
    activeLabel: string;
}
=======
=======
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
>>>>>>> a0b671c (blog module in progress)
>>>>>>> 79bf557 (blog module in progress)
