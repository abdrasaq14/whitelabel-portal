import React, { useState } from 'react';
import { useField } from 'formik';
import axios from 'axios';

interface FileUploadProps {
    name: string;
    wrapperClass?: string;
    onFileChange?: (file: File) => void;
    children?: React.ReactNode;
    fileType?: "image" | "document";
}

const FileUpload: React.FC<FileUploadProps> = ({ name, wrapperClass, onFileChange, children, fileType, ...restProps }) => {
    const [field, meta, helpers] = useField(name);
    const [fileName, setFileName] = useState("")
    const [isUploading, setIsuploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];
        helpers.setValue(file);
        setIsuploading(true)


        if (onFileChange) {
            onFileChange(file);
        }
        setFileName(file?.name || "")
        // Upload the file to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'products_upload');
        console.log(formData)

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/profitall/upload',
                formData
            );
            const fileUrl = response.data.secure_url;
            console.log('File uploaded successfully:', fileUrl);

            // Handle deleting old file if necessary
            // if (meta.value && typeof meta.value === 'string') {
            //     // Delete old file
            //     await axios.post('cloudinary_delete_url', { public_id: meta.value });
            //     console.log('Old file deleted successfully');
            // }

            // Update form field value to the new file URL
            helpers.setValue(fileUrl);
            setIsuploading(false)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // console.log(fileName)

    return (
        <div className={`flex flex-col ${wrapperClass}`}>
            <div className='relative bg-[#edeeef] h-[165px] mt-1 border border-[#470e812b] rounded py-6 px-3 flex flex-col items-center justify-center'>
                <img src='/icons/upload_icon.svg' />
                <h3 className='mt-2'>Drag & Drop files or Browse  <label className='text-primary cursor-pointer underline font-semibold' htmlFor={name}>
                    Browse
                </label>
                </h3>
                <h3 className='text-center text-xs truncate whitespace-nowrap '> </h3>
                {isUploading && "uplaoding..."}
                {fileName}
                {fileType === "document" ? <h5 className='text-xs text-[#6F7174] mt-5'>Supported formats: PDF, WPS, WORD</h5> : <h5 className='text-xs text-[#6F7174] mt-5'>Supported formats: PNG, JPG, SVG</h5>}
                <input
                    onChange={handleFileChange}
                    id={name}
                    type="file" // Ensure it's a file input
                    className={`w-full text-xs h-12 py-2.5 focus:outline-none px-3 rounded bg-white hidden border ${meta.touched && meta.error
                        ? "border-red-600"
                        : "border-[#470e812b]"
                        }`}
                    {...restProps}
                />
            </div>
            {meta.touched && meta.error ? (
                <small className='text-xs text-red-600'>{meta.error}</small>
            ) : null}
        </div>
    );
};

export default FileUpload;
