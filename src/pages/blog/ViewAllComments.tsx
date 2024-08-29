import { Suspense, useEffect, useState } from "react";
import { BlogService, Comments } from "../../services/blog.service";
import CommentCard from "../../components/Blog/CommentCard";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { decrypt, handleError } from "../../utils/Helpfunctions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { depressedEmoji, noCommentImage } from "../../assets/blog";
import { Button } from "../../components/Button/Button";
import { BreadCrumbWithBackButton } from "../../components/Breadcrumb";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
// import Pagination from '../../components/Blog/Pagination';

const ViewAllComments = () => {
  const { id }: any = useParams();
    const navigate = useNavigate();
     const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [AllComments, setAllComments] = useState<Comments[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const deletedComments = comments.filter((comment) => comment.isDeleted);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = async (tab: "all" | "deleted") => {
    setIsLoading(true);
    setActiveTab(tab);
    if (tab === "all") {
      setComments(AllComments || []);
    } else {
      const deletedComments = AllComments.filter(
        (comment) => comment.isDeleted
      );
      setComments(deletedComments || []);
    }
    setIsLoading(false);
  };
  const handleDeleteComment = (id: string) => {
    setOpenModal(true);
    setIdToDelete(id);
  };
  // console.log("idTodElete", openModal, idToDelete);
  const handleClickOutside = () => {
    setOpenModal(false);
    setIdToDelete("");
  };
  const handleDeleteCommentApi = useMutation(
    async (commentId: string) => {
      return await BlogService.deleteComment(id as string, commentId);
    },
    {
      onSuccess: (response) => {
        toast.success("Comment deleted successfully");
        setOpenModal(false);
        // const updatedComments = comments.filter(
        //   (comment) => comment._id !== id
        // );
        // setComments(updatedComments);
      },
      onError: (error) => {
        const e = handleError(error);
        toast.error(e);
        setOpenModal(false);
      }
    }
  );

useEffect(() => {
  // Retrieve comments from local storage
  const comments = localStorage.getItem("comments");
  if (comments) {
    setAllComments(decrypt(comments) as Comments[]);
  }

  const handleUnload = (event: Event) => {
    if (location.pathname !== window.location.pathname) {
      // If the user is navigating away from the page, clear comments
      localStorage.removeItem("comments");
    }
  };

  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("popstate", handleUnload);

  return () => {
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("popstate", handleUnload);
  };
}, [location.pathname]);

  useEffect(() => {
      setComments(AllComments);
      setIsLoading(false);
  }, [AllComments]);
  return (
    <Suspense fallback={<AppFallback />}>
      <div className="px-4 pt-8 h-full">
        <div className="bg-white rounded-md h-auto min-h-[90%] w-full p-8 flex flex-col">
          <div className="w-full">
            <BreadCrumbWithBackButton
              backText="Blog"
              showBackButton={true}
              currentPath="All Comments"
              handleBackAction={() => {
                navigate(-1);
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
    </Suspense>
  );
};

export default ViewAllComments;
