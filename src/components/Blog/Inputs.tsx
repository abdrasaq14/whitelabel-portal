import React from "react";

interface BlogInputProps {
  title: string;
  placeholder: string;
  type: "text" | "date" | "textarea";
  icon?: React.ReactNode;
  wrapperClass: string;
  inputClass?: string;
}
export function BlogInputs({
  title,
  type,
  placeholder,
  wrapperClass,
  inputClass,
  icon
}: BlogInputProps) {
  return (
    <div className={`flex flex-col gap-2 col-span-1 ${wrapperClass}`}>
      {" "}
      <label className="text-primary-text font-semibold">{title}</label>
      {type === "textarea" ? (
        <textarea className="border border-[#D0D5DD] rounded-md gap-2 p-2 w-full min-h-[5rem]"></textarea>
      ) : (
        <div className="border border-[#D0D5DD] rounded-md gap-2 p-2 w-full flex items-center justify-between">
          {icon && <span className="text-[#cecece] text-lg">{icon}</span>}
          <input
            type={type}
            placeholder={placeholder}
            className={`outline:none focus:outline-none border-none placeholder:text-[12px] w-full text-primary-text ${inputClass}`}
          />
        </div>
      )}
    </div>
  );
}
