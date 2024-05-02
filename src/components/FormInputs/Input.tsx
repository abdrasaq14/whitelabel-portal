import React from 'react';
import { FieldAttributes, useField } from "formik";
import PasswordCriteria from './PasswordCriteria';



interface ICB extends React.InputHTMLAttributes<HTMLInputElement> {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    leftIcon: any;
    rightIcon: any;
    name: string;
    label: string;
    wrapperClass?: string;
    onRightIconClick?: () => void;
    
}

const Input = ({ 
    leftIcon,
    rightIcon,
	onChange = () => {},
    label,
    wrapperClass,
    name,
	onRightIconClick,
  ...restProps
 }: ICB) => {
    const [field, meta, helpers] = useField(name);
  return (
    <div className={`flex flex-col ${wrapperClass}`} >
         {label && (
            <label
            htmlFor={restProps?.id || name}
            className='text-sm font-normal text-[#344054] font-satoshiRegular'
            >
            {label}
            </label>
      )}
      <div className='relative'>
      {leftIcon && (
          <i className='absolute top-1/2 -translate-y-1/2 left-2.5'>
            {leftIcon}
          </i>
        )}
        <input
            className={`w-full text-xs h-10 mt-1 placeholder-gray-300  rounded-lg shadow text-[#6F7174]  py-2.5 focus:outline-none ${
              leftIcon ? "pl-12" : "pl-3"
            } ${rightIcon ? "pr-12" : "pr-3"} rounded bg-white border ${
              meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            }`}
            {...field}
            {...restProps}
          />
             {rightIcon && (
          <i
            onClick={() => (onRightIconClick ? onRightIconClick() : null)}
            className='absolute top-1/2 -translate-y-1/2 right-2.5 cursor-pointer'
          >
            {rightIcon}
          </i>
        )}
      </div>
      {name === "password" ? ( // Check if input field is for password
        <PasswordCriteria password={field.value} /> // Render PasswordCriteria component
      ) : null}

      
    </div>
  );
}

export default Input;
