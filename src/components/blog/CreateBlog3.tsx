"use client";
import { TextInput, Toggle } from "@/components/blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import BlogFileUpload from "@/components/blog/Inputs";
import { FormikProvider, useFormik } from "formik";
import BlogDescription from "@/components/blog/CkEditor/CkEditor";
import { postNotAvailableImage } from "../../../public/images/blog";
import { GoTrash } from "react-icons/go";
import { BreadCrumbWithBackButton } from "@/components/Breadcrumb";
import { useBlogPost } from "@/customHooks/Blog/useBlogPost3";
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
    error,
    initialValues,
    setError,
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
  const {
    handleBlur,
    handleChange,
    getFieldProps,
    errors,
    values,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    validateField,
    handleSubmit,
    touched,
  } = useCustomFormik(initialValues, onSubmit, BlogValidationSchema);
  console.log("formDetails", initialValues);
  console.log("getFieldProps for title:", getFieldProps("title"));

  // console.log("formDetails", form.values, form.errors);
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
                  ...values,
                  isFromEdit: id ? true : false,
                  publishedDate: new Date().toISOString(),
                } as HandlePreviewPayload)
              } // pass isFromEdit to differentiate between edit and create
              disabled={isSubmitting || !values.title || !values.content}
              className="border border-primary font-semibold hover:bg-purple-main disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-white hover:text-white rounded-md text-accent-darker p-2"
            >
              Preview
            </button>
          </div>

          {isLoading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : error.trim() ? (
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
                {error || "Post not found"}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full md:gap-8 grid grid-cols-1 md:grid-cols-2 justify-center mt-8"
            >
              <AppTextBox
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                topLabel="Blog Title"
                type={TextboxType.TEXT}
                disabled={true}
                placeholder="Blog title"
                bottomLabel={
                  touched.title && errors.title ? (
                    <ValidationError
                      icon={BsExclamationCircle}
                      message={String(errors.title)}
                    />
                  ) : (
                    ""
                  )
                }
              />
              {/* <TextInput
                maxLength={100}
                {...getFieldProps("title")}
                title="Blog Title"
                type="text"
                placeholder="Blog title"
                wrapperClass=""
              /> */}
              <AppTextBox
                name="publishedDate"
                value={today}
                // leftIcon={<IoCalendarOutline />}
                onChange={handleChange}
                onBlur={handleBlur}
                topLabel="Date"
                type={TextboxType.DATE}
                disabled={true}
                placeholder=""
                bottomLabel={
                  touched.publishedDate && errors.publishedDate ? (
                    <ValidationError
                      icon={BsExclamationCircle}
                      message={String(errors.publishedDate)}
                    />
                  ) : (
                    ""
                  )
                }
              />
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
                <CustomEditor
                  name="content"
                />
                {/* comment and like management */}
              </div>

              {/* blog image  */}
              <div className="flex flex-col gap-2 col-span-1 h-fit">
                <span className="text-accent-darker font-semibold">
                  Blog Image
                </span>
                <BlogFileUpload
                  disabled={isSubmitting}
                  setIsBlogEditing={setIsBlogEditing}
                  // {...form.getFieldProps("image")}
                  extraClass="min-h-[15rem]"
                  name="image"
                  fileType="image"
                  type={"text"}
                />
                {/* uploaded images for edit post */}
                {id && values.image && isBlogEditing && (
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
                          setFieldValue("image", "");
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
                      value={values.allowComments}
                      onChange={(value: boolean) =>
                        setFieldValue("allowComments", value)
                      }
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-accent-light3">Add Likes</span>
                    <Toggle
                      name="allowLikes"
                      value={values.allowLikes}
                      onChange={(value: boolean) =>
                        setFieldValue("allowLikes", value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* save as draft and publish */}
              <div className="flex flex-col  col-span-1 sm:flex-row sm:justify-between gap-2 sm:gap-6 text-accent-darker mt-4">
                <AppButton
                  text={`${
                    isSubmitting && values.status === "draft"
                      ? "Saving..."
                      : "Save as Draft"
                  }`}
                  type={
                    isSubmitting && values.status === "draft"
                      ? ButtonType.DISABLED
                      : ButtonType.SECONDARY
                  }
                  disabled={isSubmitting || !values.title || !values.content}
                  handleClick={async () => {
                    // Set the status to 'draft' before validation
                    await setFieldValue("status", "draft");

                    // Manually reset the validation for the 'image' field since it's optional for draft
                    await setFieldTouched("image", false);
                    await validateField("image"); // Re-run validation on image

                    // Submit form without worrying about image when draft
                    handleSubmit();
                  }}
                  style="border font-semibold rounded-md min-w-[7.5rem] w-[50%] py-3"
                />
                <AppButton
                  text={`${
                    isSubmitting && values.status === "published"
                      ? "Publishing..."
                      : "Publish"
                  }`}
                  type={
                    isSubmitting && values.status === "published"
                      ? ButtonType.DISABLED
                      : ButtonType.PRIMARY
                  }
                  disabled={isSubmitting || !values.title || !values.content}
                  handleClick={async () => {
                    // Set status to 'published'
                    const publishedDate = new Date().toISOString();
                    await setFieldValue("status", "published");
                    await setFieldValue("publishedDate", publishedDate);

                    // Mark the image field as touched so the validation message can be shown
                    await setFieldTouched("image", true);

                    // Trigger form validation and handle form submission
                    handleSubmit();
                  }}
                  style="font-semibold rounded-md  min-w-[7.5rem] w-[50%] py-2"
                />
              </div>
            </form>
          )}
        </div>
      </div>
      {/* <BlogPubLishedModal
        isOpen={openModal}
        handleClose={(isView) => handleClickOutside(isView)}
        values={values}
      /> */}
    </div>
  );
};

export default CreateBlog;
