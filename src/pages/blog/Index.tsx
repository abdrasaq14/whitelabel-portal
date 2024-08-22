import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { noContentImage } from "../../assets/blog";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../zustand/auth.store";
import { BlogPayload } from "../../services/blog.service";
import BlogCard from "../../components/Blog/BlogCard";
import { Suspense, useEffect, useState } from "react";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
import { useBlogStore } from "../../zustand/blog.tore";

const Index = () => {
  const profile: any = useAuth((s) => s.profile);
  const fetchAllPosts = useBlogStore((state) => state.fetchAllPosts);
  const fetchDrafts = useBlogStore((state) => state.fetchDrafts);
  const fetchPublished = useBlogStore((state) => state.fetchPublished);
  const AllPosts = useBlogStore((state) => state.posts);
  const [posts, setPosts] = useState<BlogPayload[]>(AllPosts);
  const totalPosts = useBlogStore((state) => state.countPosts());
  const totalDrafts = useBlogStore((state) => state.countDrafts());
  const totalPublished = useBlogStore((state) => state.countPublished());
  const loading = useBlogStore((state) => state.loading);
  const error = useBlogStore((state) => state.error);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts({ whiteLabelName: profile?.whiteLabelName });
    setPosts(AllPosts);
  }, [fetchAllPosts, profile?.whiteLabelName]);

  console.log("dataBlog", AllPosts);
  return (
    <Suspense fallback={<AppFallback />}>
      <div className="px-4 pt-8 h-full">
        <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
          <div className="w-full">
            <BreadCrumbWithBackButton
              backText=""
              showBackButton={false}
              currentPath="Blog"
              handleBackAction={() => {
                navigate("/dashboard");
              }}
            />

            <div className="flex justify-between items-center text-primary-text">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg md:text-2xl font-bold">Blog Post</h2>
                <span className="text-primary-text w-[90%]">
                  Enhance your online presence by managing your blog posts on
                  our marketplace. Create, edit, and delete content with ease.
                </span>
              </div>
              <Link
                to={"/blog/create"}
                className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
              >
                Post Blog
              </Link>
            </div>

            <div className="flex justify-start my-5 gap-4">
              <button
                onClick={() => {
                  setActiveTab("all");
                  setPosts(AllPosts);
                }}
                className={`flex gap-2 items-center  text-primary-text  font-semibold  text-sm rounded-md p-2 ${
                  activeTab === "all"
                    ? "border border-primary bg-primary bg-opacity-15"
                    : ""
                }`}
              >
                All Blog
                <span
                  className={`flex  py-1 px-3  rounded-xl text-xs ${
                    activeTab === "all"
                      ? "bg-primary text-white"
                      : "bg-[#EEEFF0] text-[#464749] "
                  }`}
                >
                  {totalPosts}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("draft");
                  setPosts(fetchDrafts());
                }}
                className={`flex gap-2 items-center text-primary-text  font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                  activeTab === "draft"
                    ? "border border-primary bg-primary bg-opacity-15"
                    : ""
                }`}
              >
                Draft
                <span
                  className={`flex bg-[#EEEFF0] text-[#464749] py-1 px-3  rounded-xl text-xs ${
                    activeTab === "draft" ? "bg-primary text-white" : ""
                  }`}
                >
                  {totalDrafts}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("published");
                  setPosts(fetchPublished());
                }}
                className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                  activeTab === "published"
                    ? "border border-primary bg-primary bg-opacity-15"
                    : ""
                }`}
              >
                Published
                <span
                  className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                    activeTab === "published" ? "bg-primary text-white" : ""
                  }`}
                >
                  {totalPublished}
                </span>
              </button>
            </div>
            {!loading && posts && posts?.length > 0 ? (
              <div className="flex flex-wrap gap-4 xl:grid xl:grid-cols-3 xl:items-start xl:justify-start xl:gap-0">
                {posts.map((blog: BlogPayload, index: number) => (
                  <BlogCard index={index} blog={blog} />
                ))}
              </div>
            ) : !loading && posts && posts?.length === 0 ? (
              <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
                <img
                  src={noContentImage}
                  alt=""
                  className="object-contain max-h-[300px]"
                />
                <span className="text-primary-text text-lg font-semibold mx-auto text-center w-[80%]">
                  {activeTab === "all"
                    ? "No blog post available"
                    : activeTab === "draft"
                    ? "No draft post yet"
                    : "No published post available"}
                </span>
              </div>
            ) : (
              <AppFallback />
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Index;
