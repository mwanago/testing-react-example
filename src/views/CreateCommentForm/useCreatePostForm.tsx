import { ChangeEvent, FormEvent, useState } from 'react';
import { createComment } from '../../shared/api/commentsApi';

export function useCreatePostForm() {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

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
      await createComment({
        name,
        body,
      });
    } catch {
      setError('Something went wrong when creating the comment');
    }
  };

  return {
    handleSubmit,
    handleChangeName,
    handleChangeBody,
    error,
  };
}
