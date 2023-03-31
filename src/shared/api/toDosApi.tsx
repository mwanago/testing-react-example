import { Task } from '../types/Task';

async function fetchToDos() {
  const toDosResponse = await fetch(
    'https://jsonplaceholder.typicode.com/todos',
  );
  return toDosResponse.json();
}

async function createNewTask(newTask: Task) {
  const newTaskResponse = await fetch(
    'https://jsonplaceholder.typicode.com/todos',
    {
      method: 'POST',
      headers: [['content-type', 'application/json']],
      body: JSON.stringify(newTask),
    },
  );
  return newTaskResponse.json();
}

async function deleteTask(taskId: number) {
  const deleteTaskResponse = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    {
      method: 'DELETE',
      headers: [['content-type', 'application/json']],
    },
  );
  return deleteTaskResponse.json();
}

export const toDosApi = {
  fetchToDos,
  createNewTask,
  deleteTask,
};
