import React, { useState } from "react";
import TemplateCard, { templates } from "./templateCard";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import Spinner from "../../../components/spinner/Spinner";
import { MdOutlineArrowForward } from "react-icons/md";
import { uploadIcon } from "../../../assets/customisation";

interface Step3Props {
  index: number;
}

// Validation schema
const validationSchema = Yup.object({
  heroText: Yup.string()
    .trim()
    .required("Hero Section text is required")
    .max(70, "*maximum of 70 characters"),
  password: Yup.string()
    .trim()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required")
});
function Step3({ index }: Step3Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);

  const handleTemplateClick = (index: number) => {
    setSelectedTemplate(index);
  };
  const form = useFormik<Yup.Asserts<typeof validationSchema>>({
    initialValues: {
      heroText: "",
      password: ""
    },
    validationSchema,
    onSubmit: (values: any) => {
      sessionStorage.setItem("loginRequest", JSON.stringify(values));
      handleSubmit.mutate(values);
    }
  });
  const handleSubmit = useMutation(
    async (values: { email: string; password: string }) => {
      // return await AuthService.login(values);
    },
    {
      onSuccess: (response) => {},
      onError: (err: any) => {
        console.log(err);
      }
    }
  );
  return (
    <div className="flex w-full bg-[#F3F3F3] h-full">
      <div className="w-[50%] h-full bg-white text-foundation-black p-4 font-satoshiBold">
        <h1 className="text-3xl mb-1">Customise your Account</h1>
        <p className="mb-4 text-sm text-[#5a5a5a] font-satoshiRegular w-[60%]">
          Choose a template and provide the hero section image and content below
        </p>
        {/* step */}
        <div className="flex max-w-[10rem] gap-2 my-4">
          <span className="h-2 w-1/3 bg-[#4b00821f] rounded-xl"></span>
          <span className="h-2 w-1/3 bg-[#4b00821f] rounded-xl"></span>
          <span className="h-2 w-2/3 bg-foundation-darkPurple rounded-xl"></span>
        </div>
        {/* templates */}
        <div className="flex gap-4 max-w-[80%] my-6">
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
        {/* hero secrion */}

        <div className="max-w-[80%]  my-6">
          <FormikProvider value={form}>
            <form className="flex flex-col gap-4 font-satoshiMedium w-full">
              <div className="rounded-lg p-4 border border-[#C8CCD0]">
                <p className="font-satoshiBold text-lg"> Hero Section</p>
                {/* hero text */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[#344054] mb-2 ">
                      Hero section Text
                    </span>
                    <textarea
                      placeholder="Proivde your hero section text here..."
                      className="rounded-lg border border-[#C8CCD0] p-2 placeholder:text-sm placeholder:text-[#667085] text-sm max-h-[10rem] min-h-[10rem] focus:outline-none"
                      {...form.getFieldProps("heroText")}
                    ></textarea>
                    <span className="self-end font-satoshiLight text-sm text-[#667085]">
                      Max. of 70 Characters
                    </span>
                  </div>
                </div>
                {/* hero image */}
                <div className="flex flex-col">
                  <span className="text-[#344054] mb-2">
                    Upload Hero section Image
                  </span>
                  <div className="cursor-pointer flex flex-col items-center justify-center rounded-lg gap-2 relative border-[0.8px] border-dashed border-[#384eb74d] h-[15rem] bg-[#f8f8ff]">
                    <div className="w-80px h-[50px]">
                      <img
                        src={uploadIcon}
                        alt="uploadIcon"
                        className="object-contian "
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
                      className="cursor-pointer absolute opacity-0 h-full w-full "
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={form.isSubmitting}
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
      <div className="w-[50%] h-full bg-foundation-darkPurple">
        <h1>Step 3</h1>
      </div>
    </div>
  );
}

export default Step3;
