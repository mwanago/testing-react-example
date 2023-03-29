export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreateNewPostDTO {
  userId: number;
  title: string;
  body: string;
}
