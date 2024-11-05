import { ButtonType, ModalHeaderType, TextboxType, ModalFooterType, CardType, SpinnerType } from "@/enums/ComponentEnums";
import { FormikHandlers } from "formik";
import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

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
    closeClicked: () => void;
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