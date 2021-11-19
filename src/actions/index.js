import { CALL_API } from "../middleware/api";

const FETCH_TASK_STARTED = "FETCH_TASKS_STARTED";
const FETCH_TASK_SUCCEDED = "FETCH_TASKS_SUCCEDED";
const FETCH_TASK_FAILED = "FETCH_TASKS_FAILED";
const CREATE_TASK_STARTED = "CREATE_TASK_STARTED";
const CREATE_TASK_SUCCEDED = "CREATE_TASK_SUCCEEDED";
const CREATE_TASK_FAILED = "CREATE_TASK_FAILED";
const DELETE_TASK_STARTED = "DELETE_TASK_STARTED";
const DELETE_TASK_SUCCEEDED = "DELETE_TASK_SUCCEEDED";
const DELETE_TASK_FAILED = "DELETE_TASK_FAILED";
const EDIT_TASK_STARTED = "EDIT_TASK_STARTED";
const EDIT_TASK_SUCCEDED = "EDIT_TASK_SUCCEEDED";
const EDIT_TASK_FAILED = "EDIT_TASK_FAILED";

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    params.lastModified = new Date();
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);

    dispatch({
      [CALL_API]: {
        method: "PUT",
        types: [EDIT_TASK_STARTED, EDIT_TASK_SUCCEDED, EDIT_TASK_FAILED],
        endpoint: `/tasks/${id}`,
        body: updatedTask,
      },
    });
  };
}

function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function fetchTasks() {
  return {
    [CALL_API]: {
      method: "GET",
      types: [FETCH_TASK_STARTED, FETCH_TASK_SUCCEDED, FETCH_TASK_FAILED],
      endpoint: "/tasks",
    },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  const created = new Date();
  const lastModified = new Date();

  return {
    [CALL_API]: {
      types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEDED, CREATE_TASK_FAILED],
      endpoint: "/tasks",
      method: "POST",
      body: {
        title,
        description,
        status,
        created,
        lastModified,
      },
    },
  };
}

export function deleteTask(id) {
  return {
    [CALL_API]: {
      types: [DELETE_TASK_STARTED, DELETE_TASK_SUCCEEDED, DELETE_TASK_FAILED],
      method: "DELETE",
      endpoint: `/tasks/${id}`,
    },
  };
}
