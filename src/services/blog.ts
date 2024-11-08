import { IBlogPayload } from "@/interfaces/ComponentInterfaces";
import apiClient from "./client";
import { IQueryParams } from "@/interfaces/AppInterfaces";


const baseEndPoint = "/blog";
export const BlogService = {
  create: (payload: IBlogPayload) =>
    apiClient.post(`${baseEndPoint}/create`, payload),
  fetchAll: (IQueryParams: IQueryParams) =>
    apiClient.get(`${baseEndPoint}/query`, { params: IQueryParams }),
  viewBlog: (id: string) => apiClient.get(`${baseEndPoint}/view/${id}`),
  updateBlog: (id: string, payload: IBlogPayload) =>
    apiClient.put(`${baseEndPoint}/update/${id}`, payload),
  fetchAllComments: (id: string) =>
    apiClient.get(`${baseEndPoint}/view/${id}/comment`),
  deleteBlog: (id: string) => apiClient.delete(`${baseEndPoint}/delete/${id}`),
  deleteComment: (postId: string, commentId: string) =>
    apiClient.delete(
      `${baseEndPoint}/comment/delete/?postId=${postId}&commentId=${commentId}`
    ),
};
