import { createApiClient } from "../utils/api";

export interface customisationData {
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    footerColor: string;
  };
  image?: {
    logo: string;
    favicon: string;
  };
  aboutUs?: {
    shortText: string;
    longText: string;
    coreValues: {
      title: string;
      icon: string;
    }[];
  };
  domain?: string;
  socialMedia?: {
    title: string;
    link: string;
  }[];
  banner?: {
    text: string;
    imageUrl: string;
    template: string;
  };
  contact?: {
    phone: string;
    email: {
      supportEmail: string;
      senderEmail: string;
    };
    address: string;
  };
  services?: string[];
  completeSetup?: "ongoing" | "propagating" | "completed";
  stage?: number;
}

export const CustomisationService = {
  createCustomisation: (payload: customisationData) =>
    createApiClient(false).put(`/customisation/`, payload)
};