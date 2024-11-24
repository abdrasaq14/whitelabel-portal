import { IBlogPayload } from "./ComponentInterfaces";

export interface UserLogin {
    email: string;
    password: string;
    platform: string;
}

export interface ApiResponse {
    status: string;
    message?: string;
    result?: any;
}

export interface CustomisationData {
    theme: {
        primaryColor: string;
        secondaryColor: string;
        footerColor: string;
    };
    image: {
        logo: string;
        favicon: string;
    };
    aboutUs: {
        shortText: string;
        longText: string;
        coreValues: {
            title: string;
            icon: string;
        }[];
    };
    domain: string;
    socialMedia: {
        title: string;
        link: string
    }[];
    banner: {
        text: string;
        imageUrl: string;
        template: string;
    };
    contact: {
        phone: {
            cCode: string,
            val: string
        };
        email: {
            supportEmail: string;
            senderEmail: string;
        };
        address: string;
    };
    services: [{
        id: number;
        name: string;
    }];
    blogHero: {
        text: string;
        imageUrl: string;
    },
    completeSetup: "ongoing" | "propagating" | "completed";
    stage: number;
}

export interface User {
    authToken: string;
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    whiteLabelId: string;
    roleId: string;
    role: string;
    resetToken?: string | null;
    resetTokenExpiration?: Date | null;
    buinessName: string;
    phoneNumber: string;
    apiKey: string;
    currency: string;
    language: string;
    commisionPecentage: string;
    marketSize: string;
    commisionDescription: string;
    companyLogo: string;
    otpEnabled: string;
    contractAgreement: string;
    hasBeenPosted: boolean;
    location: Location;
    representative: {
        fullName: string;
        phoneNumber: string;
        email: string;
    };
    isEmailVerified: boolean;
    address: string;
    permissions: string[];
    image: string;
    deliveryAddress: {
        address: string;
        latitude: string;
        longitude: string;
        state: string;
    };
    customisationData?: CustomisationData;
    blocked: boolean;
    whiteLabelName: string;
    _doc?: User;
}

export interface Otp {
    otp: string;
    otpReceiver: string;
}
export interface HandlePreviewPayload extends IBlogPayload {
  isFromEdit: boolean;
}
export interface IQueryParams {
    id?: string;
    merchantId?: string;
    whiteLabelName?: string;
    whiteLabelId?: string;
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    category?: string;
}
export interface HandlePreviewPayload extends IBlogPayload {
  isFromEdit: boolean;
}
export interface IQueryParams {
    whiteLabelName?: string;
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    category?: string;
}
export interface AdminAccountInfo {
    companyName: string;
    companyEmail: string;
    adminName: string;
    adminEmail: string;
    companyPhoneNumber: string;
    adminPhoneNumber: string;
    companyAddress: string;
}

export interface Inventory {
    name: string;
    image: string;
    categoryName: string,
    quantityIn: number;
    quantityOut: number;
    unitPrice: number;
    whiteLabelName: string;
    createdBy: string;
    stockHistory: Array<{
        quantityIn: number;
        quantityOut: number;
        quantityAdded: number;
        updatedBy: string
    }>;
    priceHistory: Array<{
        oldPrice: number;
        newPrice: number;
        updatedBy: string;
    }>;
    nameHistory: Array<{
        oldName: string;
        newName: string;
        updatedBy: string;
    }>
}

export interface InventoryCategory {
    name: string;
    whiteLabelName: string;
    createdBy: string;
}
export interface ChangePasswordData {
    password: string,
    oldPassword: string,
    confirmPassword: string,
}
export interface HandlePreviewPayload extends IBlogPayload {
  isFromEdit: boolean;
}
export interface IQueryParams {
  whiteLabelName?: string;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalResults?: number;
  search?: string;
  status?: string;
}

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
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
  };
  banner?: {
    text: string;
    imageUrl: string;
    template: string;
  };
  blogHero?: {
    text: string;
    imageUrl: string;
  };
  contact?: {
    phone?: { cCode?: string; val?: string };
    email?: {
      supportEmail?: string;
      senderEmail?: string;
    };
    address?: string;
  };
  services?: string[];
  completeSetup?: string;
  stage?: number;
}