import React, { useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../spinner/Spinner';

interface FileUploadProps {
  name: string;
  wrapperClass?: string;
  onFileChange?: (file: File) => void;
  fileType?: "image" | "document";
  children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, wrapperClass, onFileChange, children }) => {
  const [_, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'products_upload');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/profitall/upload',
        formData
      );
      const fileUrl = response.data.secure_url;
      console.log('File uploaded successfully:', fileUrl);

      if (onFileChange) {
        onFileChange(fileUrl);
      }

      setFileName(file.name || "");
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }

  };
  return (
    <div className={`flex flex-col ${wrapperClass}`}>
      <button type='button' className='w-auto flex' onClick={handleButtonClick} >
        {
          isUploading ? (
            <div className='bg-primary w-uto p-2 rounded-full mt-1'>
              <Spinner />
            </div>
          ) : (
            <>
              {children}
              <input
                type='file'
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".png,.jpg,.jpeg"
                className='hidden'
                name={name}

              />
            </>
          )
        }



      </button>
    </div>
  );
};

export default FileUpload;
