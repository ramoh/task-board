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
  const timer = 0;
  return (dispatch) => {
    api
      .createTask({
        title,
        description,
        status,
        created,
        lastModified,
        timer,
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

    api.editTask(id, updatedTask).then((resp) => {
      dispatch(editTaskSucceeded(resp.data));
      if (resp.data.status === "In Progress") {
        dispatch(progressTimerStart(resp.data.id));
      }
      if (resp.data.status !== "In Progress") {
        dispatch(progressTimerStop(resp.data.id));
      }
    });
  };
}

function progressTimerStart(taskId) {
  return {
    type: "TIMER_STARTED",
    payload: { taskId },
  };
}

function progressTimerStop(taskId) {
  return {
    type: "TIMER_STOPPED",
    payload: { taskId },
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

export function filterTasks(searchTerm) {
  return { type: "FILTER_TASKS", payload: { searchTerm } };
}
