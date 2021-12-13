import { useEffect } from "react";
import { connect } from "react-redux";
import {
  createTask,
  deleteTask,
  editTask,
  fetchProjects,
  filterTasks,
  setCurrentProjectId,
} from "./actions";
import "./App.css";
import FlashMessage from "./components/FlashMessage";
import Header from "./components/Header";
import TaskPage from "./components/TasksPage";
import { getGroupedAndFilteredTasks, getProjects } from "./reducers";

const mapStateToProps = (state) => {
  const { isLoading, error } = state.projects;
  return {
    tasks: getGroupedAndFilteredTasks(state),
    projects: getProjects(state),
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
    props.dispatch(fetchProjects());
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

  const onCurrentProjectChange = (e) => {
    props.dispatch(setCurrentProjectId(Number(e.target.value)));
  };
  return (
    <div className="container">
      {props.error && <FlashMessage message={props.error} />}
      <div className="main-content">
        <Header
          projects={props.projects}
          onCurrentProjectChange={onCurrentProjectChange}
        ></Header>
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
