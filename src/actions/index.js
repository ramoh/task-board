import * as api from "../api";
let _id = 1;

export function uniqueId() {
  return _id++;
}

export function createTask({ title, description }) {
  return {
    type: "CREATE_TASK",
    payload: {
      id: uniqueId(),
      title,
      description,
      status: "Unstarted",
    },
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

export function fetchTasksSucceded(tasks) {
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
