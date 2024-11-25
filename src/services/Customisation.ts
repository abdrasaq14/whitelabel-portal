import { CustomisationData } from "@/interfaces/AppInterfaces";
import apiClient from "./client";

const baseEndPoint = "/customisation";
export const CustomisationService = {
  create: (payload: CustomisationData) =>
    apiClient.put(`${baseEndPoint}/customisation/`, payload),
  update: (payload: CustomisationData) =>
    apiClient.put(`${baseEndPoint}/customisation/update-profile`, {
      customisationData: payload,
    }),
};


