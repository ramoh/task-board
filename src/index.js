import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import tasksReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "./middleware/logger";
import analytics from "./middleware/analytics";
import apiMiddleware from "./middleware/api";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = (state = {}, action) => {
  const tasks = tasksReducer(state.tasks, action);
  return {
    tasks,
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
