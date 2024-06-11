import React, { ReactNode } from "react";
import { FieldAttributes, useField } from "formik";
import PhoneInput from "react-phone-input-2";
import { PiCaretDownLight} from 'react-icons/pi'

interface TextInputProps extends FieldAttributes<any> {
  label?: string;
  name: string;
  leftIcon?: any;
  rightIcon?: any;
  wrapperClass?: string;
  disabled?: boolean;
  children?: ReactNode;
  onRightIconClick?: () => void;
}

const TextInput = ({
  leftIcon,
  rightIcon,
  wrapperClass,
  label,
  name, 
  disabled,
  children,
  onRightIconClick,
  ...restProps
}: TextInputProps) => {
  const [field, meta, helpers] = useField(name);

  const handlePhoneChange = (value: string) => {
    helpers.setValue(value);
  };

  const handlePhoneBlur = () => {
    helpers.setTouched(true);
  };
  return (
    <div className={`flex flex-col  ${wrapperClass}`}>
      {label && (
        <label
          htmlFor={restProps?.id || name}
          className='text-sm font-normal font-satoshiRegular text-[#344054]'
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
        {name === "phone" ? (
          <PhoneInput
            country={"ng"}
            onlyCountries={["ng"]}
            areaCodes={{ng: ['234']}}
            value={field.value}
            inputClass={`w-full !border-none !w-full`}
            containerClass={`w-full rounded border ${
              meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            } p-1.5`}
            buttonClass={` !border-none !bg-white`}
            placeholder='+23420202020'
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
          />
        ): name === "select" ? <>
        <select className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]' >
          {children}
        </select> 
        <i
            onClick={() => (onRightIconClick ? onRightIconClick() : null)}
            className='absolute top-1/2 -translate-y-1/2 right-2.5 cursor-pointer'
          >
            <PiCaretDownLight />
          </i>
        </> : (
          <input
            className={`w-full text-xs h-10 mt-1 placeholder-gray-500 active:bg-transparent rounded-lg shadow   py-2.5 focus:outline-none
            ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : "bg-white border text-[#515151] "}
            ${
              leftIcon ? "pl-12" : "pl-3"
            } ${rightIcon ? "pr-12" : "pr-3"} rounded  ${
              meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            }`}
            disabled={disabled}
            {...field}
            {...restProps}
          />
        )}

        {rightIcon && (
          <i
            onClick={() => (onRightIconClick ? onRightIconClick() : null)}
            className='absolute top-1/2 -translate-y-1/2 right-2.5 cursor-pointer'
          >
            {rightIcon}
          </i>
        )}
      </div>
      {meta.touched && meta.error && !disabled ? (
        <small className='text-xs text-red-600'> &#x26A0; {meta.error}</small>
      ) : null}
    </div>
  );
};

export default TextInput;
