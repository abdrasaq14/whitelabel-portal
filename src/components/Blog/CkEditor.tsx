import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useField, useFormikContext } from "formik";
import { MyUploadAdapter } from "./UploadAdapter";
import axios from "axios";
import toast from "react-hot-toast";

interface BlogDescriptionProps {
  name: string;
}

const validateFile = (file: File): boolean => {
  const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!validFormats.includes(file.type)) {
    toast.error("Invalid file format. Supported formats are PNG, JPG");
    return false;
  }

  if (file.size > maxSize) {
    toast.error("File size must not be greater than 5MB");
    return false;
  }

  return true;
};

const handleFileUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "products_upload");

  try {
    const response = await axios.post<{ secure_url: string }>(
      "https://api.cloudinary.com/v1_1/profitall/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default function BlogDescription({ name }: BlogDescriptionProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField<string>(name);
  console.log("field", field);
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        // extraPlugins: [
        //   (editor: any) =>
        //     MyCustomUploadAdapterPlugin(editor, validateFile, handleFileUpload)
        // ],
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "insertImage"
        ]
      }}
      data={field.value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        setFieldValue(name, data);
      }}
      onReady={(editor: any) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (
          loader: any
        ) => {
          return new MyUploadAdapter(loader, validateFile, handleFileUpload);
        };
      }}
    />
  );
}
