import { fork, take, call, put } from "redux-saga/effects";
import { fetchTasks } from "./api";

export default function* rootSaga() {
  console.log("rootSaga reporting for the duty");
  yield fork(watchFetchTasks);
  yield fork(watchSomethingElse);
}

function* watchFetchTasks() {
  while (true) {
    yield take("FETCH_TASKS_STARTED");
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
}

function* watchSomethingElse() {
  console.log("Watching something else!");
}
