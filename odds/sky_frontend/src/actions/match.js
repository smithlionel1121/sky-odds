import axios from "axios";

import { ADD_MATCH } from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const addMatch = match => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/match/", match, config)
    .then(res => {
      dispatch({
        type: ADD_MATCH,
        payload: res.data,
      });
    })
    .catch(error => console.log(error));
};
