export interface User {
  id: string;
  name: string;
  postCount: number;
}

export interface Post {
  id: number;
  userId: string;
  title: string;
  content: string;
  commentCount?: number;
}