import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter as navigate } from "next/navigation";
import { BlogService } from "@/services/blog";
import { encrypt, decrypt } from "@/utilities/helperFunctions";
import toast from "react-hot-toast";
import useStorage from "../useStorage";
import { addPost, updatePost } from "@/store/slices/blogSlice";
import { BlogValidationSchema } from "@/utilities/validations";
import {
  IBlogPayload,
  IComments,
  IUseBlogBostProps,
} from "@/interfaces/ComponentInterfaces";
import { User } from "@/interfaces/AppInterfaces";
import { useAppDispatch } from "@/store/hooks";

export const useBlogPost = ({ id }: IUseBlogBostProps) => {
  const { currentUser } = useStorage();

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isBlogEditing, setIsBlogEditing] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [blogId, setBlogId] = useState("");

  const navigateTo = navigate();

  const today = new Date().toISOString().split("T")[0];

  const dispatch = useAppDispatch();

  let initialValues = {
    authorId: currentUser?.user?._id,

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

    whiteLabelName: currentUser?.user?.whiteLabelName,
  };

  const handleSubmit = async (values: IBlogPayload) => {
    try {
      if (id) {
        await dispatch(updatePost({ id, updatedPayload: values }));

        // return await BlogService.updateBlog(id, values);
      } else {
        const postToAdd = await dispatch(addPost(values));

        if (postToAdd.payload) {
          setBlogId(postToAdd.payload.result._id);

          return postToAdd;
        }
      }

      localStorage.removeItem("_Blog");

      toast.success(id ? "Blog post updated" : "Blog post created");

      setOpenModal(true);
    } catch (error: any) {
      setError(error);
    }

    // return await BlogService.create(values);
  };

  const handlePreview = (value: IBlogPayload & { isFromEdit: boolean }) => {
    localStorage.setItem("_Blog", encrypt(JSON.stringify(value)));

    navigateTo.push("/Blog/Preview");
  };

  const handleClickOutside = (isView: boolean) => {
    if (isView) {
      navigateTo.push(`/Blog/View/${id || blogId}`);
    } else {
      navigateTo.push(`/Blog`);
    }

    setOpenModal(false);
  };

  useEffect(() => {
    if (id) {
      const localBlogDetails = localStorage.getItem("_Blog");

      if (localBlogDetails) {
        const blogDetails: IBlogPayload = decrypt(localBlogDetails);

        if (blogDetails._id === id) {
          initialValues = {
            ...blogDetails,

            publishedDate: blogDetails.publishedDate || "",
          };

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

            initialValues = blogDetails;

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
        initialValues = decrypt(localBlogDetails);

        setIsLoading(false);
      }
    }
  }, [id]);

  return {
    initialValues,
    onSubmit: handleSubmit,
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

    today,
  };
};
