import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import { RootState } from "../store";
import { BlogService } from "@/services/blog";
import { BlogSlice, IUpdatePostPayload } from "@/interfaces/SliceInterfaces";
import { IQueryParams } from "@/interfaces/AppInterfaces";



const initialState: BlogSlice = {
  posts: [] as IBlogPayload[],
  loading: false,
  error: null
};


export const fetchAllPosts = createAsyncThunk<any, IQueryParams>(
  "blog/fetchAllPosts",
  async (payload: IQueryParams) => {
    const response = await BlogService.fetchAll(payload);
<<<<<<< HEAD
    console.log("fetchAllBlog", response.data);
    // @ts-ignore
    return response.data?.result; 
=======
    return response.data; 
>>>>>>> cb4d2a9 (blog module in progress)
  }
);


export const addPost = createAsyncThunk<any, IBlogPayload>(
  "blog/addPost",
  async (payload: IBlogPayload) => {
    const response = await BlogService.create(payload);
    return response.data;
  }
);

export const updatePost = createAsyncThunk<any, IUpdatePostPayload>(
  "blog/updatePost",
  async (payload: IUpdatePostPayload) => {
    const response = await BlogService.updateBlog(payload.id, payload.updatedPayload as IBlogPayload);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id: string) => {
    await BlogService.deleteBlog(id); 
    return id;
  }
);

// Slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 94f4fa5 (blog module completed)
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
<<<<<<< HEAD
=======
>>>>>>> cb4d2a9 (blog module in progress)
=======
>>>>>>> 94f4fa5 (blog module completed)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< HEAD
        state.posts = action.payload.results;
=======
        state.posts = action.payload;
>>>>>>> cb4d2a9 (blog module in progress)
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  }
});

// Export actions and reducer
<<<<<<< HEAD
<<<<<<< HEAD
export const { setError, clearError, startLoading, stopLoading } = blogSlice.actions;
=======
export const { setError, clearError } = blogSlice.actions;
>>>>>>> cb4d2a9 (blog module in progress)
=======
export const { setError, clearError, startLoading, stopLoading } = blogSlice.actions;
>>>>>>> 94f4fa5 (blog module completed)
export default blogSlice.reducer;

// Selectors
export const selectAllPosts = (state: RootState) => state.blog.posts;
<<<<<<< HEAD
<<<<<<< HEAD
export const postLoadingState = (state: RootState) => state.blog.loading;
export const postErrorState = (state: RootState) => state.blog.error;
=======
export const selectPostLoading = (state: RootState) => state.blog.loading;
export const selectPostError = (state: RootState) => state.blog.error;
>>>>>>> cb4d2a9 (blog module in progress)
=======
export const postLoadingState = (state: RootState) => state.blog.loading;
export const postErrorState = (state: RootState) => state.blog.error;
export const countDrafts = (state: RootState) => 
  state.blog.posts.filter((post) => post.status === "draft").length;

export const countPublished = (state: RootState) => 
  state.blog.posts.filter((post) => post.status === "published").length;
>>>>>>> 94f4fa5 (blog module completed)
