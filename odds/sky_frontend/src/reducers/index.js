import { combineReducers } from "redux";
// import { reducer } from "redux-csrf";

import matchReducer from "./match";
import chartReducer from "./chart";

export default combineReducers({
  matchReducer,
  chartReducer,
});
