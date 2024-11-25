import Spinner from "@/components/feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";
import React from "react";
import UploadIcon from "@/components/icons/UploadIcon";
import Image from "next/image";
interface HeroImageUploadProps {
  imageUrl: string | null;
  isUploading: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
  dragging: boolean;
  handleDrop?: (event: React.DragEvent<HTMLDivElement>) => Promise<void>;
  handleFileChange: any;
//   saveDataToLocaStorage: (item: Record<string, any>) => void;
  uploadError: string | null;
  form: any;
}
function HeroImageUpload({
  isUploading,
  imageUrl,
  setDragging,
  dragging,
  handleDrop,
  handleFileChange,
//   saveDataToLocaStorage,
  uploadError,
  form
}: HeroImageUploadProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[#344054] mb-2">Upload Hero section Image</span>
      {isUploading ? (
        <div className="flex flex-col gap-2 items-center justify-center rounded-lg h-[15rem] bg-[#f8f8ff]">
          <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          <span className="text-sm text-[#676767]">Uploading image...</span>
        </div>
      ) : imageUrl ? (
        <div className="h-[15rem] bg-[#f8f8ff]">
          <Image src={imageUrl} alt="Hero image" className="cursor-pointer" />
        </div>
      ) : (
        <div
          className={`flex flex-col cursor-pointer items-center justify-center rounded-lg gap-2 relative border-[0.8px] border-dashed border-[#384eb74d] h-[15rem] bg-[#f8f8ff] ${
            dragging ? "bg-[#e6e6fa]" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
        //   onDrop={handleDrop}
        >
          <div className="w-80px h-[50px]">
            <UploadIcon />
          </div>
          <span className=" font-satoshiBold text-lg text-[#333333]">
            Drag & drop files or{" "}
            <span className="text-foundation-darkPurple underline">Browse</span>
          </span>
          <span className="text-sm text-[#676767]">
            Supported formats: JPEG, PNG, JPG
          </span>
          {/* <input
            type="file"
            className="cursor-pointer absolute opacity-0 h-full w-full"
            onChange={handleFileChange}
            onBlur={() =>
              saveDataToLocaStorage({
                imageUrl: form.values.heroImage
              })
            }
          /> */}
        </div>
      )}

      {uploadError ? (
        <span className="text-[#D42620] text-sm">{uploadError}</span>
      ) : (
        form.touched &&
        form.errors.heroImage && (
          <span className="text-[#D42620] text-sm">
            {form.errors.heroImage}
          </span>
        )
      )}
    </div>
  );
}

export default HeroImageUpload;
