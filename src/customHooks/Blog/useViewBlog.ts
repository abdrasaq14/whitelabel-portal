import { useParams } from "next/navigation";
import { BlogService } from "@/services/blog";
import { IBlogPayload, IComments } from "@/interfaces/ComponentInterfaces";
import { useState, useEffect } from "react";
import { calculateReadingTime, encrypt } from "@/utilities/helperFunctions";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const useViewBlog = () => {
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [blogDetails, setBlogDetails] = useState<IBlogPayload>();
  const [comments, setComments] = useState<IComments[]>(
    blogDetails?.comments || []
  );
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deletedComments, setDeletedComments] = useState(
    blogDetails?.comments.filter((comment) => comment.isDeleted)
  );
  const [readingTime, setReadingTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = async (tab: "all" | "deleted") => {
    setIsLoading(true);
    setActiveTab(tab);
    if (tab === "all") {
      setComments(blogDetails?.comments || []);
    } else {
      const deletedComments = blogDetails?.comments.filter(
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
    async (id: string) => {
      return await BlogService.deleteComment(blogDetails?._id as string, id);
    },
    {
      onSuccess: (response: any) => {
        toast.success("Comment deleted successfully");
        setBlogDetails(response.data.result);
        setComments(response.data.result.comments);
        setDeletedComments(
          response.data.result.comments.filter(
            (comment: IComments) => comment.isDeleted
          )
        );
        setOpenModal(false);
      },
      onError: (error) => {
        toast.error(error as string);
        setOpenModal(false);
      }
    }
  );

  const saveCommentsToLocalStorage = (comments: IComments[]) => {
    localStorage.setItem("comments", encrypt(JSON.stringify(comments)));
  };
  useEffect(() => {
    BlogService.viewBlog(id)
      .then((res: any) => {
        try {
          setError(null);
          setIsLoading(false);
          if (res.data.result) {
            setBlogDetails(res.data.result);
            setComments(res.data.result.comments);
            setDeletedComments(
              res.data.result.comments.filter(
                (comment: IComments) => comment.isDeleted
              )
            );
            return;
          }
          setBlogDetails({} as IBlogPayload);
        } catch (error) {
          setIsLoading(false);
          setBlogDetails({} as IBlogPayload);
          setError(error as string);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error as string);
      });
  }, [id]);

  // useEffect(() => {
  //   const deletedComments = comments.filter(
  //     (comment) => comment.isDeleted
  //   );
  //   setDeletedComments(deletedComments || []);
  // }, [comments]);

  useEffect(() => {
    const time = calculateReadingTime(blogDetails?.content as string);
    setReadingTime(time);
  }, [blogDetails?.content]);

  return {
    id,
    saveCommentsToLocalStorage,
    blogDetails,
    comments,
    activeTab,
    handleTabClick,
    handleDeleteComment,
    openModal,
    handleClickOutside,
    handleDeleteCommentApi,
    idToDelete,
    deletedComments,
    readingTime,
    error,
    isLoading
  };
};

export default useViewBlog;
