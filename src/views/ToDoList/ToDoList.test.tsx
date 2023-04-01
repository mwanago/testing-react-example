import { vi, Mock } from 'vitest';
import { Task } from '../../shared/types/Task';
import { toDosApi } from '../../shared/api/toDosApi';
import { ToDoList } from './index';
import { fireEvent, render } from '@testing-library/react';

vi.mock('../../shared/api/toDosApi', () => {
  return {
    toDosApi: {
      fetchToDos: vi.fn(),
      deleteTask: vi.fn(),
      createNewTask: vi.fn(),
    },
  };
});

describe('The ToDoList', () => {
  let newTaskTitle: string;
  let newTaskMock: Task;
  let task1: Task;
  let task2: Task;
  let task3: Task;
  let task4: Task;
  let returnedTasksList: Task[];

  beforeEach(() => {
    task1 = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: true,
    };
    task2 = {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    };
    task3 = {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    };
    task4 = {
      userId: 1,
      id: 4,
      title: 'qui ullam ratione quibusdam voluptatem quia omnis',
      completed: true,
    };
    returnedTasksList = [task1, task2, task3, task4];
    newTaskTitle = 'mocked task';
    newTaskMock = {
      title: newTaskTitle,
      id: 1,
      userId: 1,
      completed: false
    };
    (toDosApi.fetchToDos as Mock).mockReturnValue(new Promise(() => null));
  });

  describe('when the component is mounted', () => {
    describe('and the Api call is successful', () => {
      beforeEach(() => {
        (toDosApi.fetchToDos as Mock).mockResolvedValue(returnedTasksList);
      });
      it('should display tasks and not display error', async () => {
        const toDoList = render(<ToDoList />);

        const firstTasksParagraph = await toDoList.findByText(task1.title, {
          selector: 'p',
        });
        const secondTasksParagraph = await toDoList.findByText(task2.title, {
          selector: 'p',
        });
        const thirdTasksParagraph = await toDoList.findByText(task3.title, {
          selector: 'p',
        });
        const errorParagraph = toDoList.queryByTestId('comment-error');

        expect(firstTasksParagraph).toBeDefined();
        expect(secondTasksParagraph).toBeDefined();
        expect(thirdTasksParagraph).toBeDefined();
        expect(errorParagraph).toBeNull();
      });
    });
    describe('and the Api call is unsuccessful', () => {
      beforeEach(() => {
        (toDosApi.fetchToDos as Mock).mockRejectedValue(null);
      });
      it('should display error and not display tasks', async () => {
        const toDoList = render(<ToDoList />);

        const errorParagraph = await toDoList.findByText(
          'Failed to catch tasks list', {selector: 'p'}
        );
        const firstTaskParagraph = toDoList.queryByText(task1.title, {
          selector: 'p',
        });

        expect(errorParagraph).toBeDefined();
        expect(firstTaskParagraph).toBeNull();
      });
    });
  });
  describe('when user types the title', () => {
    describe('and clicks the submit button', () => {
      beforeEach(() => {
        (toDosApi.fetchToDos as Mock).mockResolvedValue(returnedTasksList);
        (toDosApi.createNewTask as Mock).mockReturnValue(new Promise(() => null));
      })
      it('should make attempt to create the POST request', async() => {
        const toDoList = render(<ToDoList />);

        const titleInput = toDoList.getByPlaceholderText('title');

        fireEvent.input(titleInput, { target: { value: newTaskTitle } });

        const button = toDoList.getByRole('button');

        fireEvent.click(button)

        expect(toDosApi.createNewTask).toHaveBeenCalledWith(newTaskMock)
      })
      describe('if the Api call is successful', () => {
        beforeEach(() => {
          (toDosApi.createNewTask as Mock).mockResolvedValue(newTaskMock);
        })
        it('should create new task and not throw error', async() => {
          const toDoList = render(<ToDoList />);

          const titleInput = toDoList.getByPlaceholderText('title');

          fireEvent.change(titleInput, { target: { value: newTaskTitle } });

          const button = toDoList.getByRole('button');

          fireEvent.click(button)

          const newTaskParagraph = await toDoList.findByText(newTaskTitle, {
            selector: 'p',
          });

          const errorParagraph = toDoList.findByText(
            'Failed to catch tasks list', {selector: 'p'}
          )

          expect(newTaskParagraph).toBeDefined()
          expect(errorParagraph).toBeNull()
        });
      });
      describe('if the Api call is unsuccessful', () => {
        beforeEach(() => {
          (toDosApi.createNewTask as Mock).mockRejectedValue(null);
        })
        it('should throw error and not create task', async() => {
          const toDoList = render(<ToDoList />);

          const titleInput = toDoList.getByPlaceholderText('title');

          fireEvent.change(titleInput, { target: { value: newTaskTitle } });

          const button = toDoList.getByRole('button');

          fireEvent.click(button)

          const newTaskParagraph = toDoList.queryByText(newTaskTitle, {
            selector: 'p',
          });

          const errorParagraph = await toDoList.findByText(
            'Something went wrong when creating the task', {selector: 'p'}
          );

          expect(newTaskParagraph).toBeNull()
          expect(errorParagraph).toBeDefined()
        });
      });
    });
  });
});
