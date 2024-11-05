<<<<<<< HEAD
"use client"
=======
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
    idToDelete,
    setTotal,
    handleNext,
    handlePrevious, handlePagination,
=======
    setTotal,
>>>>>>> 94f4fa5 (blog module completed)
    totalDrafts,
    totalPublished,
    posts,
    loading,
    error,
<<<<<<< HEAD
      activeTab,
    openModal,  
=======
    openModal,
    idToDelete,
    activeTab,
>>>>>>> 94f4fa5 (blog module completed)
    currentPage,
    limit,
    handleDeleteApi,
    handleDelete,
    handleClickOutside,
<<<<<<< HEAD
=======
    handlePagination,
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
              className="border border-primary font-semibold hover:bg-purple-main hover:text-white rounded-md text-primary-text p-2"
=======
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
>>>>>>> 94f4fa5 (blog module completed)
            >
              Post Blog
            </Link>
          </div>

          <div className="flex justify-start my-5 gap-4">
            <button
              onClick={() => handleTabClick("all")}
              className={`flex gap-2 items-center  text-primary-text  font-semibold  text-sm rounded-md p-2 ${
                activeTab === "all"
<<<<<<< HEAD
                  ? "border border-primary bg-purple-main bg-opacity-15"
=======
                  ? "border border-primary bg-primary bg-opacity-15"
>>>>>>> 94f4fa5 (blog module completed)
                  : ""
              }`}
            >
              All Blog
              <span
                className={`flex  py-1 px-3  rounded-xl text-xs ${
                  activeTab === "all"
<<<<<<< HEAD
                    ? "bg-purple-main text-white"
=======
                    ? "bg-primary text-white"
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
                  ? "border border-primary bg-purple-main bg-opacity-15"
=======
                  ? "border border-primary bg-primary bg-opacity-15"
>>>>>>> 94f4fa5 (blog module completed)
                  : ""
              }`}
            >
              Draft
              <span
                className={`flex bg-[#EEEFF0] text-[#464749] py-1 px-3  rounded-xl text-xs ${
<<<<<<< HEAD
                  activeTab === "draft" ? "bg-purple-main text-white" : ""
=======
                  activeTab === "draft" ? "bg-primary text-white" : ""
>>>>>>> 94f4fa5 (blog module completed)
                }`}
              >
                {totalDrafts}
              </span>
            </button>
            <button
              onClick={() => handleTabClick("published")}
              className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                activeTab === "published"
<<<<<<< HEAD
                  ? "border border-primary bg-purple-main bg-opacity-15"
=======
                  ? "border border-primary bg-primary bg-opacity-15"
>>>>>>> 94f4fa5 (blog module completed)
                  : ""
              }`}
            >
              Published
              <span
                className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
<<<<<<< HEAD
                  activeTab === "published" ? "bg-purple-main text-white" : ""
=======
                  activeTab === "published" ? "bg-primary text-white" : ""
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
                page={currentPage}
                onPageChange={handlePagination}
                increase={handleNext}
                decrease={handlePrevious}
=======
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
      <DeleteBlogModal
        isOpen={openModal}
        handleClose={handleClickOutside}
        handleDeleteApi={handleDeleteApi as any}
        idToDelete={idToDelete}
        modalTitle="Are you sure you want to delete this post from your blog?"
      />
    </div>
=======
      <DeleteBlogModal/>
      </div>
>>>>>>> 94f4fa5 (blog module completed)
  );
}

export default AllBlog;
