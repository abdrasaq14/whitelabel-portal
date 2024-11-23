import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { BlogService } from "@/services/blog";
import { IComments } from "@/interfaces/ComponentInterfaces";
import { ApiResponse } from "apisauce";

export const useComments = () => {
  const { id }: any = useParams();

  const [activeTab, setActiveTab] = useState<"all" | "deleted">("all");

  const [allComments, setAllComments] = useState<IComments[]>([]);

  const [comments, setComments] = useState<IComments[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [idToDelete, setIdToDelete] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const deletedComments = comments.filter((comment) => comment.isDeleted);

  const handleTabClick = async (tab: "all" | "deleted") => {
    setIsLoading(true);

    setActiveTab(tab);

    setComments(
      tab === "all" ? allComments : allComments.filter((c) => c.isDeleted)
    );

    setIsLoading(false);
  };

  const handleClickOutside = () => {
    setOpenModal(false);

    setIdToDelete("");
  };

  const handleDeleteComment = (id: string) => {
    setOpenModal(true);

    setIdToDelete(id);
  };

  const handleDeleteCommentApi = async (commentId: string) => {
    try {
      const res: any = await BlogService.deleteComment(id as string, commentId);
      if (res.data.result) {
        toast.success("Comment deleted successfully");
        setComments((prev) =>
          prev.filter((comment) => comment._id !== idToDelete)
        );
        setOpenModal(false);
        return;
      }
    } catch (error) {
      toast.error(error as string);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response: ApiResponse<unknown, any> =
          await BlogService.fetchAllComments(id);

        console.log("DEleted", response.data.result);

        setAllComments(response.data.result);

        // setComments(response);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  return {
    idToDelete,

    activeTab,

    deletedComments,

    comments,

    AllComments: allComments,

    openModal,

    isLoading,

    setActiveTab,

    handleTabClick,

    handleDeleteComment,

    handleDeleteCommentApi,

    handleClickOutside,

    setOpenModal
  };
};
