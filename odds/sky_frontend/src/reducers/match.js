import { ADD_MATCH } from "../actions/types";

const intialState = {};

export default function (state = intialState, action) {
  switch (action.type) {
    case ADD_MATCH:
      return (state = action.payload);

    default:
      return state;
  }
}
