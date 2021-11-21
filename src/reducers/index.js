const intialState = {
  tasks: [],
  isLoading: false,
  error: null,
};
const tasks = (state = intialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };
    }
    case "DELETE_TASK_SUCCEEDED": {
      const { payload } = action;

      const nextTasks = state.tasks.filter((task) => task.id !== payload.id);
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    case "EDIT_TASK_SUCCEEDED": {
      const { payload } = action;

      const nextTasks = state.tasks.map((task) => {
        if (task.id === payload.task.id) return payload.task;
        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
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
};
export default tasks;
