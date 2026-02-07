export interface Post {
  id: string;
  content: string;
  likes: number;
  authorId: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
  };
}

export interface CreatePostData {
  content: string;
}
