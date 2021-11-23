import { channel } from "@redux-saga/core";
import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import { fetchTasks } from "./api";

export default function* rootSaga() {
  console.log("rootSaga reporting for the duty");
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasksWatcher);
  yield takeLastestById(
    ["TIMER_STARTED", "TIMER_STOPPED"],
    handleProgressTimer,
  );
}

function* takeLastestById(actionType, saga) {
  const channelsMap = {};
  while (true) {
    const action = yield take(actionType);
    const { taskId } = action.payload;

    if (!channelsMap[taskId]) {
      channelsMap[taskId] = channel();
      yield takeLatest(channelsMap[taskId], saga);
    }

    yield put(channelsMap[taskId], action);
  }
}

function* handleProgressTimer({ payload, type }) {
  if (type === "TIMER_STARTED") {
    while (true) {
      yield delay(1000);
      yield put({
        type: "TIMER_INCREMENT",
        payload: { taskId: payload.taskId },
      });
    }
  }
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
