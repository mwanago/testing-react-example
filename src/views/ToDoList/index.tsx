import React from 'react';
import { ToDoListColumn } from './ToDoListColumn';
import { useToDoList } from './useToDoList/useToDoList';
import './styles.css';

export const ToDoList = () => {
  const {
    toDoList,
    finishedList,
    handleAddTaskButton,
    error,
    handleDeleteTask,
    handleTaskInputChange,
    taskInputValue,
  } = useToDoList();

  return (
    <div>
      <h2>Add new task</h2>
      <div>
        <input
          onInput={handleTaskInputChange}
          value={taskInputValue}
          placeholder="title"
        />
        <button
          className="add-task-button"
          onClick={() => handleAddTaskButton()}
        >
          Add task
        </button>
        {error && <p data-testid="to-do-list-comment-error">{error}</p>}
      </div>
      <div className="lists-wrapper">
        {toDoList && (
          <ToDoListColumn
            tasksList={toDoList}
            columnDescription={'To Do List'}
            handleDeleteTask={handleDeleteTask}
          />
        )}
        {finishedList && (
          <ToDoListColumn
            tasksList={finishedList}
            columnDescription={'Finished List'}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};
