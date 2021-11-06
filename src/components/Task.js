import React from "react";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const Task = ({ task, onStatusChange = (f) => f }) => {
  const onStatusChangeInternal = (e) => {
    onStatusChange(task.id, e.target.value);
  };
  return (
    <div className="task">
      <div className="task-header">
        <div>{task.title}</div>
        <select value={task.status} onChange={onStatusChangeInternal}>
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button id="delete-task">X</button>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
    </div>
  );
};

export default Task;
