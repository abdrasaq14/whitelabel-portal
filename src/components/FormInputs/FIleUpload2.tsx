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
    const [_, meta, helpers] = useField(name);
    const [fileName, setFileName] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const validateFile = (file: File) => {
        const validFormats = fileType === "document"
            ? ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            : ["image/jpeg", "image/png", "image/jpg"];
        const minSize = 50 * 1024; // 50 KB
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!validFormats.includes(file.type)) {
            setUploadError(`Invalid file format. Supported formats are ${fileType === "document" ? "PDF, WPS, WORD" : "PNG, JPG, SVG"}`);
            return false;
        }

        if (file.size < minSize || file.size > maxSize) {
            setUploadError("File size must be between 50KB and 5MB");
            return false;
        }

        setUploadError("");
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
        formData.append('file', file);
        formData.append('upload_preset', 'products_upload');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/profitall/upload',
                formData
            );
            const fileUrl = response.data.secure_url;
            console.log('File uploaded successfully:', fileUrl);

            helpers.setValue(fileUrl);
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
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
                className={`relative bg-[#edeeef] h-[165px] mt-1 border border-[#470e812b] rounded py-6 px-3 flex flex-col items-center justify-center ${dragOver ? 'bg-blue-100' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
               <img alt="Upload Icon" src='/icons/upload_icon.svg' />
                <h3 className='mt-2'>Drag & Drop files or <label className='text-primary cursor-pointer underline font-semibold' htmlFor={name}>
                    Browse
                </label>
                </h3>
                <h3 className='text-center text-xs truncate whitespace-nowrap '>{isUploading && "Uploading..."}</h3>
                <h3 className='text-center text-xs truncate whitespace-nowrap '>{fileName}</h3>
                {fileType === "document" ? <h5 className='text-xs text-[#6F7174] mt-5'>Supported formats: PDF, WPS, WORD</h5> : <h5 className='text-xs text-[#6F7174] mt-5'>Supported formats: PNG, JPG, SVG</h5>}
                <input
                    onChange={handleFileChange}
                    id={name}
                    type="file"
                    accept={fileType === "document" ? ".pdf,.doc,.docx" : ".png,.jpg,.jpeg,.svg"}
                    className="hidden"
                    {...restProps}
                />
            </div>
            {uploadError && (
                <small className='text-xs text-red-600'>{uploadError}</small>
            )}
            {meta.touched && meta.error ? (
                <small className='text-xs text-red-600'>{meta.error}</small>
            ) : null}
        </div>
    );
};

export default FileUpload;
