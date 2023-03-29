import { CreateComment, Comment } from '../types/Comment';

export async function createComment(
  newComment: CreateComment,
): Promise<Comment> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/comments',
    {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}
