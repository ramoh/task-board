import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const CALL_API = "CALL_API";
function makeCall({ endpoint, method = "GET", body }) {
  const url = `${API_BASE_URL}${endpoint}`;
  const params = {
    method: method,
    url,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let resourceId = null;
  // if this "DELETE" method then extract the resource id which has to be passed
  if (method === "DELETE") {
    resourceId = url.substr(url.lastIndexOf("/") + 1);
  }

  return axios(params).then((res) => {
    if (method === "DELETE") {
      res.data = parseInt(resourceId);
      return res;
    }
    return res;
  });
}

const apiMiddleware = (store) => (next) => (action) => {
  const callApi = action[CALL_API];
  if (typeof callApi === "undefined") {
    return next(action);
  }

  const [reqStartedType, successType, reqFailedType] = callApi.types;
  next({ type: reqStartedType });

  return makeCall({
    method: callApi.method,
    body: callApi.body,
    endpoint: callApi.endpoint,
  })
    .then((response) => {
      next({
        type: successType,
        payload: response.data,
      });
    })
    .catch((err) => {
      next({
        type: reqFailedType,
        payload: {
          error: err.message,
        },
      });
    });
};

export default apiMiddleware;
