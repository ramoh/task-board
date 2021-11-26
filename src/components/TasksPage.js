import React, { useState } from "react";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];
const TaskPage = ({
  tasks = [],
  isLoading = false,
  onCreateTask = (f) => f,
  onStatusChange = (f) => f,
  onDelete = (f) => f,
  onSearch = (f) => f,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setShowNewCardForm(false);
  };

  /**
   * Create a new task
   * @param {Event} e
   */
  const onCreateTaskInternal = (e) => {
    e.preventDefault();
    onCreateTask({
      title,
      description,
    });
    resetForm();
  };

  const toggleForm = () => setShowNewCardForm(!showNewCardForm);

  const onSearchInternal = (e) => {
    onSearch(e.target.value);
  };

  const renderTaskList = () => {
    return TASK_STATUSES.map((status) => {
      const statusTasks = tasks.filter((task) => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      );
    });
  };

  if (isLoading) {
    return <div className="tasks-loading">Loading....</div>;
  }

  return (
    <div className="tasks">
      <div>
        <div className="task-list-header">
          <input
            onChange={onSearchInternal}
            type="text"
            placeholder="Search ..."
          />
          <button className="button button-default" onClick={toggleForm}>
            + New Task
          </button>
        </div>
        {showNewCardForm && (
          <form className="new-task-form" onSubmit={onCreateTaskInternal}>
            <input
              className="full-width-input"
              onChange={onTitleChange}
              value={title}
              type="text"
              placeholder="title"
            />
            <input
              className="full-width-input"
              onChange={onDescriptionChange}
              value={description}
              type="text"
              placeholder="description"
            />
            <button className="button" type="submit">
              Save
            </button>
          </form>
        )}
      </div>
      <div className="task-lists">{renderTaskList()}</div>
    </div>
  );
};

export default TaskPage;
