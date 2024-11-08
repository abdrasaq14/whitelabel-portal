"use client"
import { TextInput, Toggle } from "@/components/blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import BlogFileUpload from "@/components/blog/Inputs";
import { FormikProvider, useFormik } from "formik";
import BlogDescription from "@/components/blog/CkEditor/CkEditor";
import { postNotAvailableImage } from "../../../public/images/blog";
import { GoTrash } from "react-icons/go";
import { BreadCrumbWithBackButton } from "@/components/Breadcrumb";
import { useBlogPost } from "@/customHooks/Blog/useBlogPost";
import { useRouter } from "next/router";
import { HandlePreviewPayload } from "@/interfaces/AppInterfaces";
import AppButton from "../forms/AppButton";
import { ButtonType, SpinnerType } from "@/enums/ComponentEnums";
import Spinner from "../feedbacks/Spinner";
import BlogPubLishedModal from "../modals/blog/PublishedModal";


const CreateBlog = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const {
    error,
    setError,
    setIsBlogEditing,
    setOpenModal,
    isLoading,
    setIsLoading,
    isBlogEditing,
    openModal,
    form,
    today,
    handleClickOutside,
    handlePreview
  } = useBlogPost({ id: id?.trim() ? id : undefined });

  console.log("formDetails", form.values, form.errors);
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
          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Post Blog</h2>
              <span className="text-primary-text w-[90%]">
                Provide all the information you want to post below, you can
                preview it before you post.
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                handlePreview({
                  ...form.values,
                  isFromEdit: id ? true : false,
                  publishedDate: new Date().toISOString()
                } as HandlePreviewPayload)
              } // pass isFromEdit to differentiate between edit and create
              disabled={
                form.isSubmitting || !form.values.title || !form.values.content
              }
              className="border border-primary font-semibold hover:bg-purple-main disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-white hover:text-white rounded-md text-primary-text p-2"
            >
              Preview
            </button>
          </div>

          {id && isLoading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : error.trim() ? (
            <div className="w-full flex  flex-col items-center justify-center mt-8">
              <img
                src={postNotAvailableImage.src}
                alt=""
                className="object-cover  max-h-[450px] mb-6"
              />
              <p className="text-primary-text font-black text-xl text-center">
                Oopss!!!
              </p>
              <p className="text-primary-text text-center">
                {error || "Post not found"}
              </p>
            </div>
          ) : (
            <FormikProvider value={form}>
              <form className="w-full md:gap-8 grid grid-cols-1 md:grid-cols-2 justify-center mt-8">
                <TextInput
                  maxLength={100}
                  {...form.getFieldProps("title")}
                  title="Blog Title"
                  type="text"
                  placeholder="Blog title"
                  wrapperClass=""
                />
                <TextInput
                  name="publishedDate"
                  value={today}
                  icon={<IoCalendarOutline />}
                  disabled={true}
                  title="Date"
                  type="date"
                  min={today}
                  placeholder="Blog title"
                  wrapperClass=" !w-[50%]"
                />
                {/* content */}
                <div className="flex flex-col gap-2 col-span-1">
                  <span className="text-primary-text font-semibold">
                    Content (Blog Description)
                  </span>
                  <BlogDescription
                    {...form.getFieldProps("content")}
                    name="content"
                  />
                  {/* comment and like management */}
                </div>

                {/* blog image  */}
                <div className="flex flex-col gap-2 col-span-1 h-fit">
                  <span className="text-primary-text font-semibold">
                    Blog Image
                  </span>
                  <BlogFileUpload
                    disabled={form.isSubmitting}
                    setIsBlogEditing={setIsBlogEditing}
                    // {...form.getFieldProps("image")}
                    extraClass="min-h-[15rem]"
                    name="image"
                    fileType="image"
                  />
                  {/* uploaded images for edit post */}
                  {id && form.values.image && isBlogEditing && (
                    <div className="flex flex-col w-full mt-4 gap-2">
                      <span className="font-semibold">Uploaded Post Image</span>
                      <div
                        className={`relative flex items-center justify-between border border-[#470e812b] rounded-md p-2 h-[50px] w-full bg-purple-main bg-opacity-5 `}
                      >
                        <span className="text-primary-text">Image 1.jpg</span>
                        <GoTrash
                          size={20}
                          color="#D42620"
                          onClick={() => {
                            form.setFieldValue("image", "");
                            setIsBlogEditing(false);
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                  <span className=" font-semibold mt-8 mb-2">
                    Comment & Like Management
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex gap-2 items-center">
                      <span className="">Add comments</span>
                      <Toggle
                        name="allowComment"
                        value={form.values.allowComments}
                        onChange={(value: boolean) =>
                          form.setFieldValue("allowComments", value)
                        }
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="">Add Likes</span>
                      <Toggle
                        name="allowLikes"
                        value={form.values.allowLikes}
                        onChange={(value: boolean) =>
                          form.setFieldValue("allowLikes", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* save as draft and publish */}
                <div className="flex flex-col  col-span-1 sm:flex-row sm:justify-between gap-2 sm:gap-6 text-primary-text mt-4">
                  <AppButton
                    text={`${
                      form.isSubmitting && form.values.status === "draft"
                        ? "Saving..."
                        : "Save as Draft"
                    }`}
                    type={
                      form.isSubmitting && form.values.status === "draft"
                        ? ButtonType.DISABLED
                        : ButtonType.SECONDARY
                    }
                    disabled={
                      form.isSubmitting ||
                      !form.values.title ||
                      !form.values.content
                    }
                    handleClick={async () => {
                      // Set the status to 'draft' before validation
                      await form.setFieldValue("status", "draft");

                      // Manually reset the validation for the 'image' field since it's optional for draft
                      await form.setFieldTouched("image", false);
                      await form.validateField("image"); // Re-run validation on image

                      // Submit form without worrying about image when draft
                      form.handleSubmit();
                    }}
                    style="border font-semibold rounded-md min-w-[7.5rem] w-[50%] py-3"
                  />
                  <AppButton
                    text={`${
                      form.isSubmitting && form.values.status === "published"
                        ? "Publishing..."
                        : "Publish"
                    }`}
                    type={
                      form.isSubmitting && form.values.status === "published"
                        ? ButtonType.DISABLED
                        : ButtonType.PRIMARY
                    }
                    disabled={
                      form.isSubmitting ||
                      !form.values.title ||
                      !form.values.content
                    }
                    handleClick={async () => {
                      // Set status to 'published'
                      const publishedDate = new Date().toISOString();
                      await form.setFieldValue("status", "published");
                      await form.setFieldValue("publishedDate", publishedDate);

                      // Mark the image field as touched so the validation message can be shown
                      await form.setFieldTouched("image", true);

                      // Trigger form validation and handle form submission
                      form.handleSubmit();
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
        form={form}
      />
    </div>
  );
};

export default CreateBlog;
