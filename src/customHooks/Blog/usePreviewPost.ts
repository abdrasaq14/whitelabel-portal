import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decrypt } from "@/utilities/helperFunctions";
<<<<<<< HEAD
=======
import AppButton from "@/components/forms/AppButton";
>>>>>>> 9a9d945 (blog module in progress)
import { useAppDispatch } from "@/store/hooks";
import { IPreviewPayload } from "@/interfaces/ComponentInterfaces";
import { useMutation } from "react-query";
import {
  addPost,
  updatePost,
} from "@/store/slices/blogSlice";
import toast from "react-hot-toast";

const usePreviewPost = () => {
  useEffect(() => {
    // fetch blog post details
    const localBlogDetails = localStorage.getItem("_Blog");
    if (localBlogDetails) {
      setBlogDetails(decrypt(localBlogDetails));
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [blogDetails, setBlogDetails] = useState<IPreviewPayload>();
  const [blogId, setBlogId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 const dispatch = useAppDispatch();
  const { push } = useRouter();

  const handleStatusChange = (newStatus: "draft" | "published") => {
    const publishedDate = new Date().toISOString();
    // @ts-ignore
    if (!blogDetails?.image.trim() && newStatus === "published") {
      return toast.error("Please upload an image to publish");
    }
    setBlogDetails((prevDetails) => {
      // @ts-ignore
      const updatedDetails: HandlePreviewPayload = {
        ...prevDetails,
        status: newStatus,
        publishedDate: newStatus === "published" ? publishedDate : ""
      };
      handleSubmit.mutate(updatedDetails);
      return updatedDetails;
    });
  };
  const handleClickOutside = (isView: boolean) => {
    setOpenModal(false);
    localStorage.removeItem("_Blog");
    if (isView) {
      push(`/blog/view/${blogId}`);
    } else {
      push(`/blog`);
    }
    setOpenModal(false);

    return;
  };
  // const handleClickOutside = () => {
  //   setOpenModal(false);
  //   localStorage.removeItem("_Blog");
  //   navigate(`/blog/view/${blogId}`);
  // };
  const handleSubmit = useMutation(
    async (values: IPreviewPayload) => {
      setIsSubmitting(true);

      if (values.isFromEdit) {
        // return await BlogService.updateBlog(values._id as string, values);
        const postToUpdate= await dispatch(
          updatePost({ id: values._id as string, updatedPayload: values })
        );
        if (postToUpdate.payload) {
          setBlogId(postToUpdate.payload.result._id);
          return postToUpdate;
        }
      } else {
        // return await BlogService.create(values);
        const postToAdd = await dispatch(addPost(values));
        if (postToAdd.payload) {
          setBlogId(postToAdd.payload.result._id);
          return postToAdd;
        }
      }
    },
    {
      onSuccess: (response) => {
        setIsSubmitting(false);
        setOpenModal(true);
        toast.success(
          blogDetails?.isFromEdit ? "Blog post updated" : "Blog post created"
        );
        // navigate("/blog");
      },
      onError: (error) => {
        setIsSubmitting(false);
        toast.error(error as string);
      }
    }
  );


  return {
    blogDetails,
    handleStatusChange,
    handleClickOutside,
    isSubmitting,
    openModal,
    setOpenModal
  };
};
export default usePreviewPost;
