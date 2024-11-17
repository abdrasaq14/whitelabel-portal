"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { BreadCrumbWithBackButton } from '../Breadcrumb';
import { formatDateBlog } from '@/utilities/helperFunctions';
import { GoDotFill } from 'react-icons/go';
import AppButton from '../forms/AppButton';
import { ButtonType } from '@/enums/ComponentEnums';
import usePreviewPost from '@/customHooks/Blog/usePreviewPost';
import BlogPubLishedModal from '../modals/blog/PublishedModal';
function PreviewBlog() {
    const router = useRouter();
    const {
      blogDetails,
      isSubmitting,
      openModal,
      handleClickOutside,
      handleStatusChange
    } = usePreviewPost();
    return (
      <div className="px-4 pt-8 h-full">
        <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
          <div className="w-full">
            <BreadCrumbWithBackButton
              backText="Blog"
              showBackButton={true}
              currentPath="Preview"
              handleBackAction={() => router.back()}
            />

            <div className="flex justify-between items-center text-primary-text">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg md:text-2xl font-bold font-gooperSemiBold">
                  {blogDetails?.title}
                </h2>
                <div className="flex gap-4 text-primary-text text-sm">
                  <span className="flex items-center gap-1">
                    {formatDateBlog(blogDetails?.publishedDate as string)}
                    <GoDotFill />3 mins read
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <AppButton
                  type={ButtonType.SECONDARY}
                  loader={{
                    loading: isSubmitting && blogDetails?.status === "draft"
                  }}
                  disabled={
                    isSubmitting ||
                    blogDetails?.title === "" ||
                    blogDetails?.content === ""
                  }
                  text={`${
                    isSubmitting && blogDetails?.status === "draft"
                      ? "Saving..."
                      : "Save as Draft"
                  }`}
                  handleClick={() => handleStatusChange("draft")}
                  style="border border-primary font-semibold rounded-md min-w-[7.5rem] w-[50%] py-3"
                />
                <AppButton
                  type={ButtonType.SECONDARY}
                  loader={{
                    loading: isSubmitting && blogDetails?.status === "published"
                  }}
                  disabled={
                    isSubmitting ||
                    blogDetails?.title === "" ||
                    blogDetails?.content === ""
                  }
                  text={`${
                    isSubmitting && blogDetails?.status === "published"
                      ? "Publishing..."
                      : "Publish"
                  }`}
                  handleClick={() => handleStatusChange("published")}
                  style="border border-primary font-semibold rounded-md  p-2"
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

        <BlogPubLishedModal
          isOpen={openModal}
          handleClose={(isView) => handleClickOutside(isView)}
          blogDetails={blogDetails}
        />
      </div>
    );
}

export default PreviewBlog