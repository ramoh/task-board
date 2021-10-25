import React from "react";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];
const TaskPage = ({ tasks = [] }) => {
  const renderTaskList = () => {
    return TASK_STATUSES.map((status) => {
      const statusTasks = tasks.filter((task) => task.status === status);
      return <TaskList key={status} status={status} tasks={statusTasks} />;
    });
  };

  return (
    <div className="tasks">
      <div className="task-lists">{renderTaskList()}</div>
    </div>
  );
};

export default TaskPage;
