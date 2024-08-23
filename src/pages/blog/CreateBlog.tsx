import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { TextInput, Toggle } from "../../components/Blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";
import FileUpload from "../../components/Blog/Inputs";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import BlogDescription from "../../components/Blog/CkEditor/CkEditor";
import { useMutation } from "react-query";
import { BlogPayload, BlogService } from "../../services/blog.service";
import { useAuth } from "../../zustand/auth.store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { decrypt, encrypt, handleError } from "../../utils/Helpfunctions";
import { useBlogStore } from "../../zustand/blog.tore";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
import { noContentImage, postNotAvailableImage } from "../../assets/blog";
import { GoTrash } from "react-icons/go";
import { Button } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
export interface HandlePreviewPayload extends BlogPayload {
  isFromEdit: boolean;
}
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(2, "Title is too short")
    .max(100, "Title is too long"),
  createdAt: Yup.date().required("Date is required"),
  content: Yup.string().trim().required("Description is required"),
  image: Yup.string().url(),
  status: Yup.string().trim().required("Status is required"),
  allowComments: Yup.boolean(),
  allowLikes: Yup.boolean(),
});

const CreateBlogPost = () => {
  const profile: any = useAuth((s) => s.profile);
  const addPost = useBlogStore((state) => state.addPost);
  const updatePost = useBlogStore((state) => state.updatePost);
  const { id }: any = useParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBlogEditing, setIsBlogEditing] = useState(true);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
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
      createdAt: "",
      whiteLabelName: profile?.whiteLabelName,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit.mutate(values);
    },
    // validateOnMount: false,
    // validateOnChange: true,
    // validateOnBlur: true
  });
  const handleSubmit = useMutation(
    async (values: BlogPayload) => {
      if (id) {
        return await BlogService.updateBlog(id, values);
      }
      return await BlogService.create(values);
    },
    {
      onSuccess: (response) => {
        form.setSubmitting(false);
        if (id) {
          updatePost(id, response.data?.result);
        } else {
          addPost(response.data?.result);
        }
        localStorage.removeItem("_Blog");
        toast.success(id ? "Blog post updated" : "Blog post created");
        form.resetForm();
        navigate("/blog");
        // show success toast
      },
      onError: (error) => {
        form.setSubmitting(false);
        const e = handleError(error);
        toast.error(e);
        console.log("erro", error);
        // show error toast
      },
    }
  );
  // console.log("form.Values", form.values);

  const handlePreview = (value: HandlePreviewPayload) => {
    localStorage.setItem("_Blog", encrypt(JSON.stringify(value)));
    navigate("/blog/preview");
    // toast.success("Blog previewed successfully");
  };

  useEffect(() => {
    if (id) {
      const localBlogDetails = localStorage.getItem("_Blog");
      if (localBlogDetails) {
        const blogDetails: BlogPayload = decrypt(localBlogDetails);
        if (blogDetails._id === id) {
          form.setValues(decrypt(localBlogDetails));
          setTimeout(() => {
            // toast.success("Pick up from where you left off");
            setIsLoading(false);
          }, 1500);
          return;
        }
      }

      BlogService.viewBlog(id)
        .then((res) => {
          try {
            if (res.data.result) {
              setError("");
              const blogDetails = res.data.result;
              blogDetails.createdAt = new Date(blogDetails.createdAt)
                .toISOString()
                .split("T")[0]; // Format the date to YYYY-MM-DD
              form.setValues(blogDetails);
              setTimeout(() => setIsLoading(false), 1500);
              return;
            }
            setError("Post Detail not found");
            return;
          } catch (error) {
            setIsLoading(false);
            setError("Failed to fetch blog post");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError("Failed to fetch blog post");
        });
      return;
    }
    const localBlogDetails = localStorage.getItem("_Blog");
    if (localBlogDetails) {
      form.setValues(decrypt(localBlogDetails));
      setTimeout(() => setIsLoading(false), 900);
      // setIsLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath={id ? "Edit Post" : "Create Post"}
            handleBackAction={() => navigate(-1)}
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
                handlePreview({ ...form.values, isFromEdit: id ? true : false })
              } // pass isFromEdit to differentiate between edit and create
              disabled={
                form.isSubmitting || !form.values.title || !form.values.content
              }
              className="border border-primary font-semibold hover:bg-primary disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-white hover:text-white rounded-md text-primary-text p-2"
            >
              Preview
            </button>
          </div>

          {id && isLoading ? (
            <AppFallback />
          ) : error.trim() ? (
            <div className="w-full flex  flex-col items-center justify-center mt-8">
              <img
                src={postNotAvailableImage}
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
                  {...form.getFieldProps("createdAt")}
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
                        className={`relative flex items-center justify-between border border-[#470e812b] rounded-md p-2 h-[50px] w-full bg-primary bg-opacity-5 `}
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
                  <Button
                    type="button"
                    isLoading={
                      form.isSubmitting && form.values.status === "draft"
                    }
                    disabled={
                      form.isSubmitting ||
                      !form.values.title ||
                      !form.values.content ||
                      !form.values.createdAt
                    }
                    label={`${
                      form.isSubmitting && form.values.status === "draft"
                        ? "Saving..."
                        : "Save as Draft"
                    }`}
                    onClick={() => {
                      form.setFieldValue("status", "draft");
                      form.handleSubmit();
                    }}
                    className="border bg-white border-primary font-semibold rounded-md !text-primary min-w-[7.5rem] w-[50%] py-3"
                  />
                  <Button
                    type="button"
                    isLoading={
                      form.isSubmitting && form.values.status === "published"
                    }
                    disabled={
                      form.isSubmitting ||
                      !form.values.title ||
                      !form.values.content ||
                      !form.values.createdAt
                    }
                    label={`${
                      form.isSubmitting && form.values.status === "published"
                        ? "Publishing..."
                        : "Publish"
                    }`}
                    onClick={() => {
                      form.setFieldValue("status", "published");
                      form.handleSubmit();
                    }}
                    className="bg-primary font-semibold  text-white rounded-md  min-w-[7.5rem] w-[50%] py-2"
                  />
                </div>
              </form>
            </FormikProvider>
          )}
        </div>
      </div>
      <Modal open={openModal} onClick={() => setOpenModal(false)}>
        <div className="flex flex-col items-center justify-between w-full lg:min-w-[450px] h-full px-8 rounded-md">
          <div className="flex-1 h-[65%] flex items-center justify-center ">
            <img
              src={noContentImage}
              alt=""
              className="max-h-[15rem] w-full h-full object-cover"
            />
          </div>
          <p className="text-primary-text font-black text-xl text-center my-2">
            Saved to Draft!!!
          </p>

          <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
            
            <Button
              label="Dismiss"
              onClick={() => setOpenModal(false)}
              className="border w-[50%] border-primary font-semibold bg-white text-primary rounded-md p-2"
            />
            <Button
              label="Dismiss"
              onClick={() => setOpenModal(false)}
              className="border w-[50%] border-primary font-semibold bg-primary text-white rounded-md p-2"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateBlogPost;
