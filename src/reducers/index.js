import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const intialState = {
  items: [],
  isLoading: false,
  error: null,
};

export function projects(state = intialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_PROJECTS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        items: action.payload.projects,
      };
    }
    case "FETCH_TASKS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case "FETCH_TASKS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_TASKS_SUCCEDED": {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }
    case "CREATE_TASK_SUCCEEDED": {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId,
      );

      const project = state.items[projectIndex];
      const nextProject = {
        ...project,
        tasks: project.tasks.concat(task),
      };
      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }
    case "DELETE_TASK_SUCCEEDED": {
      debugger;
      const { payload } = action;

      const nextTasks = state.tasks.filter((task) => task.id !== payload.id);
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    case "EDIT_TASK_SUCCEEDED": {
      const { task } = action.payload;

      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId,
      );

      const project = state.items[projectIndex];

      const taskIndex = project.tasks.findIndex((t) => t.id === task.id);
      const nextProject = {
        ...project,
        tasks: [
          ...project.tasks.slice(0, taskIndex),
          task,
          ...project.tasks.slice(taskIndex + 1),
        ],
      };

      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }
    case "TIMER_INCREMENT": {
      const nextTasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });
      return { ...state, tasks: nextTasks };
    }

    default: {
      return state;
    }
  }
}

const initialPageState = {
  currentProjectId: null,
  searchTerm: "",
};

export function page(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case "FILTER_TASKS": {
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    }
    default: {
      return state;
    }
  }
}

const getSearchTerm = (state) => {
  return state.page.searchTerm;
};

const getTasksByProjectId = (state) => {
  if (!state.page.currentProjectId) {
    return [];
  }
  const currentProject = state.projects.items.find(
    (project) => project.id === state.page.currentProjectId,
  );
  return currentProject.tasks;
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) => {
      return task.title.match(new RegExp(searchTerm, "i"));
    });
  },
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const grouped = [];
    TASK_STATUSES.forEach((status) => {
      grouped[status] = tasks.filter((task) => task.status === status);
    });
    return grouped;
  },
);
