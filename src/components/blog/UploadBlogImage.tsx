import { SpinnerType } from "@/enums/ComponentEnums";
import { LoaderProps } from "@/interfaces/ComponentInterfaces";
import React, { useState } from "react";
import Spinner from "../feedbacks/Spinner";
import { MdCancel } from "react-icons/md";

const UploadBlogImage = ({
  loader,
  image,
  fileName,
  setFileName,
  error,
}: {
  loader: LoaderProps;
  image: string | null;
  fileName: string;
  error: string;
  setFileName: (value: string) => void;
}) => {
  const [uploadError, setUploadError] = useState(error);
  return (
    <div
      className={` bg-purple-main bg-opacity-10 py-4  min-h-[15rem] mt-1 border border-[#470e812b] rounded flex flex-col items-center justify-center
      `}
    >
      {loader.loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
        </div>
      ) : image && image.trim() ? (
        <img
          src={image}
          alt="Blog Image"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img alt="Upload Icon" src="/icons/upload_icon.svg" />
          <h3 className="mt-2">
            Drag & Drop files or{" "}
            <label className="text-primary underline font-semibold">
              Browse
            </label>
          </h3>

          <h5 className="text-xs text-[#6F7174] mt-2">
            Supported formats: PNG, JPG, SVG
          </h5>
        </div>
      )}
      {fileName && (
        <div className="flex flex-col w-full mt-4">
          <div
            className={`relative flex items-center justify-between border border-[#470e812b] rounded-md p-2 h-[50px] w-full bg-purple-main bg-opacity-5 ${
              uploadError
                ? "border-b-[5px] border-b-red-500"
                : loader.loading && !uploadError
                ? "uploading"
                : ""
            }`}
          >
            <span className="text-accent-darker">{fileName}</span>

            {!loader.loading && (
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

export default UploadBlogImage;
