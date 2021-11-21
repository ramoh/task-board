import * as api from "../api";

function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  const created = new Date();
  const lastModified = new Date();
  return (dispatch) => {
    api
      .createTask({
        title,
        description,
        status,
        created,
        lastModified,
      })
      .then((resp) => {
        dispatch(createTaskSucceeded(resp.data));
      });
  };
}

function deleteTaskSucceeded(id) {
  return {
    type: "DELETE_TASK_SUCCEEDED",
    payload: {
      id,
    },
  };
}

export function deleteTask(id) {
  return (dispatch) => {
    api.deleteTask(id).then(() => dispatch(deleteTaskSucceeded(id)));
  };
}

function editTaskSucceeded(task) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    params.lastModified = new Date();
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);

    api
      .editTask(id, updatedTask)
      .then((resp) => dispatch(editTaskSucceeded(resp.data)));
  };
}

function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function fetchTasks() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}
