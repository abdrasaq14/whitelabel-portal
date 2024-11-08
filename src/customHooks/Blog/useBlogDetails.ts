import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BlogPayload,
  BlogService,
  Comments
} from "../../services/blog.service";
import { useState, useEffect, Suspense } from "react";
import { calculateReadingTime } from "@/utilities/helperFunctions";
import { AppFallback } from "../../containers/dashboard/LayoutWrapper";
import CommentCard from "../../components/Blog/CommentCard";
import Modal from "../../components/Modal/Modal";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Button } from "../../components/Button/Button";

const ViewBlogDetail = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [blogDetails, setBlogDetails] = useState<BlogPayload>();
  const [comments, setComments] = useState<Comments[]>(
    blogDetails?.comments || []
  );
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [deletedComments, setDeletedComments] = useState(blogDetails?.comments.filter(
    (comment) => comment.isDeleted
  ));
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
  }
  const handleDeleteCommentApi = useMutation(
    async (id: string) => {
      return await BlogService.deleteComment(blogDetails?._id as string, id);
    },
    {
      onSuccess: (response) => {
        toast.success("Comment deleted successfully");
        setBlogDetails(response.data.result);
        setComments(response.data.result.comments);
        setDeletedComments(
          response.data.result.comments.filter(
            (comment: Comments) => comment.isDeleted
          )
        );
        setOpenModal(false);
      },
      onError: (error) => {
        const e = handleError(error);
        toast.error(e);
        setOpenModal(false);
      }
    }
  );

  const saveCommentsToLocalStorage = (comments: Comments[]) => { 
    localStorage.setItem("comments", encrypt(JSON.stringify(comments)));
  }
  useEffect(() => {
    BlogService.viewBlog(id)
      .then((res) => {
        try {
          setError(null);
          setIsLoading(false);
          if (res.data.result) {
            setBlogDetails(res.data.result);
            setComments(res.data.result.comments);
            setDeletedComments(
              res.data.result.comments.filter((comment:Comments) => comment.isDeleted)
            );
            return;
          }
          setBlogDetails({} as BlogPayload);
        } catch (error) {
          setIsLoading(false);
          setBlogDetails({} as BlogPayload);
          const e = handleError(error);
          console.log("Errorrrrr", e);
          setError(e);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const e = handleError(error);
        setError(e);
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
        blogDetails,
        comments,
        deletedComments,
        activeTab,
        readingTime,
        error,
        isLoading,
        openModal,
        idToDelete,
        handleTabClick,
        handleDeleteComment,
        handleClickOutside,
        handleDeleteCommentApi,
        saveCommentsToLocalStorage
        };
}