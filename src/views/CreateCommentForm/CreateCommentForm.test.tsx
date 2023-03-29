import { fireEvent, render } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { CreateCommentForm } from './index';
import { createComment } from '../../shared/api/commentsApi';

vi.mock('../../shared/api/commentsApi', () => ({
  createComment: vi.fn(),
}));

describe('The CreateCommentForm', () => {
  beforeEach(() => {
    (createComment as Mock).mockReturnValue(new Promise(() => null));
  });
  describe('when the user types the name and the body', () => {
    it('should make attempt to create the POST request', () => {
      const createCommentForm = render(<CreateCommentForm />);

      const nameInput = createCommentForm.getByPlaceholderText('name');
      const bodyInput = createCommentForm.getByPlaceholderText('body');

      const name = 'Comment name';
      const body = 'Comment body';

      fireEvent.change(nameInput, { target: { value: name } });
      fireEvent.change(bodyInput, { target: { value: body } });

      const button = createCommentForm.getByRole('button');

      fireEvent.click(button);

      expect(createComment).toBeCalledWith({
        name,
        body,
      });
    });
  });
});
