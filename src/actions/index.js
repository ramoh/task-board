import * as api from "../api";

function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
    meta: {
      analytics: {
        event: "create-task",
        data: {
          id: task.id,
        },
      },
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

function fetchTasksSucceded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEDED",
    payload: {
      tasks,
    },
  };
}

export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());
    api
      .fetchTasks()
      .then((resp) => {
        setTimeout(() => dispatch(fetchTasksSucceded(resp.data)), 2000);
        // throw new Error("Oh no! Unable to fetch tasks!");
      })
      .catch((err) => {
        dispatch(fetchTasksFailed(err.message));
      });
  };
}

function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
}
