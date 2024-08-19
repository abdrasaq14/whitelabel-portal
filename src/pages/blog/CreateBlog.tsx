import React from "react";
import { BreadCrumbClient } from "../../components/Breadcrumb";
import { noContentImage } from "../../assets/blog";

const CreateBlog = () => {
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbClient backText="Dashboard" currentPath="Blog" brand="" />
          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Blog Post</h2>
              <span className="text-primary-text w-[80%]">
                Enhance your online presence by managing your blog posts on our
                marketplace. Create, edit, and delete content with ease.
              </span>
            </div>
            <button
              type="button"
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Post Blog
            </button>
          </div>
          <div className="w-full flex gap-8 flex-col items-center justify-center mt-8">
            <img
              src={noContentImage}
              alt=""
              className="object-contain max-h-[300px]"
            />
            <span className="text-primary-text text-lg font-semibold mx-auto text-center w-[80%]">
              No Blog Content has been added yet.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
