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
        `${variant === "danger" && "!text-[#9E0A05] !bg-errorFade"}
        ${variant === "success" && "!text-success !bg-SuccessFade"}
        ${variant === "warning" && "!text-[#865503] !bg-warningFade"}
        ${variant === "primary" && "!text-primary !bg-primary-light"}
        ${variant === "default" && "!text-[#865503] !bg-warningFade"}
         w-auto items-center  justify-center h-[36px] px-3 py-2 text-center rounded-lg font-normal text-sm whitespace-nowrap`
    }>
        {children}
    </label>
  )
}

