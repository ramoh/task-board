import * as api from "../api";
let _id = 1;

export function uniqueId() {
  return _id++;
}

function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

export function editTask(id, params = {}) {
  return {
    type: "EDIT_TASK",
    payload: {
      id,
      params,
    },
  };
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
    api.fetchTasks().then((resp) => {
      dispatch(fetchTasksSucceded(resp.data));
    });
  };
}
