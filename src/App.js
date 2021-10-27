import "./App.css";
import TaskPage from "./components/TasksPage";
import { connect } from "react-redux";
import { createTask, editTask, fetchTasks } from "./actions";
import { useEffect } from "react";
import FlashMessage from "./components/FlashMessage";

const mapStateToProps = (state) => {
  const { tasks, isLoading, error } = state.tasks;
  return {
    tasks,
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
    console.log("Fetching the tasks from the server");
    props.dispatch(fetchTasks());
  }, []);

  const onStatusChange = (id, status) => {
    props.dispatch(editTask(id, { status }));
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
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
