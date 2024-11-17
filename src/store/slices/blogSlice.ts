import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import { RootState } from "../store";
import { BlogService } from "@/services/blog";
import { BlogSlice, IUpdatePostPayload } from "@/interfaces/SliceInterfaces";
import { IQueryParams } from "@/interfaces/AppInterfaces";
import toast from "react-hot-toast";


const initialState: BlogSlice = {
  posts: {
    all: [] as IBlogPayload[],
    draft: [] as IBlogPayload[],
    published: [] as IBlogPayload[],
  },
  counts: {
    total: 0,
    draft: 0,
    published: 0
  },
  totalPages: 0,
  loading: false,
  error: null
};


export const fetchPosts = createAsyncThunk<any, IQueryParams>(
  "blog/fetchPostsByTab",
  async ({ whiteLabelName, status, page, limit }: IQueryParams) => {
    // const status = tab === "all" ? undefined : tab; 
    const response = await BlogService.fetchAll({
      whiteLabelName,
      page,
      limit,
      status
    });
    console.log("response", response);
    return {
      // @ts-ignore
      posts: response.data?.result?.results,
      // @ts-ignore
      total: response.data?.result?.totalResults,
      // @ts-ignore
      totalPages: response.data?.result?.totalPages,
      tab: status
    };
  }
);

export const fetchPostCounts = createAsyncThunk<any, IQueryParams>(
  "blog/fetchPostCounts",
  async (payload:IQueryParams) => {
    // @ts-ignore
    const response = await BlogService.fetchPostCounts(payload);
    // @ts-ignore
    return response.data?.result;
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, totalPages, tab } = action.payload;
        console.log("fetchAllPayload", action.payload);
        // Update state based on tab type
        if (tab === "all" || undefined) {
          state.posts.all = posts;
        } else if (tab === "draft") {
          state.posts.draft = posts;
        } else if (tab === "published") {
          state.posts.published = posts;
        }
        state.totalPages = totalPages
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchPostCounts.fulfilled, (state, action) => {
        state.loading = false;
        const { total, draft, published } = action.payload;
        console.log("countPayload", action.payload);
        state.counts = { total, draft, published };
      })
      .addCase(fetchPostCounts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.all.push(action.payload); 
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        toast.error(state.error);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.all.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts.all[index] = action.payload;
        }
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        toast.error(state.error);
      })
      .addCase(deletePost.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        toast.error(state.error);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts.all = state.posts.all.filter(
          (post) => post._id !== action.payload
        );
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
export const selectCounts = (state: RootState) => state.blog.counts;