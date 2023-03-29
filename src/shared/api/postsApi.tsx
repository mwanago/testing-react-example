import { CreateNewPostDTO } from '../types/post';

async function fetchPosts() {
  const postsResponse = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return postsResponse.json();
}

async function createNewPost(newPostDTO: CreateNewPostDTO) {
  const newPostResponse = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: [['content-type', 'application/json']],
      body: JSON.stringify(newPostDTO),
    },
  );
  return newPostResponse.json();
}

export const postsApi = {
  fetchPosts,
  createNewPost,
};
