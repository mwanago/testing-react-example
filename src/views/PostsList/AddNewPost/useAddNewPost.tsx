import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateNewPostDTO, Post } from '../../../shared/types/post';
import { postsApi } from '../../../shared/api/postsApi';
import { useNavigate } from 'react-router';

export const useAddNewPost = (
  updatePostsWithNewPost: (posts: Post) => void,
) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateNewPostDTO>({
    mode: 'onSubmit',
  });

  const errorMessages = useMemo(
    () =>
      Object.values(errors)
        .map((error) => error?.message)
        .filter((message): message is string => typeof message === 'string'),
    [errors],
  );

  const onCreateNewPostSubmit = async (formValues: CreateNewPostDTO) => {
    setLoading(true);
    const newPost = await postsApi.createNewPost(formValues);
    updatePostsWithNewPost(newPost);
    setLoading(false);
    navigate('/');
  };

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return {
    handleClose,
    handleClickOpen,
    isDialogOpen,
    errorMessages,
    register,
    onCreateNewPostSubmit,
    isLoading,
    handleSubmit,
  };
};
