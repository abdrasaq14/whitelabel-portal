import { useState, useEffect, useMemo } from "react";
import { useRouter as navigate } from "next/navigation";
import { BlogService } from "@/services/blog";
import { encrypt, decrypt } from "@/utilities/helperFunctions";
import toast from "react-hot-toast";
import useStorage from "../useStorage";
import { addPost, updatePost } from "@/store/slices/blogSlice";
import {
  IBlogPayload,
  IComments,
  IUseBlogBostProps,
} from "@/interfaces/ComponentInterfaces";
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

  // Default Initial Values
  const defaultValues = {
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

  const [initialValues, setInitialValues] = useState(defaultValues);

  const handleSubmit = async (values: IBlogPayload) => {
    try {
      if (id) {
        await dispatch(updatePost({ id, updatedPayload: values }));
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
      setError(error.message || "An error occurred");
    }
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
    const loadInitialValues = async () => {
      if (id) {
        const localBlogDetails = localStorage.getItem("_Blog");
        if (localBlogDetails) {
          const blogDetails: IBlogPayload = decrypt(localBlogDetails);
          if (blogDetails._id === id) {
            setInitialValues({
              ...blogDetails,
              publishedDate: blogDetails.publishedDate || "",
            });
            setIsLoading(false);
            return;
          }
        }
        try {
          const res:any = await BlogService.viewBlog(id);
          const blogDetails = res.data.result;
          if (blogDetails) {
            setInitialValues({
              ...blogDetails,
              publishedDate: new Date(blogDetails.publishedDate)
                .toISOString()
                .split("T")[0],
            });
            setError("");
          } else {
            setError("Post Detail not found");
          }
        } catch {
          setError("Failed to fetch blog post");
        } finally {
          setIsLoading(false);
        }
      } else {
        const localBlogDetails = localStorage.getItem("_Blog");
        if (localBlogDetails) {
          setInitialValues(decrypt(localBlogDetails));
        }
        setIsLoading(false);
      }
    };

    loadInitialValues();
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
