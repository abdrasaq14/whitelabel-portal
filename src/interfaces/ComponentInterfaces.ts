import { ButtonType, ModalHeaderType, TextboxType, ModalFooterType, CardType } from "@/enums/ComponentEnums";
import { FormikHandlers } from "formik";
import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

export interface ButtonProps {
    type: ButtonType;
    icon?: IconType | null;
    style?: string | null;
    text: string;
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