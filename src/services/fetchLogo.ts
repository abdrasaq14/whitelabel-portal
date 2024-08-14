import { createApiClient } from "../utils/api";

export const FetchLogoService = {
  fetchLogo: (domain: string) =>
    createApiClient(false).get(`/customisation/fetch/?domain=${domain}`),
};