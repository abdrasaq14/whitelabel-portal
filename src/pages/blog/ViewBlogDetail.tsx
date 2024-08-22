import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { noPostImage, postNotAvailableImage } from "../../assets/blog";
import { TiHeartFullOutline } from "react-icons/ti";
import { BsChatSquareText } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogPayload, BlogService } from "../../services/blog.service";
import { useState, useEffect, Suspense } from "react";
import { formatDate } from "../../utils/Helpfunctions";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
import CommentCard from "../../components/Blog/CommentCard";

const ViewBlogDetail = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [blogDetails, setBlogDetails] = useState<BlogPayload>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    BlogService.viewBlog(id).then((res) => {
      try {
        setIsLoading(false);
        if (res.data.result) {
          setBlogDetails(res.data.result);
          return;
        }
        setBlogDetails({} as BlogPayload);
      } catch (error) {
        setIsLoading(false);
        setBlogDetails({} as BlogPayload);
      }
    });
  }, [id]);
  return (
    <Suspense fallback={<AppFallback />}>
      <div className="px-4 pt-8 h-full">
        <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
          <div className="w-full">
            <BreadCrumbWithBackButton
              backText="Blog"
              showBackButton={true}
              currentPath="Preview"
              handleBackAction={() => {
                navigate("/blog");
              }}
            />

            {isLoading ? (
              <AppFallback />
            ) : blogDetails?.title.trim() ? (
              <>
                <div className="flex justify-between items-center text-primary-text">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg md:text-2xl font-bold font-gooperSemiBold">
                      {blogDetails?.title}
                    </h2>
                    <div className="flex gap-4 text-primary-text">
                      <span className="flex items-center gap-1">
                        <TiHeartFullOutline
                          size={20}
                          className="text-[#D42620]"
                        />
                        {blogDetails?.likes}{" "}
                        {blogDetails && blogDetails?.likes > 1
                          ? "Likes"
                          : "Like"}
                      </span>
                      <span className="flex items-center gap-1">
                        <BsChatSquareText size={20} />
                        {blogDetails?.comments.length}{" "}
                        {blogDetails && blogDetails?.comments.length > 1
                          ? "Comments"
                          : "Comment"}
                      </span>
                      <span className="flex items-center">
                        {formatDate(blogDetails?.createdAt as string)}
                        <GoDotFill />3 mins read
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/edit/${id}`}
                      className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
                  >
                    Edit Blog
                  </Link>
                </div>
                <div className="w-full flex gap-8 flex-col items-start justify-center mt-8">
                  <div className="flex flex-col items-start w-full lg:w-[80%]">
                    {/* Blog image */}
                    <div className="w-full mb-4">
                      <img
                        src={blogDetails?.image || noPostImage}
                        alt=""
                        className="object-cover w-full max-h-[200px]"
                      />
                    </div>
                    {/* blog content */}
                    <div className="w-full">
                      <p
                        className="text-primary-text style-image"
                        dangerouslySetInnerHTML={{
                          __html: blogDetails?.content || ""
                        }}
                      />
                    </div>
                  </div>
                  {/* blog comments */}
                  {blogDetails?.comments && blogDetails?.comments.length > 0 && (
                    <div className="flex flex-col items-start w-full mt-8">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {}}
                            className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                              activeTab === "all"
                                ? "border border-primary bg-primary bg-opacity-15"
                                : ""
                            }`}
                          >
                            All Comments
                            <span
                              className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                                activeTab === "all"
                                  ? "bg-primary text-white"
                                  : ""
                              }`}
                            >
                              {blogDetails?.comments.length}
                            </span>
                          </button>
                          {/* <button
                            onClick={() => {}}
                            className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                              activeTab === "all"
                                ? "border border-primary bg-primary bg-opacity-15"
                                : ""
                            }`}
                          >
                            Deleted Comments
                            <span
                              className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                                activeTab === "published"
                                  ? "bg-primary text-white"
                                  : ""
                              }`}
                            ></span>
                          </button> */}
                        </div>
                        <Link
                          to={`/blog/${id}/comments`}
                          className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
                        >
                          View all comments
                        </Link>
                      </div>
                      <div className="flex overlow-x-auto gap-2 mt-4">
                        {blogDetails?.comments.map((comment, index) => (
                          <CommentCard key={index} comment={comment as any} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
              ) : (
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
                    Post deleted from Blog page
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ViewBlogDetail;
