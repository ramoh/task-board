import React from "react";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const Task = ({ task, onStatusChange = (f) => f, onDelete = (f) => f }) => {
  const onStatusChangeInternal = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  const onDeleteInternal = () => {
    onDelete(task.id);
  };

  const created = new Date(task.created);
  const lastModified = new Date(task.lastModified);
  const cssStatus =
    task.status === "Unstarted"
      ? "task-not-started "
      : task.status === "In Progress"
      ? "task-in-progress"
      : "task-complete";

  const taskHeaderCss = `task-header ${cssStatus}`;
  const taskDateCss = `task-dates ${cssStatus}`;
  return (
    <div className="task">
      <div className={taskHeaderCss}>
        <div className="task-header-start">{task.title}</div>
        <div className="task-header-tail">
          <select value={task.status} onChange={onStatusChangeInternal}>
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button id="delete-task" onClick={onDeleteInternal}>
            X
          </button>
        </div>
      </div>
      <div className={taskDateCss}>
        <div>Created: </div>
        <div>{`${created.getDate()}/${
          created.getMonth() + 1
        }/${created.getFullYear()}, ${created.getHours()}:${created.getMinutes()}`}</div>
      </div>
      <div className={taskDateCss}>
        <div>Last Modfied:</div>
        <div>{`${lastModified.getDate()}/${
          lastModified.getMonth() + 1
        }/${lastModified.getFullYear()}, ${lastModified.getHours()}:${lastModified.getMinutes()}`}</div>
      </div>
      <hr />
      <div className="task-body">
        <div>{task.description}</div>
        <div className="task-timer">{task.timer}s</div>
      </div>
    </div>
  );
};

export default Task;
