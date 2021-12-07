import * as api from "../api";
import { normalize, schema } from "normalizr";

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
  return (dispatch, getState) => {
    api
      .createTask({
        title,
        description,
        status,
        created,
        lastModified,
        timer,
        projectId: getState().page.currentProjectId,
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
    const task = getState().tasks.items[id];
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

export function fetchTasks() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

export function filterTasks(searchTerm) {
  return { type: "FILTER_TASKS", payload: { searchTerm } };
}

function fetchProjectsStarted(boards) {
  return { type: "FETCH_PROJECTS_STARTED", payload: { boards } };
}

function fetchProjectsFailed(err) {
  return { type: "FETCH_PROJECTS_FAILED", payload: { err } };
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());

    return api
      .fetchProjects()
      .then((resp) => {
        const projects = resp.data;
        const normalizedData = normalize(projects, [projectSchema]);

        dispatch(receiveEntities(normalizedData));

        if (!getState().page.currentProjectId) {
          const defaultProjectId = projects[0].id;
          dispatch(setCurrentProjectId(defaultProjectId));
        }
      })
      .catch((err) => {
        console.error(err);
        fetchProjectsFailed(err);
      });
  };
}

export function setCurrentProjectId(id) {
  return {
    type: "SET_CURRENT_PROJECT_ID",
    payload: {
      id,
    },
  };
}

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", {
  tasks: [taskSchema],
});

function receiveEntities(entities) {
  return {
    type: "RECEIVE_ENTITIES",
    payload: entities,
  };
}
