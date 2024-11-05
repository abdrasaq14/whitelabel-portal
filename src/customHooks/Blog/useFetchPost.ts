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
<<<<<<< HEAD
  fetchAllPosts
=======
  fetchAllPosts,
  countDrafts,
  countPublished
>>>>>>> 94f4fa5 (blog module completed)
} from "@/store/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useStorage from "../useStorage";
import { User } from "@/interfaces/AppInterfaces";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import usePagination from "../usePagination";
<<<<<<< HEAD
import { RootState } from "@/store/store";
=======
>>>>>>> 94f4fa5 (blog module completed)

const useBlogPosts = () => {
  const dispatch = useAppDispatch();
  const { getSessionData } = useStorage();
<<<<<<< HEAD
  const profile = getSessionData("UserData")?.user as User;
  const allPosts = useAppSelector(selectAllPosts).length;
  const countDrafts = (state: RootState) =>
    state.blog.posts?.filter((post) => post.status === "draft").length;

  const countPublished = (state: RootState) =>{
    console.log("state.blog.posts", state.blog.posts);
   return state.blog.posts?.filter((post) => post.status === "published")
     .length;
    };

=======
  const profile = getSessionData("userData") as User;

  const allPosts = useAppSelector(selectAllPosts).length;
>>>>>>> 94f4fa5 (blog module completed)
  const totalDrafts = useAppSelector(countDrafts);
  const totalPublished = useAppSelector(countPublished);
  const loading = useAppSelector(postLoadingState);
  const error = useAppSelector(postErrorState);

  const [posts, setPosts] = useState<IBlogPayload[]>([]);
<<<<<<< HEAD
  console.log("fetchAllBlog", posts);

=======
>>>>>>> 94f4fa5 (blog module completed)
  const [openModal, setOpenModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const limit = 9;
  const [total, setTotal] = useState(0);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const fetchPosts = async () => {
    dispatch(startLoading());
    dispatch(setError(""));
    try {
      await dispatch(
        fetchAllPosts({
          whiteLabelName: profile?.whiteLabelName,
          limit:10000,
        })
      );
=======
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
>>>>>>> 94f4fa5 (blog module completed)
      dispatch(stopLoading());
    } catch (err) {
      dispatch(stopLoading());
      dispatch(setError(err));
    } finally {
      dispatch(stopLoading());
    }
  };

<<<<<<< HEAD
  const fetchPostsOnTabChange = async (status: "draft" | "published"| undefined) => { 
     dispatch(startLoading());
     BlogService.fetchAll({
       whiteLabelName: profile?.whiteLabelName,
       page: currentPage,
       limit,
       status: activeTab === "all" ? undefined : activeTab,
     })
       .then((res: any) => {
         if (res.data?.result?.results) {
           setTotal(res.data?.result?.totalResults);
           setPosts(res.data?.result?.results);
         }
         dispatch(stopLoading());
       })
       .catch((err) => {
         dispatch(stopLoading());
         dispatch(setError(err));
       })
       .finally(() => dispatch(stopLoading()));
  }
=======
>>>>>>> 94f4fa5 (blog module completed)
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

<<<<<<< HEAD
  const handleTabClick = (tab: "all" | "draft" | "published") => {
    setActiveTab(tab);
    setCurrentPage(1);
    
  };

  useEffect(() => {
    fetchPosts();
   
  }, []);

  useEffect(() => {
   fetchPostsOnTabChange(activeTab === "all" ? undefined : activeTab);
=======
  const handlePagination = (page: number) => setCurrentPage(page);
  const handleTabClick = (tab: "all" | "draft" | "published") => {
    setActiveTab(tab);
    setCurrentPage(1);
    fetchPosts(tab === "all" ? undefined : tab);
  };

  useEffect(() => {
    fetchPosts(activeTab === "all" ? undefined : activeTab);
>>>>>>> 94f4fa5 (blog module completed)
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
<<<<<<< HEAD
    handleNext,
    handlePrevious,
    handleTabClick,
    handlePagination
=======
      handlePagination,
      handleNext,
    handlePrevious,
    handleTabClick
>>>>>>> 94f4fa5 (blog module completed)
  };
};

export default useBlogPosts;
