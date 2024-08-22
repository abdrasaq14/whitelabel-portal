import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import {  BlogService } from "../../services/blog.service";
import { useNavigate } from "react-router-dom";
import { decrypt, formatDate } from "../../utils/Helpfunctions";
import { Button } from "../../components/Button/Button";
import { HandlePreviewPayload } from "./CreateBlog";
import { useMutation } from "react-query";
import { useBlogStore } from "../../zustand/blog.tore";
import toast from "react-hot-toast";

const Preview = () => {
  useEffect(() => {
    // fetch blog post details
    const localBlogDetails = localStorage.getItem("_Blog");
    if (localBlogDetails) {
      setBlogDetails(decrypt(localBlogDetails));
    }
  }, []);
  const addPost = useBlogStore((state) => state.addPost);
  const updatePost = useBlogStore((state) => state.updatePost);

  const [blogDetails, setBlogDetails] = useState<HandlePreviewPayload>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStatusChange = (newStatus: "draft" | "published") => {
    // @ts-ignore
    setBlogDetails((prevDetails) => {
      // @ts-ignore
      const updatedDetails:HandlePreviewPayload = { ...prevDetails, status: newStatus };
      handleSubmit.mutate(updatedDetails);
      return 
    });
  };

  const handleSubmit = useMutation(
    async (values: HandlePreviewPayload) => {
      setIsSubmitting(true);

      if (values.isFromEdit) {
        return await BlogService.updateBlog(values._id as string, values);
      } else {
        return await BlogService.create(values);
      }
    },
    {
      onSuccess: (response) => {
        setIsSubmitting(false);
        if (blogDetails && blogDetails.isFromEdit) {
          updatePost(blogDetails._id as string, response.data?.result);
        } else {
          addPost(response.data?.result?.results);
        }
        localStorage.removeItem("_Blog");
        toast.success(blogDetails?.isFromEdit ? "Blog post updated" : "Blog post created");
        navigate("/blog");
      },
      onError: (error) => {
        setIsSubmitting(false);
        toast.error("Failed to create blog post");
        console.log("erro", error);
        
      },
    }
  );

  console.log("blogDetails", blogDetails);
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="Preview"
            handleBackAction={() => {
              navigate(-1);
            }}
          />

          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold font-gooperSemiBold">
                {blogDetails?.title}
              </h2>
              <div className="flex gap-4 text-primary-text text-sm">
                <span className="flex items-center gap-1">
                  {formatDate(blogDetails?.createdAt as string)}
                  <GoDotFill />3 mins read
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                isLoading={isSubmitting && blogDetails?.status === "draft"}
                disabled={
                  isSubmitting ||
                  blogDetails?.title === "" ||
                  blogDetails?.content === ""
                }
                label={`${
                  isSubmitting && blogDetails?.status === "draft"
                    ? "Saving..."
                    : "Save as Draft"
                }`}
                onClick={() => handleStatusChange("draft")}
                className="border bg-white border-primary font-semibold rounded-md !text-primary min-w-[7.5rem] w-[50%] py-3"
              />
              <Button
                isLoading={isSubmitting && blogDetails?.status === "published"}
                disabled={
                  isSubmitting ||
                  blogDetails?.title === "" ||
                  blogDetails?.content === ""
                }
                label={`${isSubmitting && blogDetails?.status === "published" ? "Publishing..." : "Publish"}`}
                onClick={() => handleStatusChange("published")} 
                className="border border-primary font-semibold bg-primary text-white rounded-md  p-2"
              />
            </div>
          </div>
          <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
            {blogDetails?.image && (
              <div className="w-full">
                <img
                  src={blogDetails?.image}
                  alt=""
                  className="object-cover w-full max-h-[300px]"
                />
              </div>
            )}
            <div className="">
              <p
                className="text-primary-text style-image"
                dangerouslySetInnerHTML={{
                  __html: blogDetails?.content || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
