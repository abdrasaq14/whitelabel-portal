import React from "react";
import { FieldAttributes, useField } from "formik";

interface TextInputProps extends FieldAttributes<any> {
  title: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "date"
  icon?: React.ReactNode;
  wrapperClass: string;
  inputClass?: string;
}
export function TextInput({
  title,
  name,
  type,
  disabled,
  placeholder,
  wrapperClass,
  inputClass,
  icon,
  ...restProps
}: TextInputProps) {
  const [field, meta] = useField(name);

  return (
    <div className={`flex flex-col gap-2 col-span-1 ${wrapperClass}`}>
      {" "}
      <label className="text-primary-text font-semibold">{title}</label>
      <div className="border border-[#D0D5DD] rounded-md gap-2 p-2 w-full flex items-center justify-between">
        {icon && <span className="text-[#cecece] text-lg">{icon}</span>}
        <input
          {...field}
          {...restProps}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={`outline:none focus:outline-none border-none placeholder:text-[12px] w-full text-primary-text ${inputClass}`}
        />
      </div>
      {meta.touched && meta.error && !disabled ? (
        <small className="text-xs text-red-600"> &#x26A0; {meta.error}</small>
      ) : null}
    </div>
  );
}


interface ToggleProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

interface ToggleProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ name, value, onChange }) => {
  const handleClick = () => {
    onChange(!value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        value ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};