import React from 'react';
import { Task } from '../../../shared/types/Task';
import '../styles.css';

interface Props {
  tasksList: Task[];
  columnDescription: string;
  handleDeleteTask: (task: Task) => void;
}
export const ToDoListColumn = ({
  tasksList,
  columnDescription,
  handleDeleteTask,
}: Props) => {
  return (
    <div className="tasks-column">
      <h3>{columnDescription}</h3>
      {tasksList.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <button onClick={() => handleDeleteTask(task)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
