import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/functions";


export const UserService = {
    editAdminDetails: (payload: any) => createApiClient(false).put("/users", payload),
    getAllRoles:() => createApiClient(false).get("/roles"),
    createUser: (payload: any) => createApiClient(false).post("/users/staff", payload),
    updateStaff: (payload: any, id:any) => {
      // const {id, ...params} = payload
     return createApiClient(false).put(`/users/staff/${id}`, payload)
    },
    getAllUsers: (payload:any) => createApiClient(false).get(`/users/staff${paramsObjectToQueryString(payload)}`),
    changePassword: (payload: any)=> createApiClient(false).put("/users/change-password", payload),
    blockStaff: (id: any) => createApiClient(false).put(`/users/block-staff/${id}`),
    unblockStaff: (id: any) => createApiClient(false).put(`/users/unblock-staff/${id}`)
  };
  