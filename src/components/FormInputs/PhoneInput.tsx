/* eslint-disable no-restricted-globals */
import React from "react";
import { FieldAttributes, useField } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps  extends FieldAttributes<any> {
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  wrapperClass?: string;
  disabled?: boolean;
}

const PhoneInputField: React.FC<PhoneInputProps> = ({
  name,
  label,
  value,
  placeholder,
  wrapperClass,
  disabled,
}: PhoneInputProps) => {

  
    const [field, meta, helpers] = useField(name);

  const handlePhoneChange = (value: string) => {
    helpers.setValue(value);
  };

  const handlePhoneBlur = () => {
    helpers.setTouched(true);
  };
  
  

  return (
    <div className={`flex flex-col rounded-md ${wrapperClass}`}>
      {label && (
        <label className='text-sm font-normal font-satoshiRegular text-[#344054]'>
          {label}
        </label>
      )}

      <PhoneInput
        country={"ng"}
        onlyCountries={["ng"]}
        areaCodes={{ng: ['234']}}
        disabled={disabled}
        value={field.value}
        inputClass={`!border-none !w-full ${disabled ? '!bg-gray-100' : '!bg-white'}`}
        containerClass={`w-full rounded-md border mt-1 ${
          meta.touched && meta.error
            ? "border-red-600"
            : "border-[#470e812b]"
        }`}
        buttonClass={`!border-none ${disabled ? '!bg-grey-100' : '!bg-white'}`}
        placeholder='+23420202020'
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
        }}
      />
    </div>
  );
};

export default PhoneInputField;
