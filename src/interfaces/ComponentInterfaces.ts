import { ButtonType, ModalHeaderType, TextboxType, ModalFooterType, CardType, SpinnerType, ModalType } from "@/enums/ComponentEnums";
import {  FieldAttributes, FormikHandlers } from "formik";
import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
import { User } from "./AppInterfaces";


interface LoaderProps {
    loading?: boolean;
    width?: number;
    height?: number;
    type?: SpinnerType;
}
export interface ButtonProps {
    type: ButtonType;
    icon?: IconType | null;
    iconPosition?: "left" | "right";
    style?: string | null;
    text: string;
  loader?: LoaderProps | null;
  disabled?: boolean;
    handleClick: () => void;
}

export interface AppTextBoxProps {
    leftIcon?: IconType | null;
    rightIcon?: IconType | null;
    placeholder?: string;
    topLabel?: string | null | ReactElement;
    bottomLabel?: string | null | ReactElement;
    type: TextboxType;
    disabled?: boolean;
    name: string;
    value: string;
    onChange: FormikHandlers['handleChange']
    onBlur: FormikHandlers['handleBlur']
}

export interface AppSelectBoxProps {
    topLabel?: string | null | ReactElement;
    bottomLabel?: string | null | ReactElement;
    disabled?: boolean;
    name: string;
    value: string;
    onChange: FormikHandlers['handleChange'];
    onBlur: FormikHandlers['handleBlur'];
    children: any;
}

interface AppModalHeader {
    title: string;
    subtitle?: string;
    type: ModalHeaderType;
}

interface AppModalFooter {
    type: ModalFooterType;
    cancelButton: ButtonProps;
    submitButton: ButtonProps;
}

export interface AppModalProps {
    children?: ReactNode;
    header?: AppModalHeader | null;
    footer?: AppModalFooter | null;
    hasClose?: boolean;
    isOpen?: boolean;
    closeClicked?: () => void;
    style?: string;
    type?: ModalType;
}

export interface CardProps {
    children?: ReactNode;
    type: CardType;
}

export interface AppCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export interface ValidationErrorProps {
    icon?: IconType | null;
    message: string;
}

export interface SpinnerProps {
    type?: SpinnerType;
    width?: number;
    height?: number;
}

export interface OtpProps {
    length: number;
    prompt?: string;
}

export interface SideItem {
    name: string;
    path?: any;
    iconName?: string;
    children?: SideItem[];
}

export interface SideNavItemChild {
    label: string; 
    href: string
}
export interface SideNavItem {
    children?: SideNavItemChild[] | undefined;
    label: string;
    href: string;
    icon: any;
    counter?: number;
}

export interface SideNavProps {
    items: SideNavItem[];
    isOpen: boolean;
    currentUser: any;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    showLogoutModal: boolean;
    logout: () => void;
}

export interface FileUploadProps {
  name: string;
  wrapperClass?: string;
  extraClass?: string;
  disabled?: boolean;
  onFileChange?: (file: File) => void;
  children?: React.ReactNode;
  fileType?: "image" | "document";
  setIsBlogEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IToggleInputProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface SideNavItemChild {
    label: string; 
    href: string
}
export interface SideNavItem {
    children?: SideNavItemChild[] | undefined;
    label: string;
    href: string;
    icon: any;
}

export interface SideNavProps {
    items: SideNavItem[];
}

export interface FileUploadProps {
  name: string;
  wrapperClass?: string;
  extraClass?: string;
  disabled?: boolean;
  onFileChange?: (file: File) => void;
  children?: React.ReactNode;
  fileType?: "image" | "document";
  setIsBlogEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUseBlogBostProps {
  id?: string;
}
export interface IBlogPayload {
  _id?: string;
  authorId: string;
  title: string;
  content: string;
  // date?: string;
  image: string;
  comments: IComments[];
  likes: number;
  shares: number;
  allowComments: boolean;
  allowLikes: boolean;
  status: string;
  whiteLabelName: string;
  publishedDate?: string;
}

export interface IPreviewPayload extends IBlogPayload {
  isFromEdit: boolean;
}
export interface IComments {
  _id?: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
}

export interface ITextInputProps extends FieldAttributes<any> {
  title: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "date";
  icon?: React.ReactNode;
  wrapperClass: string;
  inputClass?: string;
}
export interface FileUploadProps {
  name: string;
  wrapperClass?: string;
  extraClass?: string;
  disabled?: boolean;
  type: "text" | "date";
  icon?: React.ReactNode;
  inputClass?: string;
}

export interface IToggleInputProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}
export interface StatsCardActionButton {
    text: string;
    action: () => void;
}

export interface StatsCardProps {
    title: string;
    icon: ReactElement;
    value: string;
    actionButtons?: StatsCardActionButton[] | null;
    loading: boolean;
}

export interface NoDataFoundProps {
    image: any;
    text: string;
}

export interface SummaryCardProps {
    title: string;
    actionButtons?: StatsCardActionButton[] | null;
    loading: boolean;
    children: any
}

interface BarGraphData {
    colors: string[];
    xAxisLabel: string[];
    stacked: boolean;
    seriesData: {
        name: string;
        data: number[];
    }[]
}

export interface BarGraphProps {
    data: BarGraphData
}

interface Tab {
    label: string;
    content: React.ReactNode;
    counter?: number;
}
  
export interface TabsProps {
    tabs: Tab[];
}

export interface AccountForm {
    currentUser: User
}

export interface DocumentUploadProps {
    uploadInterface: ReactElement;
    validFormats: string;
    callback: (arg0: string, arg1?: any) => void;
    otherData?: any | null
}

export interface ChangeLogoButtonProps {
    loader: LoaderProps | null
}

export interface ChangeStaffImageProps {
    loader: LoaderProps | null,
    image: string | null | undefined
}

export interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

interface TableColumn {
    key: string;
    label: string;
    render?: (data: any) => React.ReactNode;
}
  
interface TableRow {
    id: string | number;
    [key: string]: any;
}
  
export interface TableProps {
    columns: TableColumn[];
    data: any[] | undefined;
    additionalActions?: (row: TableRow) => { label: string; action: () => void }[];
}

export interface NavBarProps {
    businessName: string; 
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    showNotificationModal: boolean;
    newNotifications: any;
    viewNotification: (notificationId: string) => void;
}

export interface DashboardLayoutProps {
    children: ReactNode;
    businessName: string;
}

export interface IUseBlogBostProps {
  id?: string;
}
export interface IBlogPayload {
  _id?: string;
  authorId: string;
  title: string;
  content: string;
  // date?: string;
  image: string;
  comments: IComments[];
  likes: number;
  shares: number;
  allowComments: boolean;
  allowLikes: boolean;
  status: string;
  whiteLabelName: string;
  publishedDate?: string;
}

export interface IPreviewPayload extends IBlogPayload {
  isFromEdit: boolean;
}
export interface IComments {
  _id?: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
}

export interface ITextInputProps extends FieldAttributes<any> {
  title: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "date";
  icon?: React.ReactNode;
  wrapperClass: string;
  inputClass?: string;
}

export interface IToggleInputProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}
export interface ISearch {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  className?: string;
}

export interface ISuspendMerchantPayload {
  merchantId: string;
  action: string;
  platform: string;
  reason: string;
}