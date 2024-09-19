import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

import "./index.css";
import { useField, useFormikContext } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { MyUploadAdapter } from "../UploadAdapter";



const validateFile = (file: File): boolean => {
  const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  //   const minSize = 50 * 1024; // 50 KB
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!validFormats.includes(file.type)) {
    toast.error(`Invalid file format. Supported formats are PNG, JPG`);
    return false;
  }

  if (file.size > maxSize) {
    toast.error("File size nit be greater than 5MB");
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

export default function BlogDescription({ name }: { name: string }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const { setFieldValue } = useFormikContext();
  const [field] = useField<string>(name);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

 const editorConfig = {
   toolbar: {
     items: [
       "undo",
       "redo",
       "|",
       "findAndReplace",
       "selectAll",
       "|",
       "fontSize",
       "fontFamily",
       "fontColor",
       "fontBackgroundColor",
       "|",
       "bold",
       "italic",
       "underline",
       "strikethrough",
       "subscript",
       "superscript",
       "removeFormat",
       "|",
       "specialCharacters",
       "link",
       "insertImage",
       "insertTable",
       "blockQuote",
       "|",
       "alignment",
       "|",
       "bulletedList",
       "numberedList",
       "todoList",
       "outdent",
       "indent",
     ],
     shouldNotGroupWhenFull: true
   },
   plugins: [
     Alignment,
     Autoformat,
     AutoImage,
     Autosave,
     BalloonToolbar,
     BlockQuote,
     Bold,
     Essentials,
     FindAndReplace,
     FontBackgroundColor,
     FontColor,
     FontFamily,
     FontSize,
     ImageBlock,
     ImageCaption,
     ImageInline,
     ImageInsert,
     ImageInsertViaUrl,
     ImageResize,
     ImageStyle,
     ImageTextAlternative,
     ImageToolbar,
     ImageUpload,
     Indent,
     IndentBlock,
     Italic,
     Link,
     LinkImage,
     List,
     Paragraph,
     RemoveFormat,
     SelectAll,
     SimpleUploadAdapter,
     SpecialCharacters,
     SpecialCharactersArrows,
     SpecialCharactersCurrency,
     SpecialCharactersEssentials,
     SpecialCharactersLatin,
     SpecialCharactersMathematical,
     SpecialCharactersText,
     Strikethrough,
     Subscript,
     Superscript,
     Table,
     TableCaption,
     TableCellProperties,
     TableColumnResize,
     TableToolbar,
     TextTransformation,
     TodoList,
     Underline,
     Undo
   ],
   balloonToolbar: [
     "bold",
     "italic",
     "|",
     "link",
     "insertImage",
     "|",
     "bulletedList",
     "numberedList"
   ],
   fontFamily: {
     supportAllValues: true
   },
   fontSize: {
     options: [10, 12, 14, "default", 18, 20, 22],
     supportAllValues: true
   },
   image: {
     toolbar: [
       "toggleImageCaption",
       "imageTextAlternative",
       "|",
       "imageStyle:inline",
       "imageStyle:wrapText",
       "imageStyle:breakText",
       "|",
       "resizeImage"
     ]
   },
   initialData:
     '',
   link: {
     addTargetToExternalLinks: true,
     defaultProtocol: "https://",
     decorators: {
       toggleDownloadable: {
         mode: "manual",
         label: "Downloadable",
         attributes: {
           download: "file"
         }
       }
     }
   },
   placeholder: "Type or paste your content here!",
   table: {
     contentToolbar: [
       "tableColumn",
       "tableRow",
       "mergeTableCells",
       "tableCellProperties"
     ]
   }
 };

  return (
    <div>
      <div className="main-container !w-full border border-[#D0D5DD] rounded-md overflow-hidden">
        <div
          className="editor-container editor-container_classic-editor !w-full"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  // @ts-ignore
                  config={editorConfig}
                  data={field.value}
                  onChange={(event: any, editor: any) => {
                    setError(null);
                    const data = editor.getData();
                    setFieldValue(name, data);
                  }}
                  onReady={(editor: any) => {
                    setError(null);
                    editor.plugins.get("FileRepository").createUploadAdapter = (
                      loader: any
                    ) => {
                      return new MyUploadAdapter(
                        loader,
                        validateFile,
                        handleFileUpload
                      );
                    };
                  }}
                  onBlur={(event: any, editor: any) => {
                    if (editor.getData().trim() === "") {
                      setError("This field is required");
                    }
                  }
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {error?.trim() ? (
        <small className="text-xs text-red-600"> &#x26A0; {error}</small>
      ) : null}
    </div>
  );
}
