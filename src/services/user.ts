import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";


export const UserService = {
    editAdminDetails: (payload: any) => createApiClient(false).put("/users", payload),
    getAllRoles:() => createApiClient(false).get("/roles"),
    createUser: (payload: any) => createApiClient(false).post("/users/staff", payload),
    getAllUsers: (payload:any) => createApiClient(false).get(`/users/staff${paramsObjectToQueryString(payload)}`),
    changePassword: (payload: any)=> createApiClient(false).put("users/change-password", payload)

  };
  