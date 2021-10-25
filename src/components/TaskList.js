import React from "react";
import Task from "./Task";

const TaskList = ({ status, tasks = [] }) => {
  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{status}</strong>
      </div>
      {tasks.map((task) => {
        return <Task key={task.id} task={task}></Task>;
      })}
    </div>
  );
};

export default TaskList;
