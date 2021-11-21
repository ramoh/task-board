import { takeLatest, call, put, takeEvery, delay } from "redux-saga/effects";

import { fetchTasks } from "./api";

export default function* rootSaga() {
  console.log("rootSaga reporting for the duty");
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasksWatcher);
  yield takeEvery("TIMER_STARTED", handleProgressTimer);
}

function* handleProgressTimer({ payload }) {
  debugger;
  while (true) {
    yield delay(1000);
    debugger;
    yield put({
      type: "TIMER_INCREMENT",
      payload: { taskId: payload.taskId },
    });
  }
}
function* fetchTasksWatcher() {
  try {
    const { data } = yield call(fetchTasks);
    debugger;
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
