import "./App.css";
import TaskPage from "./components/TasksPage";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

function App({ tasks }) {
  return (
    <div className="main-content">
      <TaskPage tasks={tasks} />
    </div>
  );
}

export default connect(mapStateToProps)(App);
