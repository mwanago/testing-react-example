import { describe, expect, Mock, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useAddNewPost } from '../useAddNewPost';
import { postsApi } from '../../../../shared/api/postsApi';
import { CreateNewPostDTO, Post } from '../../../../shared/types/post';
import React, { useState } from 'react';
import { TestWrapper } from '../../../../utils/testWrapper';

vi.mock('../../../../shared/api/postsApi', () => {
  return {
    postsApi: {
      createNewPost: vi.fn()
    }
  };
});

// vi.mock('react', () => {
//   return {
//     ...vi.importActual('react'),
//     useState: vi.fn()
//   };
// });

describe('AddNewPost', () => {
  describe('useAddNewPost', () => {
    describe('onCreateNewPostSubmit', () => {
      test('should call postsApi.createNewPost with form values', async () => {
        const updatePostsWithNewPostMock = vi.fn();
        const formValues: CreateNewPostDTO = { body: '12', title: 'abc', userId: 12 };
        const useAddNewPostRender = renderHook(() => useAddNewPost(updatePostsWithNewPostMock), { wrapper: TestWrapper });
        await useAddNewPostRender.result.current.onCreateNewPostSubmit(formValues);
        expect(postsApi.createNewPost).toBeCalledWith(formValues)
      });
      test('should call updatePostsWithNewPostMock with the values returned by postsApi.createNewPost', async () => {
        const updatePostsWithNewPostMock = vi.fn();
        const returnedPost: Post = { body: '12', title: 'abc', id: 12, userId: 12 };
        const formValues: CreateNewPostDTO = { body: '12', title: 'abc', userId: 12 };
        (postsApi.createNewPost as Mock).mockImplementation(() => returnedPost)
        const useAddNewPostRender = renderHook(() => useAddNewPost(updatePostsWithNewPostMock), { wrapper: TestWrapper });
        await useAddNewPostRender.result.current.onCreateNewPostSubmit(formValues);
        expect(updatePostsWithNewPostMock).toBeCalledWith(returnedPost);
      });
      test('should set isLoading value before api call to true and after api call to false', async () => {
        const updatePostsWithNewPostMock = vi.fn();
        const formValues: CreateNewPostDTO = { body: '12', title: 'abc', userId: 12 };
        const useAddNewPostRender = renderHook(() => useAddNewPost(updatePostsWithNewPostMock), { wrapper: TestWrapper });
        const submitPromise = useAddNewPostRender.result.current.onCreateNewPostSubmit(formValues);
        expect(useAddNewPostRender.result.current.isLoading).toBe(true);
        await submitPromise;
        expect(useAddNewPostRender.result.current.isLoading).toBe(false);
      });
    })})
})
