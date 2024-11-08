<<<<<<< HEAD
import ViewAllComments from '@/components/blog/ViewComments';
import React from 'react';

const ViewAllCommentPage = () => {
  return (
    <ViewAllComments />
  );
}

export default ViewAllCommentPage;
=======
"use client";
import React from "react";
import { useComments } from "@/customHooks/Blog/useComments";
import { useRouter } from "next/router";
import { BreadCrumbWithBackButton } from "@/components/Breadcrumb";
const ViewAllCommentsPage = () => {
  const { back } = useRouter();
  const {
    activeTab,
    handleTabClick,
    AllComments,
    comments,
    isLoading,
    handleDeleteComment,
    handleDeleteCommentApi,
    openModal,
    idToDelete,
    handleClickOutside,
    deletedComments,
  } = useComments();
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="All Comments"
            handleBackAction={() => {
              back();
            }}
          />
          <div className="flex gap-2 mt-8 mb-6">
            <button
              onClick={() => handleTabClick("all")}
              className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                activeTab === "all"
                  ? "border border-primary bg-primary bg-opacity-15"
                  : ""
              }`}
            >
              All Comments
              <span
                className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                  activeTab === "all" ? "bg-primary text-white" : ""
                }`}
              >
                {AllComments?.length}
              </span>
            </button>
            <button
              onClick={() => handleTabClick("deleted")}
              className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                activeTab === "deleted"
                  ? "border border-primary bg-primary bg-opacity-15"
                  : ""
              }`}
            >
              Deleted Comments
              <span
                className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                  activeTab === "deleted" ? "bg-primary text-white" : ""
                }`}
              >
                {deletedComments?.length}
              </span>
            </button>
          </div>
          {isLoading ? (
            <AppFallback />
          ) : comments.length > 0 ? (
            <div className="flex flex-wrap gap-4 xl:grid xl:grid-cols-4 xl:items-start xl:justify-start xl:gap-6">
              {comments.map((comment: Comments, index: number) => (
                <CommentCard
                  key={index}
                  comment={comment}
                  showDeleteIcon={activeTab === "all" ? true : false}
                  handleDelete={() =>
                    handleDeleteComment(comment._id as string)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center justify-center mt-8">
              <div className="">
                <img
                  src={noCommentImage}
                  alt=""
                  className="object-cover w-full max-h-[150px]"
                />
              </div>
              <p className="text-primary-text text-base">
                {activeTab === "all"
                  ? "No Comment on this post yet.!!!"
                  : "No deleted comments"}
              </p>
            </div>
          )}

          {/* <Pagination
        total={total}
        limit={limit}
        page={currentPage}
        onPageChange={handlePagination}
        increase={handleNext}
        decrease={handlePrevious}
      /> */}
        </div>
        <Modal open={openModal} onClick={handleClickOutside}>
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
              Are you sure you want to delete this comment from your blog??
            </span>

            <div className="w-full flex justify-between items-center gap-4 mt-6 mb-4">
              <Button
                label={`${
                  handleDeleteCommentApi.isLoading
                    ? "Deleting..."
                    : "Yes Proceed"
                }`}
                disabled={handleDeleteCommentApi.isLoading}
                isLoading={handleDeleteCommentApi.isLoading}
                onClick={() => {
                  handleDeleteCommentApi.mutate(idToDelete);
                }}
                className="border w-[50%] border-primary !bg-white font-semibold rounded-md !text-primary p-2"
              />

              <Button
                label="No"
                disabled={handleDeleteCommentApi.isLoading}
                onClick={handleClickOutside}
                className="border w-[50%] border-primary font-semibold bg-primary text-white rounded-md p-2"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ViewAllCommentsPage;
>>>>>>> 794f847 (all comments page)
