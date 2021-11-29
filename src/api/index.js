import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function fetchTasks() {
  // enforce a 5 seconds delay to show loading page
  var delayedPageLoadPromise = new Promise((reslove, reject) => {
    setTimeout(() => setTimeout(() => reslove(client.get("/tasks")), 2000));
  });
  return delayedPageLoadPromise;
}

export function createTask(params) {
  return client.post("/tasks", params);
}

export function editTask(id, params) {
  return client.put(`/tasks/${id}`, params);
}

export function deleteTask(id) {
  return client.delete(`/tasks/${id}`);
}

export function fetchProjects() {
  return client.get("/projects?_embed=tasks");
}
