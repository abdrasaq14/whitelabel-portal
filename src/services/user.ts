import { createApiClient } from "../utils/api";


export const UserService = {
    editAdminDetails: (payload: any) => createApiClient(false).put("/users", payload),
    getAllRoles:() => createApiClient(false).get("/roles"),
  };
  