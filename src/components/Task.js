import React from "react";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const Task = ({ task, onStatusChange = (f) => f }) => {
  const onStatusChangeInternal = (e) => {
    onStatusChange(task.id, e.target.value);
  };
  return (
    <div className="task">
      <div className="task-header">
        <div class="task-header-start">{task.title}</div>
        <div className="task-header-tail">
          <select value={task.status} onChange={onStatusChangeInternal}>
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button id="delete-task">X</button>
        </div>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
    </div>
  );
};

export default Task;
