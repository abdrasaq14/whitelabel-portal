import { templates } from "@/components/customisation/step3/templateCard";
import { stripHtml } from "@/utilities/helperFunctions";
import { CustomisationStage3Validation } from "@/utilities/validations";
import { useFormik } from "formik";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUpload from "../useUpload";
import { useRouter } from "next/navigation";

const useStage3Customisation = ({
  data,
  step,
  setStep
}: {
  data: any;
  step: number;
  setStep: (step: number) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [updatedUserObject, setUpdatedUserObject] = useState<any>({});
  // const [isOpen, setIsOpen] = useState(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const { uploading, handleHoldImage, imageHolder, handleUpload, error } =
    useUpload();
  const form = useFormik({
    initialValues: {
      heroText: (data?.banner?.text as string) || "",
      heroImage: ""
    },
    validationSchema: CustomisationStage3Validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true
  });
  console.log("form.values", form.values, data?.banner?.text);
  useEffect(() => {
    if (data?.banner?.text) {
      form.setFieldValue("heroText", data.banner.text);
      form.validateField("heroText");
    }
    if (data?.banner?.imageUrl) {
      form.setFieldValue("heroImage", data.banner.imageUrl);
    }
    if (data?.completeSetup === "completed") {
      const localUserData: string | null = localStorage.getItem("userObject");
      if (localUserData) {
        const localData = JSON.parse(localUserData);
        setUpdatedUserObject(localData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const [characterCount, setCharacterCount] = useState(
    stripHtml(form.values.heroText).length
  );
  const characterLimit = 70;
  const handleTemplateClick = (index: number) => {
    setSelectedTemplate(index);
  };

  const handleTextChange = (content: string) => {
    const strippedContent = stripHtml(content);
    if (strippedContent.length <= characterLimit) {
      form.setFieldValue("heroText", content);
      setCharacterCount(strippedContent.length);
      return;
    } else {
      const truncatedContent = strippedContent.slice(0, characterLimit);
      form.setFieldValue("heroText", truncatedContent);
      setCharacterCount(characterLimit);
      return;
    }
  };
  const handleBeforeInput = (e: any) => {
    if (
      characterCount >= characterLimit &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }
  };
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const router = useRouter();
  // const handleImageUpload = useMutation(
  //   async (file: File) => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "products_upload");
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/profitall/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     );
  //     console.log("Upload completed", response);
  //     return response;
  //   },
  //   {
  //     onSuccess: (response: any) => {
  //       setIsUploading(false);
  //       form.setSubmitting(false);
  //       const fileUrl = response.data.secure_url;
  //       form.setFieldValue("heroImage", fileUrl);
  //       scrollToSection();
  //     },
  //     onError: (err: any) => {
  //       setIsUploading(false);
  //       form.setSubmitting(false);
  //       console.error("Error uploading file:", err);
  //     }
  //   }
  // );
  // const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setDragging(false);
  //   if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
  //     const file = event.dataTransfer.files[0];
  //     setIsUploading(true);
  //     await validateAndUploadFile(file);
  //     event.dataTransfer.clearData();
  //   }
  // };
  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.currentTarget.files) {
  //     setIsUploading(true);
  //     const file = event.currentTarget.files[0];
  //     await validateAndUploadFile(file);
  //   }
  // };
  // const validateAndUploadFile = async (file: File) => {
  //   // setIsUploading(true);
  //   // const validFormats = ["image/jpeg", "image/png", "image/jpg"];
  //   // const minSize = 50 * 1024; // 50 KB
  //   // const maxSize = 5 * 1024 * 1024; // 5 MB

  //   // if (!validFormats.includes(file.type)) {
  //   //   setUploadError(
  //   //     "Invalid image format. Supported formats: JPEG, PNG, JPG."
  //   //   );
  //   //   setIsUploading(false);
  //   //   return;
  //   // }

  //   // if (file.size < minSize || file.size > maxSize) {
  //   //   setUploadError("Image size must be between 50 KB and 5 MB.");
  //   //   setIsUploading(false);
  //   //   return;
  //   // }

  //   // setUploadError("");
  //   if (selectedTemplate !== 2) {
  //     const bgRemovedImage = await removeBackground(file);
  //     if (bgRemovedImage) {
  //       // Continue with your image upload logic, using the bgRemovedImage URL
  //       // handleUpload(file, handleHoldImage);
  //       handleImageUpload.mutate(bgRemovedImage);
  //     } else {
  //       setUploadError("Failed to remove background from the image.");
  //       setIsUploading(false);
  //       return;
  //     }
  //   } else {
  //     handleImageUpload.mutate(file);
  //     return;
  //   }
  //   // handleImageUpload.mutate(file);
  // };

  const handleProceed = () => {
    localStorage.removeItem("setupData");
    AuthActions.setProfile(updatedUserObject);
    router.push("/Dashboard");
    localStorage.removeItem("userObject");
    setIsOpen(false);
    return;
  };

  const handleSubmit = async (values: {
    heroText: string;
    heroImage: string;
  }) => {
    try {
      // @ts-ignore
      const response: any = await CustomisationService.create({
        // @ts-ignore
        banner: {
          text: values.heroText,
          imageUrl: values.heroImage,
          template: templates[selectedTemplate].title
        },
        completeSetup: data?.services?.includes("Blog")
          ? "ongoing"
          : "completed"
      });
      if (response.data.result) {
        form.setSubmitting(false);
        setIsUploading(false);
        setUploadError("");
        setUpdatedUserObject(response.data.result);
        // in case the user refershes without clicking on proceed button
        localStorage.setItem(
          "userObject",
          JSON.stringify(response.data.result)
        );
        const localData: string | null = localStorage.getItem("setupData");
        if (localData) {
          const updateLocalData = JSON.parse(localData);
          updateLocalData.banner =
            response.data.result.customisationData.banner;
          updateLocalData.completeSetup =
            response.data.result.customisationData.completeSetup;
          updateLocalData.stage = response.data.result.customisationData.stage;
          localStorage.setItem("setupData", JSON.stringify(updateLocalData));
        }

        data?.services.includes("Blog") ? setStep(4) : setIsOpen(true);
      }
    } catch (error) {
      setIsUploading(false);
      setUploadError("");
      form.setSubmitting(false);
      toast.error("An error occurred. Please try again.");
      console.log("erro", error);
    }
  };
  const goBack = () => {
    setStep(step - 1);
  };

  const saveDataToLocaStorage = (item: Record<string, any>) => {
    localStorage.setItem(
      "setupData",
      JSON.stringify({ ...data, banner: { ...data.banner, ...item } })
    );
    // toast.success("herotext successfully");
  };

  const modules = {
    toolbar: [
      // [{ font: fonts }],
      ["bold", "italic", "underline"],
      ["clean"],
      [{ color: [] }]
    ]
  };

    const formats = ["font", "bold", "italic", "underline", "strike", "color"];
    return {
        form,
        handleTextChange,
        handleBeforeInput,
        handleTemplateClick,
        handleProceed,
        isUploading,
        imageUrl: form.values.heroImage,
        setDragging,
        dragging,
        uploadError,
        characterCount,
        characterLimit,
        scrollRef,
        modules,
        formats
    }
};

export default useStage3Customisation;
