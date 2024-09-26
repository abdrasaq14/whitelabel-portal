import { createApiClient } from "../utils/api";

export interface Comments {
  _id?: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
}
export interface BlogPayload {
  _id?: string;
  authorId: string;
  title: string;
  content: string;
  // date?: string;
  image: string;
  comments: Comments[];
  likes: number;
  shares: number;
  allowComments: boolean;
  allowLikes: boolean;
  status: string;
  whiteLabelName: string;
  publishedDate?: string;
}
export interface IQueryParams { 
  whiteLabelName?: string;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalResults?: number;
  search?: string;
  status?: string;

}
export const BlogService = {
  create: (payload: BlogPayload) =>
    createApiClient(false).post(`/blog/create`, payload),
  fetchAll: (IQueryParams: IQueryParams) =>
    createApiClient(false).get(`/blog/query`, { params: IQueryParams }),
  viewBlog: (id: string) =>
    createApiClient(false).get(`/blog/view/${id}`),
  updateBlog: (id: string, payload: BlogPayload) =>
    createApiClient(false).put(`/blog/update/${id}`, payload),
  deleteBlog: (id: string) =>
    createApiClient(false).delete(`/blog/delete/${id}`),
  deleteComment: (postId: string, commentId: string) =>
    createApiClient(false).delete(`/blog/comment/delete/?postId=${postId}&commentId=${commentId}`),
};
