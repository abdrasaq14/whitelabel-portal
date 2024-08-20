import { createApiClient } from "../utils/api";

export interface BlogPayload {
  authorId: string;
  title: string;
  content: string;
  image: string;
  comments: {
    userId: string;
    comment: string;
    createdAt: Date;
  }[];
  likes: number;
  shares: number;
  allowComments: boolean;
  allowLikes: boolean;
  status: string;
}

export const BlogService = {
  create: (payload: BlogPayload) =>
    createApiClient(false).post(`/blog/create`, payload)
};
