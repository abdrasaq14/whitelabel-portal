import { User } from "./AppInterfaces";

export interface UserSlice {
    loading: boolean;
    userData: User | null;
    error: string | null;
}