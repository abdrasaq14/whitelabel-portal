import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { TextInput, Toggle } from "../../components/Blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import FileUpload from "../../components/Blog/Inputs";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import BlogDescription from "../../components/Blog/CkEditor/CkEditor";
import { useMutation } from "react-query";
import { BlogPayload, BlogService } from "../../services/blog.service";
import { useAuth } from "../../zustand/auth.store";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  date: Yup.date().required("Date is required"),
  content: Yup.string().trim().required("Description is required"),
  image: Yup.string().trim().required("Image is required"),
  status: Yup.string().trim().required("Status is required"),
  allowComments: Yup.boolean(),
  allowLikes: Yup.boolean()
});

const CreateBlogPost = () => {
  const profile: any = useAuth((s) => s.profile);
  const form = useFormik({
    initialValues: {
      authorId: profile?._id,
      title: "",
      content: "",
      image: "",
      comments: [],
      status: "draft",
      likes: 0,
      shares: 0,
      allowComments: true,
      allowLikes: true,
      whiteLabelName: profile?.whiteLabelName
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit.mutate(values);
    }
    // validateOnMount: false,
    // validateOnChange: true,
    // validateOnBlur: true
  });
  console.log("form.Values", form.values);
  const handleSubmit = useMutation(
    async (values: BlogPayload) => {
      return await BlogService.create(values);
    },
    {
      onSuccess: () => {
        form.setSubmitting(false);
        form.resetForm();
        toast.success("Blog post created successfully");
        // show success toast
      },
      onError: (error) => {
        form.setSubmitting(false);
        toast.error("Failed to create blog post");
        console.log("erro", error);
        // show error toast
      }
    }
  );
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="Create"
            handleBackAction={() => {}}
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
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Preview
            </button>
          </div>

          <FormikProvider value={form}>
            <form
              onSubmit={form.handleSubmit}
              className="w-full md:gap-8 grid grid-cols-1 md:grid-cols-2 justify-center mt-8"
            >
              <TextInput
                {...form.getFieldProps("title")}
                title="Blog Title"
                type="text"
                placeholder="Blog title"
                wrapperClass=""
              />
              <TextInput
                {...form.getFieldProps("date")}
                icon={<IoCalendarOutline />}
                title="Date"
                type="date"
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
                <FileUpload
                disabled={form.isSubmitting}
                  // {...form.getFieldProps("image")}
                  extraClass="min-h-[15rem]"
                  name="image"
                  fileType="image"
                />
                
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
              <div className="flex flex-col  col-span-1 md:flex-row md:justify-between gap-2 md:gap-6 text-primary-text mt-4">
                <button
                  type="button"
                  className="border border-primary font-semibold rounded-md text-primary min-w-[7.5rem] w-[50%] py-3"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="bg-primary font-semibold  text-white rounded-md  min-w-[7.5rem] w-[50%] py-2"
                >
                  Publish
                </button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
