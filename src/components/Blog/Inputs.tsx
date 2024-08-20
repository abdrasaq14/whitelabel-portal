import React, { useState } from "react";
import { FieldAttributes, useField } from "formik";
import axios from "axios";
import { MdCancel } from "react-icons/md";

interface TextInputProps extends FieldAttributes<any> {
  title: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "date";
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

interface FileUploadProps {
  name: string;
  wrapperClass?: string;
  extraClass?: string;
  disabled?: boolean;
  onFileChange?: (file: File) => void;
  children?: React.ReactNode;
  fileType?: "image" | "document";
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  wrapperClass,
  onFileChange,
  children,
  fileType,
  disabled,
  extraClass,
  ...restProps
}) => {
  const [_, meta, helpers] = useField(name);
  const [fileName, setFileName] = useState("");
  const [mainError, setMainError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File) => {
    const validFormats =
      fileType === "document"
        ? [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ]
        : ["image/jpeg", "image/png", "image/jpg"];
    const minSize = 50 * 1024; // 50 KB
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!validFormats.includes(file.type)) {
      setMainError(
        `Invalid file format. Supported formats are ${
          fileType === "document" ? "PDF, WPS, WORD" : "PNG, JPG, SVG"
        }`
      );
      return false;
    }

    if (file.size < minSize || file.size > maxSize) {
      setMainError("File size must be between 50KB and 5MB");
      return false;
    }

    setMainError("");
    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;
    setIsUploading(true);
    if (onFileChange) {
      onFileChange(file);
    }
    setFileName(file?.name || "");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "products_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/profitall/upload",
        formData
      );
      const fileUrl = response.data.secure_url;
      helpers.setValue(fileUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className={`flex flex-col ${wrapperClass}`}>
      <div
        className={`relative bg-primary bg-opacity-10 py-4  !h-full mt-1 border border-[#470e812b] rounded flex flex-col items-center justify-center ${extraClass} ${
          dragOver ? "bg-blue-100" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <img alt="Upload Icon" src="/icons/upload_icon.svg" />
        <h3 className="mt-2">
          Drag & Drop files or{" "}
          <label
            className="text-primary cursor-pointer underline font-semibold"
            htmlFor={name}
          >
            Browse
          </label>
        </h3>
        <h3 className="text-center text-xs truncate whitespace-nowrap ">
          {isUploading && "Uploading..."}
        </h3>
        {fileType === "document" ? (
          <h5 className="text-xs text-[#6F7174] mt-2">
            Supported formats: PDF, WPS, WORD
          </h5>
        ) : (
          <h5 className="text-xs text-[#6F7174] mt-2">
            Supported formats: PNG, JPG, SVG
          </h5>
        )}
        <input
          onChange={handleFileChange}
          id={name}
          type="file"
          disabled={disabled || isUploading}
          accept={
            fileType === "document" ? ".pdf,.doc,.docx" : ".png,.jpg,.jpeg,.svg"
          }
          className="cursor-pointer absolute opacity-0 h-full w-full"
          {...restProps}
        />
      </div>
      <span className="text-red-500">{mainError}</span>
      {meta.touched && meta.error ? (
        <small className="text-xs text-red-600">{meta.error}</small>
      ) : null}
      {/* progress content */}
      {fileName && (
        <div className="flex flex-col w-full mt-4">
          <div
            className={`relative flex items-center justify-between border border-[#470e812b] rounded-md p-2 h-[50px] w-full bg-primary bg-opacity-5 ${
              uploadError
                ? "border-b-[5px] border-b-red-500"
                : isUploading && !uploadError
                ? "uploading"
                : ""
            }`}
          >
            <span className="text-primary-text">{fileName}</span>

            {!isUploading && (
              <MdCancel
                size={20}
                className="text-[#A29999] cursor-pointer"
                onClick={() => {
                  setFileName("");
                  setUploadError("");
                }}
              />
            )}
          </div>
          {uploadError && (
            <small className="text-xs text-red-600">{uploadError}</small>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
