import { ButtonType, ModalHeaderType, TextboxType, ModalFooterType, CardType, SpinnerType } from "@/enums/ComponentEnums";
import { FormikHandlers } from "formik";
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
    style?: string | null;
    text: string;
    loader?: LoaderProps | null;
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
}
  
export interface TabsProps {
    tabs: Tab[];
}

export interface AccountForm {
    currentUser: User
}