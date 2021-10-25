import "./App.css";
import TaskPage from "./components/TasksPage";
import { connect } from "react-redux";
import { createTask, editTask } from "./actions";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

function App(props) {
  console.log("props from App:", props);
  const onCreateTask = ({ title, description }) => {
    props.dispatch(createTask({ title, description }));
  };

  const onStatusChange = (id, status) => {
    props.dispatch(editTask(id, { status }));
  };
  return (
    <div className="main-content">
      <TaskPage
        tasks={props.tasks}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

export default connect(mapStateToProps)(App);
