import { ButtonType, ModalHeaderType, TextboxType, ModalFooterType, CardType, SpinnerType } from "@/enums/ComponentEnums";
import { FormikHandlers } from "formik";
import { ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";
import { FieldAttributes } from "formik";

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