import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { BlogPayload } from "../services/blog.service";
import toast from "react-hot-toast";
import { delay, handleError } from "../utils/Helpfunctions";

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
            // set({ loading: true, error: null });
            // const response = await BlogService.create(payload);
            set((state) => ({
              posts: [...state.posts, { ...payload }],
              loading: false
            }));
          } catch (error: any) {
            set({ loading: false, error: error.message });
          }
        },
        // Fetch all posts based on query parameters
        fetchAllPosts: async (payload: BlogPayload[]) => {
          set({ posts: payload });
          useBlogStore.getState().stopLoading();
        },
        // Fetch drafts
        fetchDrafts: async () => {
          useBlogStore.getState().startLoading();
          await delay(1200);
          const drafts = useBlogStore
            .getState()
            .posts.filter((post) => post.status === "draft");
          useBlogStore.getState().stopLoading();
          return drafts;
        },
        // Fetch published posts
        fetchPublished: async () => {
          useBlogStore.getState().startLoading();
          await delay(1200);
          const published = useBlogStore
            .getState()
            .posts.filter((post) => post.status === "published");
          useBlogStore.getState().stopLoading();
          return published;
        },
        startLoading: () => set({ loading: true }),
        stopLoading: () => set({ loading: false }),
        setError: (e: string) => set({ error: e }),
        updatePost: async (
          id: string,
          updatedPayload: Partial<BlogPayload>
        ) => {
          try {
            console.log("Imacoausingrendereding update");
            set({ loading: true, error: null });
            // const response = await BlogService.updateBlog(id, updatedPayload);
            set((state) => ({
              posts: state.posts.map((post) =>
                post._id === id ? { ...post, ...updatedPayload } : post
              ),
              loading: false
            }));
          } catch (error: any) {
            const e = handleError(error);
            set({ loading: false, error: e });
          }
        },
        // Placeholder for deleting a post
        deletePost: async (id: string) => {
          try {
            console.log("Imacoausingrendereding delete");
            set({ loading: true, error: null });
            set((state) => ({
              posts: state.posts.filter((post) => post._id !== id),
              loading: false
            }));
            console.log("loadingIndex", useBlogStore.getState().posts);
          } catch (error: any) {
            console.log("DeleteError", error);
            toast.error("An error occurred while deleting blog post");
            set({ loading: false, error: error.message });
          }
        },
        countDrafts: () => {
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "draft").length;
        },
        countPublished: () => {
          return useBlogStore
            .getState()
            .posts.filter((post) => post.status === "published").length;
        }
      })
    ),
    {
      name: "blog-store",
      getStorage: () => sessionStorage // Persist to sessionStorage
    }
  )
);
