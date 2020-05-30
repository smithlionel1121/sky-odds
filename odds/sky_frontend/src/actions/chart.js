import axios from "axios";

import { GET_DATA } from "./types";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const getData = match => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const stats = {
    home_odds: null,
    draw_odds: null,
    away_odds: null,
    home_score: null,
    away_score: null,
    minutes: null,
    match: match,
  };

  axios
    .post("api/statistics/", stats, config)
    .then(res => {
      dispatch({
        type: GET_DATA,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
