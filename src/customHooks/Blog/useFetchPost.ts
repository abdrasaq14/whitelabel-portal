import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  setError,
  deletePost,
  postLoadingState,
  postErrorState,
  fetchPosts,
  selectCounts,
  fetchPostCounts
} from "@/store/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useStorage from "../useStorage";
import { User } from "@/interfaces/AppInterfaces";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import { RootState } from "@/store/store";
import { BlogService } from "@/services/blog";

const useBlogPosts = () => {
  const dispatch = useAppDispatch();
  const { getSessionData } = useStorage();
  const profile = getSessionData("UserData")?.user as User;

  // Selectors
  const allPosts = useAppSelector(
    (state: RootState) => selectCounts(state).total
  );
  const totalDrafts = useAppSelector(
    (state: RootState) => state.blog.counts.draft
  );
  const totalPublished = useAppSelector(
    (state: RootState) => state.blog.counts.published
  );

  const totalPages = useAppSelector((state: RootState) => state.blog.totalPages);
  const loading = useAppSelector(postLoadingState);
  const error = useAppSelector(postErrorState);

  // Local State
  const [posts, setPosts] = useState<IBlogPayload[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  // Pagination Handlers
  const handlePagination = (page: number) => setCurrentPage(page);
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrevious = () => setCurrentPage((prev) => prev - 1);

  // Fetch posts using the fetchPosts action
  const fetchPostsOnTabChange = async () => {
    try {
      console.log("fetching posts", activeTab);
      const resultAction = await dispatch(
        fetchPosts({
          whiteLabelName: profile?.whiteLabelName,
          page: currentPage,
          limit,
          status: activeTab === "all" ? undefined : activeTab
        })
      );
      // dispatch(stopLoading());
      // Update local state with fetched posts and total count if successful
      console.log("fetching posts", resultAction.payload);
      if (fetchPosts.fulfilled.match(resultAction)) {
        setPosts(resultAction.payload.posts);
        setTotal(resultAction.payload.totalResults);
      } else {
        dispatch(setError("Failed to fetch posts"));
      }
    } catch (err) {
      console.log("Error fetching posts", err);
      dispatch(setError(err));
    } finally {
    }
  };

  // Delete post
  const handleDeleteApi = (idToDelete: string) => {
   try {
     dispatch(deletePost(idToDelete));
     dispatch(fetchPostCounts({ whiteLabelName: profile.whiteLabelName }));
     setOpenModal(false);
     toast.success("Blog post deleted successfully");
   } catch (error) {
      toast.error("Failed to delete blog post");
   }
  }

  const handleDelete = (id: string) => {
    setOpenModal(true);
    setIdToDelete(id);
  };

  const handleClickOutside = () => {
    setOpenModal(false);
    setIdToDelete("");
  };

  const handleTabClick = (tab: "all" | "draft" | "published") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Fetch counts on mount
useEffect(() => {
  if (profile?.whiteLabelName) {
    dispatch(fetchPostCounts({ whiteLabelName: profile.whiteLabelName }));
  }
}, [dispatch, profile?.whiteLabelName]);


  // Fetch posts on tab change or page change
  useEffect(() => {
    fetchPostsOnTabChange();
  }, [currentPage, activeTab]);

  return {
    allPosts,
    posts,
    total,
    totalPages,
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
    handleNext,
    handlePrevious,
    handleTabClick,
    handlePagination
  };
};

export default useBlogPosts;
