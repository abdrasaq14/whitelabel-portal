import React, { useEffect } from "react";
import { ChangeEventHandler, useState } from "react";
import TemplateCard, { templates } from "./templateCard";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";
import Spinner from "../../../components/spinner/Spinner";
import {
  MdOutlineArrowForward,
  MdOutlineKeyboardBackspace
} from "react-icons/md";
import { uploadIcon } from "../../../assets/customisation";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomisationService } from "../../../services/customisation.service";
import removeBackground from "../../../utils/removeBg";
import { CompletionModal } from "../../../components/Modal/CompletionModal";
import { useNavigate } from "react-router-dom";
import LivePreview from "../LivePreviewComponent/LivePreview";
import toast from "react-hot-toast";
import {AuthActions} from "../../../zustand/auth.store";

interface Step3Props {
  primaryColor: any;
  secondaryColor: any;
  step: number;
  setStep: (step: number) => void;
  data: any;
}

// Validation schema
const validationSchema = Yup.object({
  heroText: Yup.string().trim().required("Hero Section text is required"),
  heroImage: Yup.string().trim().required("*Hero Image is required")
});

function Step3({
  primaryColor,
  secondaryColor,
  step,
  setStep,
  data
}: Step3Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleTemplateClick = (index: number) => {
    setSelectedTemplate(index);
  };
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();
  const handleImageUpload = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "products_upload");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/profitall/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response;
    },
    {
      onSuccess: (response: any) => {
        setIsUploading(false);
        form.setSubmitting(false);
        const fileUrl = response.data.secure_url;
        console.log("File uploaded successfully:", fileUrl);
        form.setFieldValue("heroImage", fileUrl);
        scrollToSection();
        
      },
      onError: (err: any) => {
        setIsUploading(false);
        form.setSubmitting(false);
        console.error("Error uploading file:", err);
      }
    }
  );

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.currentTarget.files) {
      setIsUploading(true);
      const file = event.currentTarget.files[0];
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const minSize = 50 * 1024; // 50 KB
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!validFormats.includes(file.type)) {
        setUploadError(
          "Invalid image format. Supported formats: JPEG, PNG, JPG."
        );
        setIsUploading(false);
        return;
      }

      if (file.size < minSize || file.size > maxSize) {
        setUploadError("Image size must be between 50 KB and 5 MB.");
        setIsUploading(false);
        return;
      }

      setUploadError("");
      if (selectedTemplate !== 2) {
        const bgRemovedImage = await removeBackground(file);
        if (bgRemovedImage) {
          // Continue with your image upload logic, using the bgRemovedImage URL
          handleImageUpload.mutate(bgRemovedImage);
        } else {
          setUploadError("Failed to remove background from the image.");
          setIsUploading(false);
          return;
        }
      } else {
        console.log("yes");
        handleImageUpload.mutate(file);
        return;
      }
      // handleImageUpload.mutate(file);
    }
  };

  const handleProceed = () => {
    localStorage.removeItem("setupData")
    navigate("/dashboard");
    setIsOpen(false);
    setStep(1);
    return;
  };
  const form = useFormik({
    initialValues: {
      heroText: "",
      heroImage: ""
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit.mutate(values);
    },
    validateOnChange: false
  });

  const handleSubmit = useMutation(
    async (values: { heroText: string; heroImage: string }) => {
      return await CustomisationService.createCustomisation({
        banner: {
          text: values.heroText,
          imageUrl: values.heroImage,
          template: templates[selectedTemplate].title
        },
        completeSetup: "completed"
      });
    },
    {
      onSuccess: (response) => {
        setIsUploading(false);
        setUploadError("");
        form.setSubmitting(false);
        setIsOpen(true);
        // According to Emeka, you have to update user profile on the frontend with the new user data from the backend before you route to dashboard
        // AuthActions.setProfile(response.data.result.user)

        // console.log("response", response);
      },
      onError: (err: any) => {
        setIsUploading(false);
        setUploadError("");
        form.setSubmitting(false);
        console.log("erro", err);
      }
    }
  );

  const goBack = () => {
    setStep(step - 1);
  };

  const saveDataToLocaStorage = (item: Record<string, any>) => {
    localStorage.setItem("setupData", JSON.stringify({ ...data, banner: { ...data.banner, ...item } }));
    // toast.success("herotext successfully");
  }
  // const fonts = [
  //   "Satoshi-Regular",
  //   "Satoshi-Bold",
  //   "Satoshi-Light",
  //   "Satoshi-Medium",
  //   "Satoshi-Black"
  // ];

  const modules = {
    toolbar: [
      // [{ font: fonts }],
      ["bold", "italic", "underline"],
      ["clean"],
      [{ color: [] }]
    ]
  };

  console.log("form.Value", form.values.heroImage);
  const formats = ["font", "bold", "italic", "underline", "strike", "color"];
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (data?.banner?.text) {
      form.setFieldValue("heroText", data.banner.text);
    }
    if (data?.banner?.imageUrl) {
      form.setFieldValue("heroImage", data.banner.imageUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <div className="flex w-full bg-[#F3F3F3] h-full">
        <div className="w-[45%] h-full bg-white text-foundation-black p-8 font-satoshiBold">
          <div
            className="flex gap-1 items-center cursor-pointer mb-6"
            onClick={goBack}
          >
            <MdOutlineKeyboardBackspace size={22} />
            <span className="font-satoshiMedium">Back</span>
          </div>
          <h1 className="text-3xl mb-1">Customise your Account</h1>
          <p className="mb-4 text-sm text-[#5a5a5a] font-satoshiRegular w-[60%]">
            Choose a template and provide the hero section image and content
            below
          </p>
          {/* step */}
          <div className="flex max-w-[10rem] gap-2 my-4">
            <span className="h-2 w-1/3 bg-[#4b00821f] rounded-xl"></span>
            <span className="h-2 w-1/3 bg-[#4b00821f] rounded-xl"></span>
            <span className="h-2 w-2/3 bg-foundation-darkPurple rounded-xl"></span>
          </div>
          {/* templates */}
          <div className="flex gap-4 max-w-[90%] my-6">
            {templates.map((template, index) => (
              <TemplateCard
                key={index}
                index={index}
                image={template.image}
                title={template.title}
                selectedTemplate={selectedTemplate}
                onClick={handleTemplateClick}
              />
            ))}
          </div>
          {/* hero section */}
          <div className="max-w-[90%]  my-6">
            <FormikProvider value={form}>
              <form className="flex flex-col gap-4 font-satoshiMedium w-full">
                <div className="rounded-lg p-4 border border-[#C8CCD0]">
                  <p className="font-satoshiBold text-lg mb-4"> Hero Section</p>
                  {/* hero text */}
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[#344054] mb-2 ">
                        Hero section Text
                      </span>
                      <ReactQuill
                        value={form.values.heroText}
                        onChange={(content) =>
                          form.setFieldValue("heroText", content)
                        }
                        onBlur={()=> saveDataToLocaStorage({text: form.values.heroText})}
                        modules={modules}
                        formats={formats}
                        placeholder="Provide your hero section text here..."
                        className=" placeholder:text-sm placeholder:text-[#667085] text-sm min-h-[10rem] focus:outline-none overflow-hidden rounded-lg border border-[#C8CCD0] "
                        theme="snow"
                      />
                      <style>{`
                    .ql-editor{
                      min-height: 10rem;
                      
                    }
                      .ql-container.ql-snow{
                      border: 0px!important;
                      }
                      .ql-snow .ql-picker.ql-font{
                      min-width: 130px;
                      }
                      .ql-editor::before, .ql-editor::after{
                      border: none!important;
                      outline: none!important
                      }
                    .ql-toolbar{
                      background-color: #f8f8ff;
                      border: 0px!important;
                      outline: none!important;
                      
                    }
                    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Satoshi-Regular']::before {
                      content: 'Satoshi Regular';
                    }
                    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Satoshi-Bold']::before {
                      content: 'Satoshi Bold';
                    }
                    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Satoshi-Light']::before {
                      content: 'Satoshi Light';
                    }
                    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Satoshi-Medium']::before {
                      content: 'Satoshi Medium';
                    }
                    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Satoshi-Black']::before {
                      content: 'Satoshi Black';
                    }
                    .ql-font-Satoshi-Regular {
                      font-family: 'Satoshi-Regular', sans-serif;
                    }
                    .ql-font-Satoshi-Bold {
                      font-family: 'Satoshi-Bold', sans-serif;
                    }
                    .ql-font-Satoshi-Light {
                      font-family: 'Satoshi-Light', sans-serif;
                    }
                    .ql-font-Satoshi-Medium {
                      font-family: 'Satoshi-Medium', sans-serif;
                    }
                    .ql-font-Satoshi-Black {
                      font-family: 'Satoshi-Black', sans-serif;
                    }
                      .ql-editor p{
                        line-height: 1.5; // Default line height for paragraphs
                      }
                      .ql-editor p + br{
                        display: none; // Hide <br> after <p> tags to avoid extra spacing
                      }
                  `}</style>
                      {/* <textarea
                      placeholder="Provide your hero section text here..."
                      className="rounded-lg border border-[#C8CCD0] p-2 placeholder:text-sm placeholder:text-[#667085] text-sm max-h-[10rem] min-h-[10rem] focus:outline-none"
                      {...form.getFieldProps("heroText")}
                    ></textarea> */}
                      <div
                        className="flex "
                        style={{
                          justifyContent: form.errors.heroText
                            ? "space-between"
                            : "end"
                        }}
                      >
                        {form.errors.heroText && (
                          <span className="text-[#D42620] text-sm">
                            {form.errors.heroText}
                          </span>
                        )}
                        <span className="font-satoshiLight text-sm text-[#667085]">
                          Max. of 70 Characters
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* hero image */}
                  <div className="flex flex-col">
                    <span className="text-[#344054] mb-2">
                      Upload Hero section Image
                    </span>
                    {isUploading ? (
                      <div className="flex flex-col gap-2 items-center justify-center rounded-lg h-[15rem] bg-[#f8f8ff]">
                        <Spinner color="#4B0082" />
                        <span className="text-sm text-[#676767]">
                          Uploading image...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col cursor-pointer  items-center justify-center rounded-lg gap-2 relative border-[0.8px] border-dashed border-[#384eb74d] h-[15rem] bg-[#f8f8ff]">
                        <div className="w-80px h-[50px]">
                          <img
                            src={uploadIcon}
                            alt="uploadIcon"
                            className="object-contain"
                          />
                        </div>
                        <span className=" font-satoshiBold text-lg text-[#333333]">
                          Drag & drop files or{" "}
                          <span className="text-foundation-darkPurple underline">
                            Browse
                          </span>
                        </span>
                        <span className="text-sm text-[#676767]">
                          Supported formats: JPEG, PNG, JPG
                        </span>
                        <input
                          type="file"
                          className="cursor-pointer absolute opacity-0 h-full w-full"
                          onChange={handleFileChange}
                          onBlur={() => saveDataToLocaStorage({imageUrl: form.values.heroImage})}
                          />
                      </div>
                    )}

                    {uploadError ? (
                      <span className="text-[#D42620] text-sm">
                        {uploadError}
                      </span>
                    ) : (
                      form.errors.heroImage && (
                        <span className="text-[#D42620] text-sm">
                          {form.errors.heroImage}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={
                    !form.values.heroText.trim() ||
                    !form.values.heroImage.trim() ||
                    form.isSubmitting ||
                    isUploading
                  }
                  onClick={() => form.handleSubmit()}
                  className="bg-primary w-full rounded-lg text-white text-sm inline-flex gap-2 my-4 items-center justify-center text-center p-2.5 font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                  {form.isSubmitting ? (
                    <Spinner />
                  ) : (
                    <>
                      Continue{" "}
                      <span>
                        <MdOutlineArrowForward size={16} />
                      </span>
                    </>
                  )}
                </button>
              </form>
            </FormikProvider>
          </div>
        </div>
        <div className="w-[55%] h-full bg-foundation-darkPurple p-6 flex items-center justify-center">
          <LivePreview
            data={data}
            scrollRef={scrollRef}
            template={selectedTemplate}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            heroImage={form.values.heroImage }
            heroText={form.values.heroText}
          />
        </div>
      </div>
      <CompletionModal isOpen={isOpen} handleProceed={handleProceed} />
    </>
  );
}

export default Step3;
