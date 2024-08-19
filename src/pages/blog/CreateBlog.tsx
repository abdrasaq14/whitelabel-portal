import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { BlogInputs } from "../../components/Blog/Inputs";
import { IoCalendarOutline } from "react-icons/io5";

const CreateBlogPost = () => {
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
        <div className="w-full">
          <BreadCrumbWithBackButton
            backText="Blog"
            showBackButton={true}
            currentPath="Create"
            handleBackAction={() => {}}
          />
          <div className="flex justify-between items-center text-primary-text">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg md:text-2xl font-bold">Post Blog</h2>
              <span className="text-primary-text w-[90%]">
                Provide all the information you want to post below, you can
                preview it before you post.
              </span>
            </div>
            <button
              type="button"
              className="border border-primary font-semibold hover:bg-primary hover:text-white rounded-md text-primary-text p-2"
            >
              Preview
            </button>
          </div>
          <div className="w-full md:gap-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-8">
            <BlogInputs
              title="Blog Title"
              type="text"
              placeholder="Blog title"
              wrapperClass="col-span-1"
            />
            <BlogInputs
              icon={<IoCalendarOutline />}
              title="Date"
              type="date"
              placeholder="Blog title"
              wrapperClass="col-span-1 !w-[50%]"
            />
            <BlogInputs
              title="Description (Blog Content)"
              type="textarea"
              placeholder="Blog content.."
              wrapperClass="col-span-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
