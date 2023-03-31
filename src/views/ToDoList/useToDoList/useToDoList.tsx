import React, { useEffect, useState } from 'react';
import { Task } from '../../../shared/types/Task';
import { tasksApi } from '../../../shared/api/toDosApi';

export const useToDoList = () => {
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [finishedList, setFinishedList] = useState<Task[]>([]);
  const [idCounter, setIdCounter] = useState<number>(0);
  const [error, setError] = useState('');
  const [taskInputValue, setTaskInputValue] = useState('');

  const handleTaskInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTaskInputValue(event.target.value);
  };
  async function fetchToDos() {
    const tasksList = await tasksApi.fetchToDos();
    let biggestId = 0;
    let todo: Task[] = [];
    let finished: Task[] = [];

    tasksList.forEach((task: Task) => {
      const listToPushTo = task.completed ? finished : todo;
      listToPushTo.push(task);
      biggestId = task.id > biggestId ? task.id : biggestId;
    });

    setIdCounter(biggestId);
    setToDoList([...todo]);
    setFinishedList([...finished]);
  }

  useEffect(() => {
    fetchToDos();
  }, []);

  const handleAddTaskButton = () => {
    const taskToAdd = {
      title: taskInputValue,
      id: idCounter + 1,
      userId: 1,
      completed: false,
    };
    tasksApi
      .createNewTask(taskToAdd)
      .then((newTask) => {
        toDoList.unshift(newTask);
        setToDoList([...toDoList]);
        setIdCounter(idCounter + 1);
      })
      .catch(() => setError('Something went wrong when creating the task'));
  };

  const handleDeleteTask = (task: Task) => {
    tasksApi
      .deleteTask(task.id)
      .then(() => {
        const listForOperation = task.completed ? finishedList : toDoList;
        const taskIndexToDelete = listForOperation.findIndex(
          (operationTask) => operationTask.id === task.id,
        );
        listForOperation.splice(taskIndexToDelete, 1);
        task.completed
          ? setFinishedList([...listForOperation])
          : setToDoList([...listForOperation]);
      })
      .catch(() =>
        setError(`Something went wrong with deleting task ${task.id}`),
      );
  };

  return {
    toDoList,
    finishedList,
    handleAddTaskButton,
    error,
    handleDeleteTask,
    handleTaskInputChange,
    taskInputValue,
  };
};
