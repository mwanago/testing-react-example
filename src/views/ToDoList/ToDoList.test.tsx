import { vi, Mock } from 'vitest';
import { Task } from '../../shared/types/Task';
import { toDosApi } from '../../shared/api/toDosApi';
import { ToDoList } from './index';
import { render } from '@testing-library/react';

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
});
