"use client";
import React from "react";
import { useComments } from "@/customHooks/Blog/useComments";
import { useRouter } from "next/router";
import { BreadCrumbWithBackButton } from "@/components/Breadcrumb";
import Spinner from "@/components/feedbacks/Spinner";
import { SpinnerType } from "@/enums/ComponentEnums";
import CommentCard from "@/components/blog/CommentCard";
import { IComments } from "@/interfaces/ComponentInterfaces";
import DeleteBlogModal from "@/components/modals/blog/DeleteModal";
import { noCommentImage } from "../../../public/images/blog";

const ViewAllComments = () => {
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
                  ? "border border-primary bg-purple-main bg-opacity-15"
                  : ""
              }`}
            >
              All Comments
              <span
                className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                  activeTab === "all" ? "bg-purple-main text-white" : ""
                }`}
              >
                {AllComments?.length}
              </span>
            </button>
            <button
              onClick={() => handleTabClick("deleted")}
              className={`flex gap-2 items-center font-semibold text-sm rounded-md p-2 transition-all duration-300 ${
                activeTab === "deleted"
                  ? "border border-primary bg-purple-main bg-opacity-15"
                  : ""
              }`}
            >
              Deleted Comments
              <span
                className={`flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs ${
                  activeTab === "deleted" ? "bg-purple-main text-white" : ""
                }`}
              >
                {deletedComments?.length}
              </span>
            </button>
          </div>
          {isLoading ? (
            <Spinner type={SpinnerType.PRIMARY} height={50} width={50} />
          ) : comments.length > 0 ? (
            <div className="flex flex-wrap gap-4 xl:grid xl:grid-cols-4 xl:items-start xl:justify-start xl:gap-6">
              {comments.map((comment: IComments, index: number) => (
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
                  src={noCommentImage.src}
                  alt=""
                  className="object-cover w-full max-h-[150px]"
                />
              </div>
              <p className="text-accent-darker text-base">
                {activeTab === "all"
                  ? "No Comment on this post yet.!!!"
                  : "No deleted comments"}
              </p>
            </div>
          )}
        </div>
        <DeleteBlogModal
          isOpen={openModal}
          handleClose={handleClickOutside}
          handleDeleteApi={handleDeleteCommentApi as any}
          idToDelete={idToDelete}
          modalTitle="Are you sure you want to delete this comment from your blog??"
        />
      </div>
    </div>
  );
};

export default ViewAllComments;
