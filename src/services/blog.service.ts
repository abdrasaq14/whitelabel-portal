import { createApiClient } from "../utils/api";

export interface BlogPayload {
  _id?: string;
  authorId: string;
  title: string;
  content: string;
  date?: string;
  image: string;
  comments: {
    userId: string;
    name?: string;
    comment: string;
    createdAt: Date;
  }[];
  likes: number;
  shares: number;
  allowComments: boolean;
  allowLikes: boolean;
  status: string;
  whiteLabelName: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IQueryParams { 
  whiteLabelName?: string;
  page?: number;
  limit?: number;
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
};
