import { useEffect, useState } from 'react';
import { Post } from '../../shared/types/post';
import { postsApi } from '../../shared/api/postsApi';

export const usePostsList = () => {
  const [posts, setPosts] = useState<Post[] | null>();

  async function fetchPosts() {
    const postsResponse = await postsApi.fetchPosts();
    setPosts(postsResponse);
  }

  const updatePostsWithNewPost = (post: Post) => setPosts([post, ...(posts ?? [])])

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    setPosts,
    updatePostsWithNewPost,
  }
}
