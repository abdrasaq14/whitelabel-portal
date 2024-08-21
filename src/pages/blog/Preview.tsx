import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { BlogPayload } from "../../services/blog.service";
import { useNavigate } from "react-router-dom";
import { decrypt, formatDate } from "../../utils/Helpfunctions";

const Preview = () => {
  useEffect(() => {
    // fetch blog post details
    const localBlogDetails = localStorage.getItem("_Blog");
    if (localBlogDetails) {
      setBlogDetails(decrypt(localBlogDetails));
    }
  }, []);

  const [blogDetails, setBlogDetails] = useState<BlogPayload>();
  const navigate = useNavigate();
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
            <button
              type="button"
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Post Blog
            </button>
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
    </div>
  );
};

export default Preview;
