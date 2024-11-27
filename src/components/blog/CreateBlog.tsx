"use client";
import { Toggle } from "@/components/blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import BlogFileUpload from "@/components/blog/Inputs";
import { FormikProvider, useFormik } from "formik";
import BlogDescription from "@/components/blog/CkEditor/CkEditor";
import { postNotAvailableImage } from "../../../public/images/blog";
import { GoTrash } from "react-icons/go";
import { BreadCrumbWithBackButton } from "@/components/Breadcrumb";
import { useBlogPost } from "@/customHooks/Blog/useBlogPost";
import { useRouter, useSearchParams } from "next/navigation";
import { HandlePreviewPayload } from "@/interfaces/AppInterfaces";
import AppButton from "../forms/AppButton";
import Spinner from "../feedbacks/Spinner";
import BlogPubLishedModal from "../modals/blog/PublishedModal";
import { useEffect, useState } from "react";
import { useCustomFormik } from "@/customHooks/useCustomFormik";
import { BlogValidationSchema } from "@/utilities/validations";
import dynamic from "next/dynamic";
import { ButtonType, SpinnerType, TextboxType } from "@/enums/ComponentEnums";
import ValidationError from "../forms/ValidationError";
import { BsExclamationCircle } from "react-icons/bs";
import AppTextBox from "../forms/AppTextBox";
import DocumentUpload from "../forms/DocumentUpload/DocumentUpload";
import useUpload from "@/customHooks/useUpload";
import AddInventoryImage from "../forms/DocumentUpload/AddInventoryImage";
import UploadBlogImage from "./UploadBlogImage";
interface CreateBlogProps {
  id?: string;
}
const CustomEditor = dynamic(
  () => import("@/components/blog/CkEditor/CkEditor"),
  { ssr: false }
);
const CreateBlog: React.FC<CreateBlogProps> = ({ id }) => {
  const router = useRouter();
  const {
    blogError,
    initialValues,
    setBlogError,
    onSubmit,
    setIsBlogEditing,
    setOpenModal,
    isLoading,
    setIsLoading,
    isBlogEditing,
    openModal,
    today,
    handleClickOutside,
    handlePreview,
  } = useBlogPost({ id });
  // const {
  //   handleBlur,
  //   handleChange,
  //   getFieldProps,
  //   errors,
  //   values,
  //   isSubmitting,
  //   setFieldValue,
  //   setFieldTouched,
  //   validateField,
  //   handleSubmit,
  //   touched,
  // } = useCustomFormik(initialValues, onSubmit, BlogValidationSchema);
  const formik = useCustomFormik(initialValues, onSubmit, BlogValidationSchema);
  console.log("formDetails", openModal);
  console.log(
    "getFieldProps for title:",
    formik.getFieldProps("image"),
    initialValues
  );
  const {
    uploading,
    handleHoldImage,
    imageHolder,
    error,
  } = useUpload();
  useEffect(() => {
    if (imageHolder) {
      formik.setFieldValue("image", imageHolder);
    }
  }, [imageHolder]);
  // console.log("formDetailsFileName", fileName);
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath={id ? "Edit Post" : "Create Post"}
            handleBackAction={() => router.back()}
          />
          <div className="flex justify-between items-center text-accent-darker">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Post Blog</h2>
              <span className="text-accent-light3 w-[90%]">
                Provide all the information you want to post below, you can
                preview it before you post.
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                handlePreview({
                  ...formik.values,
                  isFromEdit: id ? true : false,
                  publishedDate: new Date().toISOString(),
                } as HandlePreviewPayload)
              } // pass isFromEdit to differentiate between edit and create
              disabled={
                formik.isSubmitting ||
                !formik.values.title ||
                !formik.values.content
              }
              className="border border-primary font-semibold hover:bg-purple-main disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-white hover:text-white rounded-md text-accent-darker p-2"
            >
              Preview
            </button>
          </div>

          {isLoading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : blogError.trim() ? (
            <div className="w-full flex  flex-col items-center justify-center mt-8">
              <img
                src={postNotAvailableImage.src}
                alt=""
                className="object-cover  max-h-[450px] mb-6"
              />
              <p className="text-accent-darker font-black text-xl text-center">
                Oopss!!!
              </p>
              <p className="text-accent-darker text-center">
                {blogError || "Post not found"}
              </p>
            </div>
          ) : (
            <FormikProvider value={formik}>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full md:gap-8 grid grid-cols-1 md:grid-cols-2 justify-center mt-8"
              >
                <div className="w-full">
                  <AppTextBox
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    topLabel="Blog Title"
                    type={TextboxType.TEXT}
                    placeholder="Blog title"
                    bottomLabel={
                      formik.touched.title && formik.errors.title ? (
                        <ValidationError
                          icon={BsExclamationCircle}
                          message={String(formik.errors.title)}
                        />
                      ) : (
                        ""
                      )
                    }
                  />
                </div>
                {/* <TextInput
                maxLength={100}
                {...getFieldProps("title")}
                title="Blog Title"
                type="text"
                placeholder="Blog title"
                wrapperClass=""
              /> */}
                <div className="!w-[50%]">
                  <AppTextBox
                    name="publishedDate"
                    value={today}
                    // leftIcon={<IoCalendarOutline />}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    topLabel="Date"
                    type={TextboxType.DATE}
                    disabled={true}
                    placeholder=""
                    bottomLabel={
                      formik.touched.publishedDate &&
                      formik.errors.publishedDate ? (
                        <ValidationError
                          icon={BsExclamationCircle}
                          message={String(formik.errors.publishedDate)}
                        />
                      ) : (
                        ""
                      )
                    }
                  />
                </div>
                {/* <TextInput
                name="publishedDate"
                value={today}
                disabled={true}
                title="Date"
                type="date"
                min={today}
                placeholder="Blog title"
                wrapperClass=" !w-[50%]"
              /> */}
                {/* content */}
                <div className="flex flex-col gap-2 col-span-1">
                  <span className="text-accent-darker font-semibold">
                    Content (Blog Description)
                  </span>
                  <CustomEditor {...formik.getFieldProps("content")} />
                  {/* comment and like management */}
                </div>

                {/* blog image  */}
                <div className="flex flex-col gap-2 col-span-1 h-fit">
                  <span className="text-accent-darker font-semibold">
                    Blog Image
                  </span>
                  <DocumentUpload
                    uploadInterface={
                      <UploadBlogImage
                        loader={{
                          loading: uploading,
                          type: SpinnerType.PRIMARY,
                          height: 25,
                          width: 25,
                        }}
                        image={imageHolder}
                        fileName={""}
                        setFileName={() => {}}
                        error={error || ""}
                      />
                    }
                    validFormats=".jpeg,.png,.jpg"
                    callback={handleHoldImage}
                    // otherData={activeStaff?._id}
                  />
                  {imageHolder == null ? (
                    <ValidationError
                      icon={BsExclamationCircle}
                      message="image is required"
                    />
                  ) : (
                    ""
                  )}
                  {/* <BlogFileUpload
                  disabled={isSubmitting}
                  setIsBlogEditing={setIsBlogEditing}
                  {...getFieldProps("image")}
                  extraClass="min-h-[15rem]"
                  name="image"
                  fileType="image"
                  type={"text"}
                /> */}
                  {/* uploaded images for edit post */}
                  {id && formik.values.image && isBlogEditing && (
                    <div className="flex flex-col w-full mt-4 gap-2">
                      <span className="font-semibold">Uploaded Post Image</span>
                      <div
                        className={`relative flex items-center justify-between border border-[#470e812b] rounded-md p-2 h-[50px] w-full bg-purple-main bg-opacity-5 `}
                      >
                        <span className="text-accent-darker">Image 1.jpg</span>
                        <GoTrash
                          size={20}
                          color="#D42620"
                          onClick={() => {
                            formik.setFieldValue("image", "");
                            setIsBlogEditing(false);
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                  <span className=" font-semibold mt-8 mb-2 text-accent-darker">
                    Comment & Like Management
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex gap-2 items-center">
                      <span className="text-accent-light3">Add comments</span>
                      <Toggle
                        name="allowComment"
                        value={formik.values.allowComments}
                        onChange={(value: boolean) =>
                          formik.setFieldValue("allowComments", value)
                        }
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-accent-light3">Add Likes</span>
                      <Toggle
                        name="allowLikes"
                        value={formik.values.allowLikes}
                        onChange={(value: boolean) =>
                          formik.setFieldValue("allowLikes", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* save as draft and publish */}
                <div className="flex flex-col  col-span-1 sm:flex-row sm:justify-between gap-2 sm:gap-6 text-accent-darker mt-4">
                  <AppButton
                    text={`${
                      formik.isSubmitting && formik.values.status === "draft"
                        ? "Saving..."
                        : "Save as Draft"
                    }`}
                    type={
                      formik.isSubmitting && formik.values.status === "draft"
                        ? ButtonType.DISABLED
                        : ButtonType.SECONDARY
                    }
                    disabled={
                      formik.isSubmitting ||
                      !formik.values.title ||
                      !formik.values.content
                    }
                    handleClick={async () => {
                      // Set the status to 'draft' before validation
                      await formik.setFieldValue("status", "draft");

                      // Manually reset the validation for the 'image' field since it's optional for draft
                      await formik.setFieldTouched("image", false);
                      await formik.validateField("image"); // Re-run validation on image

                      // Submit form without worrying about image when draft
                      formik.handleSubmit();
                    }}
                    style="border font-semibold rounded-md min-w-[7.5rem] w-[50%] py-3"
                  />
                  <AppButton
                    text={`${
                      formik.isSubmitting &&
                      formik.values.status === "published"
                        ? "Publishing..."
                        : "Publish"
                    }`}
                    type={
                      formik.isSubmitting &&
                      formik.values.status === "published"
                        ? ButtonType.DISABLED
                        : ButtonType.PRIMARY
                    }
                    disabled={
                      formik.isSubmitting ||
                      !formik.values.title ||
                      !formik.values.content
                    }
                    handleClick={async () => {
                      // Set status to 'published'
                      const publishedDate = new Date().toISOString();
                      await formik.setFieldValue("status", "published");
                      await formik.setFieldValue(
                        "publishedDate",
                        publishedDate
                      );

                      // Mark the image field as touched so the validation message can be shown
                      await formik.setFieldTouched("image", true);

                      // Trigger form validation and handle form submission
                      formik.handleSubmit();
                    }}
                    style="font-semibold rounded-md  min-w-[7.5rem] w-[50%] py-2"
                  />
                </div>
              </form>
            </FormikProvider>
          )}
        </div>
      </div>
      <BlogPubLishedModal
        isOpen={openModal}
        handleClose={(isView) => handleClickOutside(isView)}
        values={formik.values}
      />
    </div>
  );
};

export default CreateBlog;
