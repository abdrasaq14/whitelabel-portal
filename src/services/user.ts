import { createApiClient } from "../utils/api";


export const UserService = {
    editAdminDetails: (payload: any) => createApiClient(false).put("/users", payload),
    getAllRoles:() => createApiClient(false).get("/roles"),
    createUser: (payload: any) => createApiClient(false).post("/users/staff", payload),
    changePassword: (payload: any)=> createApiClient(false).put("users/change-password", payload)

  };
  