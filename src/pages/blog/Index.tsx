import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { depressedEmoji, noContentImage } from "../../assets/blog";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../zustand/auth.store";
import { BlogPayload, BlogService } from "../../services/blog.service";
import PostCard from "../../components/Blog/PostCard";
import { Suspense, useEffect, useState } from "react";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
import { useBlogStore } from "../../zustand/blog.tore";
import Modal from "../../components/Modal/Modal";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Button } from "../../components/Button/Button";
import { handleError } from "../../utils/Helpfunctions";
import Pagination from "../../components/Blog/Pagination";

const Index = () => {
  const profile: any = useAuth((s) => s.profile);
  const fetchAllPosts = useBlogStore((state) => state.fetchAllPosts);
  const fetchDrafts = useBlogStore((state) => state.fetchDrafts);
  const totalDrafts = useBlogStore((state) => state.countDrafts());
  const totalPublished = useBlogStore((state) => state.countPublished());
  const fetchPublished = useBlogStore((state) => state.fetchPublished);
  const AllPosts = useBlogStore((state) => state.posts);
  const [posts, setPosts] = useState<BlogPayload[]>();
  const error = useBlogStore((state) => state.error);
  const deletePost = useBlogStore((state) => state.deletePost);
  const loading = useBlogStore((state) => state.loading);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10
  const [total, setTotal] = useState(0);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  // console.log("loadingIndex", AllPosts, posts);
  useEffect(() => {
    // Fetch all posts only once on component mount
    useBlogStore.getState().startLoading();
    useBlogStore.getState().setError("");
    BlogService.fetchAll({ whiteLabelName: profile?.whiteLabelName, page: currentPage, limit })
      .then((res) => {
        if (res.data?.result?.results) {
          setTotal(res.data?.result?.totalResults);

          fetchAllPosts(res.data?.result?.results);
          setPosts(res.data?.result?.results);
          useBlogStore.getState().stopLoading();
        }
      })
      .catch((error) => {
        useBlogStore.getState().stopLoading();
        console.log("FetchError", error);
        const e = handleError(error);
        useBlogStore.getState().setError(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.whiteLabelName, currentPage]);

  const handleTabClick = async (tab: "all" | "draft" | "published") => {
    setActiveTab(tab);
    if (tab === "all") {
      setPosts(AllPosts);
    } else if (tab === "draft") {
      const posts = await fetchDrafts();
      setPosts(posts);
    } else if (tab === "published") {
      const posts = await fetchPublished();
      setPosts(posts);
    }
  };
  const handleDelete = (id: string) => {
    setOpenModal(true);
    setIdToDelete(id);
  };
  const handleClickOutside = () => {
    setOpenModal(false);
    setIdToDelete("");
  };
  const handleDeleteApi = useMutation(
    async (id: string) => {
      return await BlogService.deleteBlog(id);
    },
    {
      onSuccess: (response) => {
        // eslint-disable-next-line eqeqeq
        if (response.data?.status == "Success") {
          deletePost(idToDelete);
          setPosts(useBlogStore.getState().posts);
          setOpenModal(false);
          setIdToDelete("");
          toast.success("Blog post deleted successfully");
        }
      },
      onError: (error) => {
        const e = handleError(error);
        toast.error(e);
        // toast.error("An error occurred while deleting blog post");
        setOpenModal(false);
      },
    }
  );

  // console.log("idToDelete", idToDelete);
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
                onClick={() => handleTabClick("all")}
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
                  {AllPosts.length}
                </span>
              </button>
              <button
                onClick={() => handleTabClick("draft")}
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
                onClick={() => handleTabClick("published")}
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
            {loading ? (
              <AppFallback />
            ) : !loading && posts && posts?.length > 0 ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-4 xl:grid xl:grid-cols-3 xl:items-start xl:justify-start xl:gap-6">
                  {posts.map((blog: BlogPayload, index: number) => (
                    <PostCard
                      index={index}
                      blog={blog}
                      handleDelete={() => handleDelete(blog?._id as string)}
                    />
                  ))}
                  </div>
                  
                <Pagination
                  total={total}
                  limit={limit}
                  page={currentPage}
                  onPageChange={handlePagination}
                  increase={handleNext}
                  decrease={handlePrevious}
                />
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
              <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
                <img
                  src={noContentImage}
                  alt=""
                  className="object-contain max-h-[300px]"
                />
                <span className="text-primary-text text-lg font-semibold mx-auto text-center w-[80%]">
                  {error ?? "Unable to fetch blog post"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={openModal} onClick={() => handleClickOutside()}>
        <div className="flex flex-col items-center justify-between w-full lg:min-w-[450px] h-full px-8 rounded-md">
          <div className="flex-1 h-[65%] flex items-center justify-center ">
            <img
              src={depressedEmoji}
              alt=""
              className="max-h-[15rem] w-full h-full object-cover"
            />
          </div>
          <p className="text-primary-text font-black text-xl text-center my-2">
            Oopss!!!
          </p>
          <span className="text-primary-text w-[80%] text-center mx-auto">
            Are you sure you want to delete this post from your blog?
          </span>

          <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
            <Button
              label={`${
                handleDeleteApi.isLoading ? "Deleting..." : "Yes Proceed"
              }`}
              disabled={handleDeleteApi.isLoading}
              isLoading={handleDeleteApi.isLoading}
              onClick={() => {
                handleDeleteApi.mutate(idToDelete);
              }}
              className="border w-[50%] border-primary !bg-white font-semibold rounded-md !text-primary p-2"
            />

            <Button
              label="No"
              disabled={handleDeleteApi.isLoading}
              onClick={() => handleClickOutside()}
              className="border w-[50%] border-primary font-semibold bg-primary text-white rounded-md p-2"
            />
          </div>
        </div>
      </Modal>
    </Suspense>
  );
};

export default Index;
