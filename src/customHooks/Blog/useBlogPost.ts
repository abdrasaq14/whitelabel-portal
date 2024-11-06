import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter as navigate } from "next/navigation";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useRouter } from "next/router";
>>>>>>> 94f4fa5 (blog module completed)
=======
>>>>>>> a4bcbfd (blog module in progress)
import { useMutation } from "react-query";
import { BlogService } from "@/services/blog";
import { encrypt, decrypt } from "@/utilities/helperFunctions";
import toast from "react-hot-toast";
import useStorage from "../useStorage";
<<<<<<< HEAD
import { addPost, updatePost } from "@/store/slices/blogSlice";
=======
import { addPost, updatePost, deletePost, fetchAllPosts, selectAllPosts } from "@/store/slices/blogSlice";
>>>>>>> 94f4fa5 (blog module completed)
import { BlogValidationSchema } from "@/utilities/validations";
import {
  IBlogPayload,
  IComments,
  IUseBlogBostProps
} from "@/interfaces/ComponentInterfaces";
import { User } from "@/interfaces/AppInterfaces";
<<<<<<< HEAD
<<<<<<< HEAD
import { useAppDispatch } from "@/store/hooks";

export const useBlogPost = ({ id }: IUseBlogBostProps) => {
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;
=======
import { useAppSelector } from "@/store/hooks";
=======
import { useAppDispatch } from "@/store/hooks";
>>>>>>> 9a9d945 (blog module in progress)

export const useBlogPost = ({ id }: IUseBlogBostProps) => {
  const { getSessionData } = useStorage();
  const profile = getSessionData("userData") as User;
<<<<<<< HEAD
  const router = useRouter();
>>>>>>> 94f4fa5 (blog module completed)
=======
>>>>>>> a4bcbfd (blog module in progress)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBlogEditing, setIsBlogEditing] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [blogId, setBlogId] = useState("");
  const navigateTo = navigate();
  const today = new Date().toISOString().split("T")[0];
<<<<<<< HEAD
<<<<<<< HEAD
const dispatch = useAppDispatch();
=======

>>>>>>> 94f4fa5 (blog module completed)
=======
const dispatch = useAppDispatch();
>>>>>>> 9a9d945 (blog module in progress)
  const form = useFormik({
    initialValues: {
      authorId: profile?._id,
      title: "",
      content: "",
      image: "",
      comments: [] as IComments[],
      status: "draft",
      likes: 0,
      shares: 0,
      allowComments: true,
      allowLikes: true,
      publishedDate: "",
      whiteLabelName: profile?.whiteLabelName
    },
    validationSchema: BlogValidationSchema,
    onSubmit: (values) => {
      handleSubmit.mutate(values as IBlogPayload);
    }
  });

  const handleSubmit = useMutation(
    async (values: IBlogPayload) => {
      if (id) {
<<<<<<< HEAD
<<<<<<< HEAD
        return await dispatch(updatePost({ id, updatedPayload: values }));
        // return await BlogService.updateBlog(id, values);
      }
      const postToAdd = await dispatch(addPost(values));
      if (postToAdd.payload) {
        setBlogId(postToAdd.payload.result._id);
        return postToAdd;
      }
      // return await BlogService.create(values);
=======
        return await BlogService.updateBlog(id, values);
      }
      return await BlogService.create(values);
>>>>>>> 94f4fa5 (blog module completed)
=======
        return await dispatch(updatePost({ id, updatedPayload: values }));
        // return await BlogService.updateBlog(id, values);
      }
      const postToAdd = await dispatch(addPost(values));
      if (postToAdd.payload) {
        setBlogId(postToAdd.payload.result._id);
        return postToAdd;
      }
      // return await BlogService.create(values);
>>>>>>> 9a9d945 (blog module in progress)
    },
    {
      onSuccess: (response: any) => {
        form.setSubmitting(false);
<<<<<<< HEAD
<<<<<<< HEAD
=======
        if (id) {
          updatePost({ id, updatedPayload: response.data?.result });
        } else {
          addPost(response.data?.result);
          setBlogId(response.data?.result._id);
        }
>>>>>>> 94f4fa5 (blog module completed)
=======
>>>>>>> 9a9d945 (blog module in progress)
        localStorage.removeItem("_Blog");
        toast.success(id ? "Blog post updated" : "Blog post created");
        setOpenModal(true);
      },
      onError: (error) => {
        form.setSubmitting(false);
        // const e = handleError(error);
        toast.error(error as string);
      }
    }
  );

  const handlePreview = (value: IBlogPayload & { isFromEdit: boolean }) => {
    localStorage.setItem("_Blog", encrypt(JSON.stringify(value)));
    navigateTo.push("/blog/preview");
  };

  const handleClickOutside = (isView: boolean) => {
    form.resetForm();
    if (isView) {
      navigateTo.push(`/blog/view/${id || blogId}`);
    } else {
      navigateTo.push(`/blog`);
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (id) {
      const localBlogDetails = localStorage.getItem("_Blog");
      if (localBlogDetails) {
        const blogDetails: IBlogPayload = decrypt(localBlogDetails);
        if (blogDetails._id === id) {
          form.setValues({
            ...blogDetails,
            publishedDate: blogDetails.publishedDate || ""
          });
          setIsLoading(false);
          return;
        }
      }

      BlogService.viewBlog(id)
        .then((res: any) => {
          if (res.data.result) {
            setError("");
            const blogDetails = res.data.result;
            blogDetails.publishedDate = new Date(blogDetails.publishedDate)
              .toISOString()
              .split("T")[0];
            form.setValues(blogDetails);
            setIsLoading(false);
          } else {
            setError("Post Detail not found");
          }
        })
        .catch(() => {
          setError("Failed to fetch blog post");
          setIsLoading(false);
        });
    } else {
      const localBlogDetails = localStorage.getItem("_Blog");
      if (localBlogDetails) {
        form.setValues(decrypt(localBlogDetails));
        setIsLoading(false);
      }
    }
  }, [id]);

  return {
    form,
    isLoading,
    setIsLoading,
    error,
    setError,
    isBlogEditing,
    setIsBlogEditing,
    openModal,
    setOpenModal,
    handleClickOutside,
    handlePreview,
    today
  };
};
