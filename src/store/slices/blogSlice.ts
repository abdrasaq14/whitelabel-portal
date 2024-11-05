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
    return response.data; 
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
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
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
        state.posts = action.payload;
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
export const { setError, clearError, startLoading, stopLoading } = blogSlice.actions;
export default blogSlice.reducer;

// Selectors
export const selectAllPosts = (state: RootState) => state.blog.posts;
export const postLoadingState = (state: RootState) => state.blog.loading;
export const postErrorState = (state: RootState) => state.blog.error;
export const countDrafts = (state: RootState) => 
  state.blog.posts.filter((post) => post.status === "draft").length;

export const countPublished = (state: RootState) => 
  state.blog.posts.filter((post) => post.status === "published").length;
