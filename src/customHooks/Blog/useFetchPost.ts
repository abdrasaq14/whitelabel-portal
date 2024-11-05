import { useEffect, useState } from "react";
import { BlogService } from "@/services/blog";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import {
  setError,
  deletePost,
  selectAllPosts,
  postLoadingState,
  postErrorState,
  startLoading,
  stopLoading,
  fetchAllPosts,
  countDrafts,
  countPublished
} from "@/store/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useStorage from "../useStorage";
import { User } from "@/interfaces/AppInterfaces";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import usePagination from "../usePagination";

const useBlogPosts = () => {
  const dispatch = useAppDispatch();
  const { getSessionData } = useStorage();
  const profile = getSessionData("userData") as User;

  const allPosts = useAppSelector(selectAllPosts).length;
  const totalDrafts = useAppSelector(countDrafts);
  const totalPublished = useAppSelector(countPublished);
  const loading = useAppSelector(postLoadingState);
  const error = useAppSelector(postErrorState);

  const [posts, setPosts] = useState<IBlogPayload[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
    const limit = 9;
    const initialPage = 1
  const [total, setTotal] = useState(0);
const { page, totalPages, onPageChange, handleNext, handlePrevious } = usePagination({
  total,
  limit,
    initialPage,
});

  const fetchPosts = async (status?: string) => {
    dispatch(startLoading());
    dispatch(setError(""));
    try {
      const dispatchPost = await dispatch(
        fetchAllPosts({
          whiteLabelName: profile?.whiteLabelName,
          page: currentPage,
          limit,
          status
        })
      );
      const result = dispatchPost.payload?.result;
      if (result?.results) {
        setPosts(result?.results);
        setTotal(result?.totalResults);
      }
      dispatch(stopLoading());
    } catch (err) {
      dispatch(stopLoading());
      dispatch(setError(err));
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDeleteApi = useMutation(
    async (id: string) => await BlogService.deleteBlog(id),
    {
      onSuccess: () => {
        dispatch(deletePost(idToDelete));
        setOpenModal(false);
        toast.success("Blog post deleted successfully");
      },
      onError: (err) => {
        toast.error(err as string);
        setOpenModal(false);
      }
    }
  );

  const handleDelete = (id: string) => {
    setOpenModal(true);
    setIdToDelete(id);
  };

  const handleClickOutside = () => {
    setOpenModal(false);
    setIdToDelete("");
  };

  const handlePagination = (page: number) => setCurrentPage(page);
  const handleTabClick = (tab: "all" | "draft" | "published") => {
    setActiveTab(tab);
    setCurrentPage(1);
    fetchPosts(tab === "all" ? undefined : tab);
  };

  useEffect(() => {
    fetchPosts(activeTab === "all" ? undefined : activeTab);
  }, [currentPage, activeTab]);

  return {
    allPosts,
    posts,
    total,
    setTotal,
    currentPage,
    totalDrafts,
    totalPublished,
    loading,
    error,
    openModal,
    idToDelete,
    activeTab,
    limit,
    handleDeleteApi,
    handleDelete,
    handleClickOutside,
      handlePagination,
      handleNext,
    handlePrevious,
    handleTabClick
  };
};

export default useBlogPosts;
