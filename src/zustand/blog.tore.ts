import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { BlogService, BlogPayload, IQueryParams } from "../services/blog.service";
import toast from "react-hot-toast";




export const useBlogStore = create(
  persist(
    combine(
      {
        posts: [] as BlogPayload[], 
        loading: false, 
        error: null as string | null
      },
      (set) => ({
        // Add a new post
        addPost: async (payload: BlogPayload) => {
          try {
            set({ loading: true, error: null });
            // const response = await BlogService.create(payload);
            set((state) => ({
              posts: [...state.posts, { ...payload }],
              loading: false
            }));
          } catch (error:any) {
            set({ loading: false, error: error.message });
          }
        },
        // Fetch all posts based on query parameters
        fetchAllPosts: async (params: IQueryParams) => {
          try {
            set({ loading: true, error: null });
            const response = await BlogService.fetchAll(params);
            set({ posts: response.data?.result?.results, loading: false });
            return
          } catch (error: any) {
            set({ loading: false, error: "An error occured while fetching Post" });
            console.log("FetchError", error);
          toast.error("An error occurred while fetching blog posts");
          }
        },
        // Fetch drafts
        fetchDrafts: () => {
          set({ loading: true, error: null });
          setTimeout(() => { 
            set({ loading: false, error: null });
          },1000)
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "draft");
        },
        // Fetch published posts
        fetchPublished: () => {
          set({ loading: true, error: null });
          setTimeout(() => {
            set({ loading: false, error: null });
          }, 1000);
          
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "published");
        },
        // Count total posts
        countPosts: () => {
          return useBlogStore.getState().posts.length;
        },
        // Count drafts
        countDrafts: () => {
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "draft").length;
        },
        // Count published posts
        countPublished: () => {
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "published").length;
        },

        updatePost: async (
          id: string,
          updatedPayload: Partial<BlogPayload>
        ) => {
          try {
            set({ loading: true, error: null });
            // const response = await BlogService.updateBlog(id, updatedPayload);
            set((state) => ({
              posts: state.posts.map((post) =>
                post._id === id ? { ...post, ...updatedPayload } : post
              ),
              loading: false
            }));
            
          } catch (error:any) {
            set({ loading: false, error: error.message });
            
          }
        },
        // Placeholder for deleting a post
        deletePost: async (id: string) => {
          try {
            set({ loading: true, error: null });
            // const response = await BlogService.deleteBlog(id);
            set((state) => ({
              posts: state.posts.splice(
                state.posts.findIndex((post) => post._id === id),
                1
              ),
              loading: false,
            }));
          } catch (error: any) {
            console.log("DeleteErrorrr", error);
            toast.error("An error occurred while deleting blog post");
            set({ loading: false, error: error.message });
          }
        }
      })
    ),
    {
      name: "blog-store",
      getStorage: () => sessionStorage // Persist to sessionStorage
    }
  )
);
