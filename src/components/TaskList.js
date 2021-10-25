import React from "react";
import Task from "./Task";

const TaskList = ({ status, tasks = [], onStatusChange = (f) => f }) => {
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
          ></Task>
        );
      })}
    </div>
  );
};

export default TaskList;
