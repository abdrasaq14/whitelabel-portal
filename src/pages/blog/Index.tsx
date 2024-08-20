import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { noContentImage } from "../../assets/blog";
import { Link, useNavigate } from "react-router-dom";
import useFetchWithParams from "../../hooks/useFetchWithParams";
import { useAuth } from "../../zustand/auth.store";
import { BlogPayload, BlogService } from "../../services/blog.service";
import BlogCard from "../../components/Blog/BlogCard";
const Index = () => {
   const profile: any = useAuth((s) => s.profile);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useFetchWithParams(
    [
      "query-all-blog",
      { page: 1, limit: 1000, whiteLabelName: profile.whiteLabelName }
    ],
    BlogService.fetchAll,
    {
      onSuccess: () => {
        // console.log(data.data);
      },
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  );

  console.log("dataBlog", data);
  return (
    <div className="px-4 pt-8 h-full">
      <div className="bg-white rounded-md h-auto w-full p-8 flex flex-col">
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
                Enhance your online presence by managing your blog posts on our
                marketplace. Create, edit, and delete content with ease.
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
              onClick={() => refetch()}
              className="flex gap-2 items-center border border-primary font-semibold bg-primary bg-opacity-15 text-sm rounded-md text-primary-text p-2"
            >
              All Blog
              <span className="flex bg-primary py-1 px-3 text-white rounded-xl text-xs">
                {/* {data?.totalResults} */}2456
              </span>
            </button>
            <button
              onClick={() => refetch()}
              className="flex gap-2 items-center  bg-inherit bg-opacity-15 text-sm rounded-md text-primary-text p-2"
            >
              Draft
              <span className="flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs">
                {/* {data?.totalResults} */}2456
              </span>
            </button>
            <button
              onClick={() => refetch()}
              className="flex gap-2 items-center  bg-inherit bg-opacity-15 text-sm rounded-md text-primary-text p-2"
            >
              Published
              <span className="flex bg-[#EEEFF0] py-1 px-3 text-[#464749] rounded-xl text-xs">
                {/* {data?.totalResults} */}2456
              </span>
            </button>
          </div>
          {data?.result?.results && data?.result?.results.length ? (
            data.result?.results.map((blog: BlogPayload, index: number) => (
              <BlogCard key={index} blog={blog} />
            ))
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
