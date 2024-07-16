import { type } from '@testing-library/user-event/dist/type';
import React from 'react'



export const Label = ({
    variant ="success",
    children,
  }: {
    children: React.ReactNode,
    variant?:"danger" | "success" | "warning" | "primary"| "default",
  }) => {
  return (
    <label className={
        `${variant === "danger" && "!text-error !bg-errorFade"}
        ${variant === "success" && "!text-success !bg-SuccessFade"}
        ${variant === "warning" && "!text-warning !bg-warningFade"}
        ${variant === "primary" && "!text-primary !bg-primary-light"}
        ${variant === "default" && "!text-warning !bg-warningFade"}
         w-auto items-center  justify-center h-[36px] px-3 py-2 text-center rounded-lg font-normal text-sm whitespace-nowrap`
    }>
        {children}
    </label>
  )
}

