import { BootstrapDialog } from '../../../shared/components/StyledDialog/BootstrapDialog';

import React, { FC } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputLabel,
  TextField,
} from '@mui/material';
import { StyledAlert } from '../../../shared/components/StyledAlert';
import { useAddNewPost } from './useAddNewPost';
import { BootstrapDialogTitle } from '../../../shared/components/StyledDialog/BootstrapDialogTitle';
import { Post } from '../../../shared/types/post';

interface AddNewPostProps {
  updatePostsWithNewPost: (posts: Post) => void;
}

export const AddNewPost: FC<AddNewPostProps> = ({ updatePostsWithNewPost }) => {
  const {
    handleClose,
    handleClickOpen,
    isDialogOpen,
    errorMessages,
    register,
    isLoading,
    onCreateNewPostSubmit,
    handleSubmit,
  } = useAddNewPost(updatePostsWithNewPost);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Post
      </Button>
      <form>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
          fullWidth={true}
          maxWidth={'md'}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add New Post
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {!!errorMessages.length && (
              <StyledAlert>{errorMessages.join(', ')}</StyledAlert>
            )}
            <Box mb={2}>
              <InputLabel>body</InputLabel>
              <TextField type={'text'} fullWidth={true} {...register('body')} />
            </Box>

            <Box mb={2}>
              <InputLabel>title</InputLabel>
              <TextField
                type={'text'}
                fullWidth={true}
                {...register('title')}
              />
            </Box>

            <Box mb={2}>
              <InputLabel>userId</InputLabel>
              <TextField
                type={'text'}
                fullWidth={true}
                {...register('userId')}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit(onCreateNewPostSubmit)}
              autoFocus
              variant={'contained'}
              type={'submit'}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </>
  );
};
