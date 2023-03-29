import { ChangeEvent, FormEvent, useState } from 'react';
import { createComment } from '../../shared/api/commentsApi';
import { Comment } from '../../shared/types/Comment';

export function useCreateCommentForm() {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [createdComments, setCreatedComments] = useState<Comment[]>([]);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const newComment = await createComment({
        name,
        body,
      });
      setCreatedComments([...createdComments, newComment]);
    } catch {
      setError('Something went wrong when creating the comment');
    }
  };

  return {
    handleSubmit,
    handleChangeName,
    handleChangeBody,
    error,
    createdComments,
  };
}
