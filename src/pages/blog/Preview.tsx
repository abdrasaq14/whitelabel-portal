import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { BlogService } from "../../services/blog.service";
import { useNavigate } from "react-router-dom";
import { decrypt, formatDate, handleError } from "../../utils/Helpfunctions";
import { Button } from "../../components/Button/Button";
import { HandlePreviewPayload } from "./CreateBlog";
import { useMutation } from "react-query";
import { useBlogStore } from "../../zustand/blog.tore";
import toast from "react-hot-toast";
import { noContentImage } from "../../assets/blog";
import Modal from "../../components/Modal/Modal";

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
  const [openModal, setOpenModal] = useState(false);
  const [blogDetails, setBlogDetails] = useState<HandlePreviewPayload>();
  const [blogId, setBlogId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
        publishedDate: newStatus === "published" ? publishedDate : "",
      };
      handleSubmit.mutate(updatedDetails);
      return updatedDetails;
    });
  };
    const handleClickOutside = (isView: boolean) => {
      setOpenModal(false);
      localStorage.removeItem("_Blog");
      if (isView) {
        navigate(`/blog/view/${blogId}`);
      } else {
        navigate(`/blog`);
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
          setBlogId(response.data?.result?._id as string);
        } else {
          addPost(response.data?.result?.results);
          setBlogId(response.data?.result?._id);
        }
        setOpenModal(true);
        toast.success(
          blogDetails?.isFromEdit ? "Blog post updated" : "Blog post created"
        );
        // navigate("/blog");
      },
      onError: (error) => {
        setIsSubmitting(false);
        const e = handleError(error);
        console.log("erroblogDetails", error);
        toast.error(e);
      }
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
                  {formatDate(blogDetails?.publishedDate as string)}
                  <GoDotFill />3 mins read
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
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
                type="button"
                isLoading={isSubmitting && blogDetails?.status === "published"}
                disabled={
                  isSubmitting ||
                  blogDetails?.title === "" ||
                  blogDetails?.content === ""
                }
                label={`${
                  isSubmitting && blogDetails?.status === "published"
                    ? "Publishing..."
                    : "Publish"
                }`}
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
                  __html: blogDetails?.content || ""
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClick={()=>handleClickOutside(false)}>
        <div className="flex flex-col items-center justify-between w-full lg:min-w-[450px] h-full px-8 rounded-md">
          <div className="flex-1 h-[65%] flex items-center justify-center ">
            <img
              src={noContentImage}
              alt=""
              className="max-h-[15rem] w-full h-full object-cover"
            />
          </div>
          <p className="text-primary-text font-black text-xl text-center my-2">
            {blogDetails?.status === "draft"
              ? "Saved to Draft!!! "
              : "Published!!!"}
          </p>
          {blogDetails?.status === "published" && (
            <p className="text-primary-text">
              Your post has been published and its now live!!
            </p>
          )}
          <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
            <Button
              label="Dismiss"
              onClick={()=>handleClickOutside(false)}
              className={`border border-primary font-semibold ${
                blogDetails?.status === "draft"
                  ? "bg-primary !text-white w-full"
                  : "bg-white !text-primary-text w-[50%]"
              } rounded-md p-2`}
            />
            {blogDetails?.status === "published" && (
              <Button
                label="View"
                onClick={()=>handleClickOutside(true)}
                className="border w-[50%] border-primary font-semibold bg-primary text-white rounded-md p-2"
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Preview;
