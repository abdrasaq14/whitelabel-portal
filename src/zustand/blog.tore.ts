import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { BlogService, BlogPayload, IQueryParams } from "../services/blog.service";




export const useBlogStore = create(
  persist(
    combine(
      {
        posts: [] as BlogPayload[], // Array to hold posts
        loading: false, // Loading state
        error: null as string | null // Error state
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
          } catch (error:any) {
            set({ loading: false, error: error.message });
          }
        },
        // Fetch drafts
        fetchDrafts: () => {
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "draft");
        },
        // Fetch published posts
        fetchPublished: () => {
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
          // Update logic goes here
        },
        // Placeholder for deleting a post
        deletePost: async (id: string) => {
          // Delete logic goes here
        }
      })
    ),
    {
      name: "blog-store",
      getStorage: () => sessionStorage // Persist to sessionStorage
    }
  )
);
