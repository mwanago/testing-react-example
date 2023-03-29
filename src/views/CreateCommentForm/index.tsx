import React from 'react';
import { useCreatePostForm } from './useCreatePostForm';

export const CreateCommentForm = () => {
  const { handleSubmit, handleChangeName, handleChangeBody, error } =
    useCreatePostForm();

  return (
    <form onSubmit={handleSubmit}>
      <p>Create your comment:</p>
      <input name="name" onChange={handleChangeName} />
      <input name="body" onChange={handleChangeBody} />
      <p data-testid="comment-error">{error}</p>
      <button>Create comment</button>
    </form>
  );
};
