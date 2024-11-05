import { User } from "./AppInterfaces";
import { IBlogPayload } from "./ComponentInterfaces";

export interface UserSlice {
    loading: boolean;
    error: string | null;
    otp: string;
}

export interface ModalSlice {
    showOtpModal: boolean;
}
<<<<<<< HEAD
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
=======

>>>>>>> 5052d24 (blog module in progress)

export interface BlogSlice{
  posts: IBlogPayload[];
  loading: boolean;
  error: string | null;
}

export interface IUpdatePostPayload { 
    id: string;
    updatedPayload: Partial<IBlogPayload>;
}
<<<<<<< HEAD
>>>>>>> a0b671c (blog module in progress)
>>>>>>> 79bf557 (blog module in progress)
=======
>>>>>>> 5052d24 (blog module in progress)
