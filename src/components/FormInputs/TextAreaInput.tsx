import React from "react";
import { FieldAttributes, useField } from "formik";

interface TextAreaInputProps extends FieldAttributes<any> {
    label?: string;
    name: string;
    wrapperClass?: string;
  }

const TextAreaInputFeild = ({
  wrapperClass,
  label,
  name, // name must contain a value and not an empty string
  onRightIconClick,
  ...restProps
}: TextAreaInputProps
) => {
    const [field, meta, helpers] = useField(name);
  return (
    <div className={`flex flex-col ${wrapperClass}`}>
        {label && (
        <label
          htmlFor={restProps?.id || name}
          className='text-sm font-normal font-satoshiRegular text-[#344054]'
        >
          {label}
        </label>
      )}
         <input
            className={`w-full text-xs h-10 mt-1 placeholder-gray-300 active:bg-transparent  shadow text-[#6F7174]  py-2.5 focus:outline-none 
             rounded bg-white border
              ${ meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            }`}
            {...field}
            {...restProps}
          />
    </div>
  )
}

export default TextAreaInputFeild