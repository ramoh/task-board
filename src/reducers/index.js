import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialTasksState = {
  items: [],
  isLoading: false,
  error: null,
};

export function tasks(state = initialTasksState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }
      return state;
    }
    case "TIMER_INCREMENT": {
      const task = state.items[action.payload.taskId];
      const newTask = { ...task, timer: task.timer + 1 };
      return {
        ...state,
        items: {
          ...state.items,
          [newTask.id]: newTask,
        },
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
    case "EDIT_TASK_SUCCEEDED":
    case "CREATE_TASK_SUCCEEDED": {
      const { task } = action.payload;

      const nextTasks = {
        ...state.items,
        [task.id]: task,
      };

      return {
        ...state,
        items: nextTasks,
      };
    }
    case "DELETE_TASK_SUCCEEDED": {
      const { id } = action.payload;
      const nextTasks = Object.keys(state.items)
        .filter((key) => {
          console.log("I am here");
          return parseInt(key) !== id;
        })
        .reduce((obj, key) => {
          obj[key] = state.items[key];
          return obj;
        }, {});
      return {
        ...state,
        items: nextTasks,
      };
    }

    default: {
      return state;
    }
  }
}

const initialProjectsState = {
  items: {},
  isLoading: false,
  error: null,
};

export function projects(state = initialProjectsState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }
      return state;
    }
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
    case "CREATE_TASK_SUCCEEDED": {
      const { task } = action.payload;
      const project = state.items[task.projectId];
      return {
        ...state,
        items: {
          ...state.items,
          [task.projectId]: {
            ...project,
            tasks: project.tasks.concat(task.id),
          },
        },
      };
    }
    case "FETCH_PROJECTS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case "DELETE_TASK_SUCCEEDED": {
      const { id } = action.payload;
      const projId = Object.keys(state.items).filter((projectId) => {
        const project = state.items[projectId];
        return project.tasks.includes(id);
      })[0];

      const newTasks = state.items[projId].tasks.filter(
        (taskId) => taskId !== id,
      );
      const nextProject = { ...state.items[projId], tasks: newTasks };
      return {
        ...state,
        items: {
          ...state.items,
          [nextProject.id]: nextProject,
        },
      };
    }

    default:
      return state;
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
  const { currentProjectId } = state.page;

  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }
  const taskIds = state.projects.items[currentProjectId].tasks;
  return taskIds.map((id) => state.tasks.items[id]);
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

export const getProjects = (state) => {
  return Object.keys(state.projects.items).map((id) => {
    return state.projects.items[id];
  });
};
