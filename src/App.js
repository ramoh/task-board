import "./App.css";
import TaskPage from "./components/TasksPage";
import { connect } from "react-redux";
import {
  createTask,
  editTask,
  fetchTasks,
  deleteTask,
  filterTasks,
} from "./actions";
import { useEffect } from "react";
import FlashMessage from "./components/FlashMessage";
import { getFilteredTasks } from "./reducers";

const mapStateToProps = (state) => {
  const { tasks, isLoading, error, searchTerm } = state.tasks;

  return {
    tasks: getFilteredTasks(tasks, searchTerm),
    isLoading,
    error,
  };
};

function App(props) {
  console.log("props from App:", props);
  const onCreateTask = ({ title, description }) => {
    props.dispatch(createTask({ title, description }));
  };

  // Whenver components load
  useEffect(() => {
    props.dispatch(fetchTasks());
  }, []);

  const onStatusChange = (id, status) => {
    props.dispatch(editTask(id, { status }));
  };

  const onDelete = (id) => {
    console.log(`Delete the variable with id ${id}`);
    props.dispatch(deleteTask(id));
  };

  const onSearch = (searchTerm) => {
    props.dispatch(filterTasks(searchTerm));
  };
  return (
    <div className="container">
      {props.error && <FlashMessage message={props.error} />}
      <div className="main-content">
        <TaskPage
          tasks={props.tasks}
          isLoading={props.isLoading}
          onCreateTask={onCreateTask}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
