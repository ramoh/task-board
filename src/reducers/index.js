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
        tasks: action.payload,
      };
    }
    case "CREATE_TASK_SUCCEEDED": {
      return {
        ...state,
        tasks: state.tasks.concat(action.payload),
      };
    }
    case "DELETE_TASK_SUCCEEDED": {
      const nextTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    case "EDIT_TASK_SUCCEEDED": {
      const { payload } = action;

      const nextTasks = state.tasks.map((task) => {
        if (task.id === payload.id) return payload;
        return task;
      });
      return {
        ...state,
        tasks: nextTasks,
      };
    }
    default: {
      return state;
    }
  }
};
export default tasks;
