import React from "react";
import { useRouter } from "next/navigation";
import { BreadCrumbWithBackButton } from "../Breadcrumb";
import Link from "next/link";
import useFetchPost from "@/customHooks/Blog/useFetchPost";
import Spinner from "../feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { noContentImage } from "../../../public/images/blog";
import DeleteBlogModal from "../modals/blog/DeleteModal";

function AllBlog() {
  const { push } = useRouter();
  const {
    allPosts,
    total,
    setTotal,
    totalDrafts,
    totalPublished,
    posts,
    loading,
    error,
    openModal,
    idToDelete,
    activeTab,
    currentPage,
    limit,
    handleDeleteApi,
    handleDelete,
    handleClickOutside,
    handlePagination,
    handleTabClick
  } = useFetchPost();
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText=""
            showBackButton={false}
            currentPath="Blog"
            handleBackAction={() => {
              push("/dashboard");
            }}
          />

          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Blog Post</h2>
              <span className="text-primary-text w-[90%]">
                Enhance your online presence by managing your blog posts on our
                marketplace. Create, edit, and delete content with ease.
              </span>
            </div>
            <Link
              href={"/blog/create"}
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
                {allPosts}
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
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : !loading && posts && posts?.length > 0 ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap gap-4 xl:gap-6">
                {posts.map((blog: IBlogPayload, index: number) => (
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
              />
            </div>
          ) : !loading && posts && posts?.length === 0 ? (
            <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
              <img
                src={noContentImage.src}
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
                src={noContentImage.src}
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
      <DeleteBlogModal/>
      </div>
  );
}

export default AllBlog;
