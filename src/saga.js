import { takeLatest, call, put } from "redux-saga/effects";
import { fetchTasks } from "./api";

export default function* rootSaga() {
  console.log("rootSaga reporting for the duty");
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasksWatcher);
}

function* fetchTasksWatcher() {
  try {
    const { data } = yield call(fetchTasks);
    yield put({
      type: "FETCH_TASKS_SUCCEDED",
      payload: { tasks: data },
    });
  } catch (e) {
    yield put({
      type: "FETCH_TASKS_FAILED",
      payload: { error: e.message },
    });
  }
}
