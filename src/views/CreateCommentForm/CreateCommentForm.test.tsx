import { fireEvent, render } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { CreateCommentForm } from './index';
import { createComment } from '../../shared/api/commentsApi';

vi.mock('../../shared/api/commentsApi', () => ({
  createComment: vi.fn(),
}));

describe('The CreateCommentForm', () => {
  let name: string;
  let body: string;
  beforeEach(() => {
    name = 'Comment name';
    body = 'Comment body';
    (createComment as Mock).mockReturnValue(new Promise(() => null));
  });
  describe('when the user types the name and the body', () => {
    describe('and clicks the submit button', () => {
      it('should make attempt to create the POST request', () => {
        const createCommentForm = render(<CreateCommentForm />);

        const nameInput = createCommentForm.getByPlaceholderText('name');
        const bodyInput = createCommentForm.getByPlaceholderText('body');

        fireEvent.change(nameInput, { target: { value: name } });
        fireEvent.change(bodyInput, { target: { value: body } });

        const button = createCommentForm.getByRole('button');

        fireEvent.click(button);

        expect(createComment).toBeCalledWith({
          name,
          body,
        });
      });
      describe('if the API call is successful', () => {
        beforeEach(() => {
          (createComment as Mock).mockResolvedValue({ name, body, id: 501 });
        });
        it('should display the created comment and not display an error', async () => {
          const createCommentForm = render(<CreateCommentForm />);

          const nameInput = createCommentForm.getByPlaceholderText('name');
          const bodyInput = createCommentForm.getByPlaceholderText('body');

          fireEvent.change(nameInput, { target: { value: name } });
          fireEvent.change(bodyInput, { target: { value: body } });

          const button = createCommentForm.getByRole('button');

          fireEvent.click(button);

          const nameParagraph = await createCommentForm.findByText(name, {
            selector: 'p',
          });
          const bodyParagraph = await createCommentForm.findByText(body, {
            selector: 'p',
          });
          const errorParagraph =
            createCommentForm.queryByTestId('comment-error');

          expect(nameParagraph).toBeDefined();
          expect(bodyParagraph).toBeDefined();
          expect(errorParagraph).toBeNull();
        });
      });
      describe('if the API call is unsuccessfull', () => {
        beforeEach(() => {
          (createComment as Mock).mockImplementation(() => {
            throw new Error();
          });
        });
        it('should display an error and not display the comment', async () => {
          const createCommentForm = render(<CreateCommentForm />);

          const nameInput = createCommentForm.getByPlaceholderText('name');
          const bodyInput = createCommentForm.getByPlaceholderText('body');

          fireEvent.change(nameInput, { target: { value: name } });
          fireEvent.change(bodyInput, { target: { value: body } });

          const button = createCommentForm.getByRole('button');

          fireEvent.click(button);

          const nameParagraph = createCommentForm.queryByText(name, {
            selector: 'p',
          });
          const bodyParagraph = createCommentForm.queryByText(body, {
            selector: 'p',
          });
          const errorParagraph = await createCommentForm.findByTestId(
            'comment-error',
          );

          expect(nameParagraph).toBeNull();
          expect(bodyParagraph).toBeNull();
          expect(errorParagraph).toBeDefined();
        });
      });
    });
  });
});
