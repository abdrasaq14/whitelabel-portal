import React, { useEffect } from "react";
import { useState } from "react";
import TemplateCard, { templates } from "./templateCard";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import Spinner from "../../../components/spinner/Spinner";
import {
  MdOutlineArrowForward,
  MdOutlineKeyboardBackspace
} from "react-icons/md";
import { uploadIcon } from "../../../assets/customisation";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomisationService } from "@/services/Customisation";
import removeBackground from "../../../utils/removeBg";
import { CompletionModal } from "../../../components/Modal/CompletionModal";
import { useNavigate } from "react-router-dom";
import LivePreview from "../LivePreviewComponent/LivePreview";
import toast from "react-hot-toast";
import { AuthActions } from "../../../zustand/auth.store";
import { stripHtml } from "../../../utils/Helpfunctions";
import SetupHeader from "../Setup/SetupHeader";
import { CustomisationStage3Validation } from "@/utilities/validations";
import HeroImageUpload from "./heroImageUpload";
import DocumentUpload from "@/components/forms/DocumentUpload/DocumentUpload";
import useUpload from "@/customHooks/useUpload";
import useStage3Customisation from "@/customHooks/Customisation/useCustomisationStep3";
interface Step3Props {
  primaryColor: any;
  secondaryColor: any;
  step: number;
  setStep: (step: number) => void;
  data: any;
}

// Validation schema

function Step3({
  primaryColor,
  secondaryColor,
  step,
  setStep,
  data
}: Step3Props) {
  const {
    selectedTemplate,
    setSelectedTemplate,
    isUploading,
    uploadError,
    isOpen,
    setIsOpen,
    dragging,
    setDragging,
    form,
    handleUpload,
    imageHolder,
    saveDataToLocaStorage,
    handleTextChange,
    characterCount,
    characterLimit,
    handleBeforeInput
  } = useStage3Customisation({ data, step, setStep });
  return (
    <>
      <div className="flex w-full bg-[#F3F3F3] h-full">
        <div className="w-[45%] h-full bg-white text-foundation-black p-8 font-satoshiBold">
          <SetupHeader
            stage={2}
            prev={goBack}
            isBlogChosen={data?.services.includes("Blog")}
          />
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
                        onChange={handleTextChange}
                        onKeyDown={handleBeforeInput}
                        onBlur={() =>
                          saveDataToLocaStorage({ text: form.values.heroText })
                        }
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

                      <div
                        className="flex "
                        style={{
                          justifyContent: form.errors.heroText
                            ? "space-between"
                            : "end"
                        }}
                      >
                        {form.touched && form.errors.heroText && (
                          <span className="text-[#D42620] text-sm">
                            {form.errors.heroText}
                          </span>
                        )}
                        <span className="font-satoshiLight text-sm text-[#667085]">
                          {characterCount}/{characterLimit} characters
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* hero image */}
                  <DocumentUpload
                    uploadInterface={
                      <HeroImageUpload
                        isUploading={isUploading}
                        form={form}
                        uploadError={error}
                        handleFileChange={handleUpload}
                        // handleDrop={handleDrop}
                        dragging={dragging}
                        imageUrl={imageHolder}
                        setDragging={setDragging}
                        // saveDataToLocaStorage={saveDataToLocaStorage}
                      />

                    }
                    onBlur={()=> saveDataToLocaStorage({ imageUrl: form.values.heroImage })}
                    callback={() => {
                      form.setSubmitting(false);
                      const fileUrl = imageHolder;
                      form.setFieldValue("heroImage", fileUrl);
                      scrollToSection();
                    }}
                    validFormats=".jpeg,.png,.jpg"
                  />
                </div>
                <button
                  type="button"
                  disabled={
                    !stripHtml(form.values.heroText).trim() ||
                    !form.values.heroImage.trim() ||
                    form.isSubmitting ||
                    isUploading
                  }
                  onClick={() => form.handleSubmit()}
                  className="bg-primary w-full rounded-lg text-white text-sm inline-flex gap-2 my-4 items-center justify-center text-center p-2.5 font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
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
            heroImage={form.values.heroImage}
            heroText={form.values.heroText}
          />
        </div>
      </div>
      <CompletionModal isOpen={isOpen} handleProceed={handleProceed} />
    </>
  );
}

export default Step3;
