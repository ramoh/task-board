import React from "react";
import Task from "./Task";

const TaskList = ({
  status,
  tasks = [],
  onStatusChange = (f) => f,
  onDelete = (f) => f,
}) => {
  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{status}</strong>
      </div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          ></Task>
        );
      })}
    </div>
  );
};

export default TaskList;
